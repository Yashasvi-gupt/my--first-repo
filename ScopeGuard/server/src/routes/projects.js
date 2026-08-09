const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/', async (req, res) => {
  const { clientName, clientEmail, title, rateType, rateAmount, scopedHours, scopedDeliverables, revisionLimit, deadline } = req.body;

  if (!clientName || !title || !rateType || !rateAmount) {
    return res.status(400).json({ error: 'Missing required project fields' });
  }

  try {
    const project = await prisma.project.create({
      data: {
        userId: req.user.id,
        clientName,
        clientEmail,
        title,
        rateType,
        rateAmount: Number(rateAmount),
        scopedHours: scopedHours ? Number(scopedHours) : null,
        scopedDeliverables: scopedDeliverables ? Number(scopedDeliverables) : null,
        revisionLimit: revisionLimit ? Number(revisionLimit) : null,
        deadline: deadline ? new Date(deadline) : null,
      },
    });
    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to create project' });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      include: { logs: true, invoices: true },
      orderBy: { createdAt: 'desc' },
    });

    const result = projects.map((project) => {
      const hoursLogged = project.logs.filter((log) => log.type === 'HOURS').reduce((sum, log) => sum + log.amount, 0);
      const deliverablesLogged = project.logs.filter((log) => log.type === 'DELIVERABLE').length;
      const revisionsLogged = project.logs.filter((log) => log.type === 'REVISION').length;
      return {
        ...project,
        summary: {
          hoursLogged,
          deliverablesLogged,
          revisionsLogged,
          totalInvoices: project.invoices.length,
        },
      };
    });
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch projects' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findFirst({
      where: { id, userId: req.user.id },
      include: { logs: true, invoices: true },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch project' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const project = await prisma.project.updateMany({
      where: { id, userId: req.user.id },
      data: {
        clientName: updates.clientName,
        clientEmail: updates.clientEmail,
        title: updates.title,
        rateType: updates.rateType,
        rateAmount: updates.rateAmount ? Number(updates.rateAmount) : undefined,
        scopedHours: updates.scopedHours !== undefined ? (updates.scopedHours ? Number(updates.scopedHours) : null) : undefined,
        scopedDeliverables: updates.scopedDeliverables !== undefined ? (updates.scopedDeliverables ? Number(updates.scopedDeliverables) : null) : undefined,
        revisionLimit: updates.revisionLimit !== undefined ? (updates.revisionLimit ? Number(updates.revisionLimit) : null) : undefined,
        deadline: updates.deadline !== undefined ? (updates.deadline ? new Date(updates.deadline) : null) : undefined,
        status: updates.status,
      },
    });
    if (project.count === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({ message: 'Project updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to update project' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.deleteMany({ where: { id, userId: req.user.id } });
    return res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to delete project' });
  }
});

module.exports = router;
