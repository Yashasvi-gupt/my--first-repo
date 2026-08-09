const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

const buildInvoiceNumber = async () => {
  const count = await prisma.invoice.count();
  return `INV-${String(count + 1).padStart(4, '0')}`;
};

const getInvoiceLineItems = (project, logs) => {
  const regularItems = [];
  const extraItems = [];
  const rate = project.rateAmount;

  logs.forEach((log) => {
    const description = log.description || log.type;
    const quantity = log.type === 'HOURS' ? log.amount : 1;
    const unitRate = rate;
    const total = quantity * unitRate;
    const item = { description, quantity, rate: unitRate, total, extra: log.isExtraWork };
    if (log.isExtraWork) extraItems.push(item);
    else regularItems.push(item);
  });

  return [...regularItems, ...extraItems];
};

router.post('/:projectId/invoices', async (req, res) => {
  const { projectId } = req.params;
  const { dueDate } = req.body;

  if (!dueDate) {
    return res.status(400).json({ error: 'Due date is required' });
  }

  try {
    const project = await prisma.project.findFirst({ where: { id: projectId, userId: req.user.id }, include: { logs: true } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const unbilledLogs = project.logs.filter((log) => !log.billed);
    if (unbilledLogs.length === 0) {
      return res.status(400).json({ error: 'No unbilled logs available' });
    }

    const invoiceNumber = await buildInvoiceNumber();
    const lineItems = getInvoiceLineItems(project, unbilledLogs);
    const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0);

    const invoice = await prisma.invoice.create({
      data: {
        projectId,
        invoiceNumber,
        lineItems,
        totalAmount,
        dueDate: new Date(dueDate),
      },
    });

    await prisma.workLog.updateMany({
      where: { projectId, billed: false },
      data: { billed: true },
    });

    return res.status(201).json(invoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to generate invoice' });
  }
});

router.get('/:projectId/invoices', async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await prisma.project.findFirst({ where: { id: projectId, userId: req.user.id } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const invoices = await prisma.invoice.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } });
    return res.json(invoices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch invoices' });
  }
});

module.exports = router;
