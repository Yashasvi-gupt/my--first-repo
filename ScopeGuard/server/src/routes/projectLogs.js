const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/:projectId/logs', async (req, res) => {
  const { projectId } = req.params;
  const { type, amount, description } = req.body;

  if (!type || !amount || !description) {
    return res.status(400).json({ error: 'Log type, amount, and description are required' });
  }

  try {
    const project = await prisma.project.findFirst({ where: { id: projectId, userId: req.user.id }, include: { logs: true } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    let isExtraWork = false;
    if (type === 'HOURS' && project.scopedHours != null) {
      const hoursLogged = project.logs.filter((log) => log.type === 'HOURS').reduce((sum, log) => sum + log.amount, 0);
      if (hoursLogged + parsedAmount > project.scopedHours) {
        isExtraWork = true;
      }
    }
    if (type === 'DELIVERABLE' && project.scopedDeliverables != null) {
      const deliverablesLogged = project.logs.filter((log) => log.type === 'DELIVERABLE').length;
      if (deliverablesLogged + 1 > project.scopedDeliverables) {
        isExtraWork = true;
      }
    }
    if (type === 'REVISION' && project.revisionLimit != null) {
      const revisionsLogged = project.logs.filter((log) => log.type === 'REVISION').length;
      if (revisionsLogged + 1 > project.revisionLimit) {
        isExtraWork = true;
      }
    }

    const log = await prisma.workLog.create({
      data: {
        projectId,
        type,
        amount: parsedAmount,
        description,
        isExtraWork,
      },
    });

    const updatedStatus = project.logs.some((existingLog) => existingLog.isExtraWork) || isExtraWork ? 'SCOPE_CREEP' : project.status;
    if (updatedStatus === 'SCOPE_CREEP') {
      await prisma.project.update({ where: { id: projectId }, data: { status: 'SCOPE_CREEP' } });
    }

    const message = isExtraWork ? 'This log exceeds the original scope and is marked as billable extra work.' : 'Work log added within scope.';
    return res.status(201).json({ log, warning: isExtraWork, message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to log work' });
  }
});

router.get('/:projectId/logs', async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await prisma.project.findFirst({ where: { id: projectId, userId: req.user.id } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const logs = await prisma.workLog.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } });
    return res.json(logs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch logs' });
  }
});

module.exports = router;
