const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const projectLogsRoutes = require('./routes/projectLogs');
const logsRoutes = require('./routes/logs');
const projectInvoicesRoutes = require('./routes/projectInvoices');
const invoicesRoutes = require('./routes/invoices');
const { scheduleOverdueCheck } = require('./jobs/overdueInvoiceJob');
const { authenticateJwt } = require('./middleware/auth');

dotenv.config();
const app = express();
const prisma = require('./lib/prisma');

app.use(cors());
app.use(express.json());
app.locals.prisma = prisma;

app.use('/auth', authRoutes);
app.use('/projects', authenticateJwt, projectRoutes);
app.use('/projects', authenticateJwt, projectLogsRoutes);
app.use('/projects', authenticateJwt, projectInvoicesRoutes);
app.use('/logs', authenticateJwt, logsRoutes);
app.use('/invoices', authenticateJwt, invoicesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ScopeGuard API' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`ScopeGuard server listening on port ${PORT}`);
  await scheduleOverdueCheck(prisma);
});
