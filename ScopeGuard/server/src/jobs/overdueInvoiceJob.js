const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const overdueInvoiceJob = async (prisma) => {
  const overdueInvoices = await prisma.invoice.findMany({
    where: {
      dueDate: { lt: new Date() },
      status: 'SENT',
    },
    include: { project: true },
  });

  if (overdueInvoices.length === 0) {
    return;
  }

  await Promise.all(overdueInvoices.map(async (invoice) => {
    await prisma.invoice.update({ where: { id: invoice.id }, data: { status: 'OVERDUE' } });
    if (invoice.project.clientEmail) {
      await sendReminderEmail(invoice);
    }
  }));
};

const sendReminderEmail = async (invoice) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: invoice.project.clientEmail,
    subject: `Payment reminder: ${invoice.invoiceNumber}`,
    text: `Hi ${invoice.project.clientName},\n\nThis is a friendly reminder that invoice ${invoice.invoiceNumber} for ${invoice.project.title} is overdue. Total due: $${invoice.totalAmount.toFixed(2)}. Please reach out if you need anything.\n\nThanks,\nYour ScopeGuard freelancer`,
  };

  await transporter.sendMail(mailOptions);
};

const scheduleOverdueCheck = async (prisma) => {
  const job = new CronJob('0 0 * * *', async () => {
    try {
      await overdueInvoiceJob(prisma);
    } catch (error) {
      console.error('Overdue invoice job failed', error);
    }
  });
  job.start();
  return job;
};

module.exports = { scheduleOverdueCheck, overdueInvoiceJob };
