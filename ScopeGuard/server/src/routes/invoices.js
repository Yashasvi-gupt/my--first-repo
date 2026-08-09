const express = require('express');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
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

router.get('/:id/pdf', async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await prisma.invoice.findUnique({ where: { id }, include: { project: true } });
    if (!invoice || invoice.project.userId !== req.user.id) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 780]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { lineItems } = invoice;
    let y = 720;

    page.drawText('ScopeGuard Invoice', { x: 40, y, size: 20, font, color: rgb(0.1, 0.2, 0.3) });
    y -= 30;
    page.drawText(`Invoice #: ${invoice.invoiceNumber}`, { x: 40, y, size: 12, font });
    page.drawText(`Status: ${invoice.status}`, { x: 420, y, size: 12, font });
    y -= 20;
    page.drawText(`Project: ${invoice.project.title}`, { x: 40, y, size: 12, font });
    y -= 20;
    page.drawText(`Client: ${invoice.project.clientName}`, { x: 40, y, size: 12, font });
    y -= 20;
    page.drawText(`Due date: ${invoice.dueDate.toISOString().split('T')[0]}`, { x: 40, y, size: 12, font });
    y -= 30;

    page.drawText('Item', { x: 40, y, size: 12, font });
    page.drawText('Qty', { x: 320, y, size: 12, font });
    page.drawText('Rate', { x: 380, y, size: 12, font });
    page.drawText('Total', { x: 470, y, size: 12, font });
    y -= 18;

    lineItems.forEach((item) => {
      if (y < 80) {
        y = 720;
        pdfDoc.addPage([600, 780]);
      }
      page.drawText(item.description, { x: 40, y, size: 10, font });
      page.drawText(String(item.quantity), { x: 320, y, size: 10, font });
      page.drawText(`$${item.rate.toFixed(2)}`, { x: 380, y, size: 10, font });
      page.drawText(`$${item.total.toFixed(2)}`, { x: 470, y, size: 10, font });
      y -= 16;
    });

    y -= 16;
    page.drawText(`Total: $${invoice.totalAmount.toFixed(2)}`, { x: 40, y, size: 12, font });
    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${invoice.invoiceNumber}.pdf"`);
    return res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to generate invoice PDF' });
  }
});

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['DRAFT', 'SENT', 'OVERDUE', 'PAID'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const invoice = await prisma.invoice.findUnique({ where: { id }, include: { project: true } });
    if (!invoice || invoice.project.userId !== req.user.id) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    const updated = await prisma.invoice.update({ where: { id }, data: { status, ...(status === 'SENT' ? { sentAt: new Date() } : {}), ...(status === 'PAID' ? { paidAt: new Date() } : {}) } });
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to update invoice status' });
  }
});

module.exports = router;
