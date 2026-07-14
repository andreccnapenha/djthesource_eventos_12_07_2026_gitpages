const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const dotenvResult = dotenv.config({ path: path.join(__dirname, '.env') });
console.log('dotenv parsed:', !!dotenvResult.parsed);
if (dotenvResult.error) {
  console.error('dotenv error:', dotenvResult.error.message);
}
console.log('SUPABASE_URL raw=', process.env.SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY raw=', process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log('SUPABASE_KEY raw=', process.env.SUPABASE_KEY);

const quoteRoutes = require('./routes/quoteRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Supabase configuration inválida. Verifique server/.env e configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY ou SUPABASE_KEY.',
  );
  process.exit(1);
}

if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn(
    'A configuração SMTP não está completa. O envio de email ficará indisponível até preencher SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS.',
  );
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api', quoteRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'DJ The Source API' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`DJ The Source backend is running on http://localhost:${port}`);
});
