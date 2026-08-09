const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { billed, description, amount } = req.body;

  try {
    const existingLog = await prisma.workLog.findUnique({ where: { id } });
    if (!existingLog) {
      return res.status(404).json({ error: 'Log not found' });
    }
    const project = await prisma.project.findFirst({ where: { id: existingLog.projectId, userId: req.user.id } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updated = await prisma.workLog.update({
      where: { id },
      data: {
        billed: billed !== undefined ? billed : undefined,
        description: description !== undefined ? description : undefined,
        amount: amount !== undefined ? Number(amount) : undefined,
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to update log' });
  }
});

module.exports = router;
