import nodemailer, { Transporter } from "nodemailer";

export interface MailerConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
  transport?: "smtp" | "json" | "stream";
}

function loadConfigFromEnv(): MailerConfig {
  const host = process.env.EMAIL_HOST ?? "";
  const portStr = process.env.EMAIL_PORT ?? "";
  const user = process.env.EMAIL_USER ?? "";
  const pass = process.env.EMAIL_PASS ?? "";
  const from = process.env.EMAIL_FROM ?? process.env.EMAIL_USER ?? "";
  const to = process.env.EMAIL_TO ?? "";
  const transport = (process.env.EMAIL_TRANSPORT as MailerConfig["transport"]) ??
    (process.env.NODE_ENV === "test" ? "json" : "smtp");

  const port = Number(portStr) || 587;
  const secure = port === 465;

  return { host, port, secure, user, pass, from, to, transport };
}

let cachedTransporter: Transporter | null = null;

export function getTransporter(cfg?: Partial<MailerConfig>): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const envCfg = loadConfigFromEnv();
  const finalCfg: MailerConfig = { ...envCfg, ...cfg } as MailerConfig;

  if (finalCfg.transport === "json") {
    cachedTransporter = nodemailer.createTransport({ jsonTransport: true });
    return cachedTransporter;
  }

  if (finalCfg.transport === "stream") {
    cachedTransporter = nodemailer.createTransport({ streamTransport: true });
    return cachedTransporter;
  }

  if (!finalCfg.host || !finalCfg.user || !finalCfg.pass) {
    // In development, fall back to json transport if SMTP is not configured
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) {
      cachedTransporter = nodemailer.createTransport({ jsonTransport: true });
      return cachedTransporter;
    }
    throw new Error(
      "Mailer configuration missing. Ensure EMAIL_HOST, EMAIL_USER, EMAIL_PASS are set.",
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host: finalCfg.host,
    port: finalCfg.port,
    secure: finalCfg.secure,
    auth: { user: finalCfg.user, pass: finalCfg.pass },
  });
  return cachedTransporter;
}

// Test helper to reset transporter cache
export function __resetMailerForTests() {
  cachedTransporter = null;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: ContactPayload) {
  const cfg = loadConfigFromEnv();
  const transporter = getTransporter(cfg);

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Novo contato do portfólio</h2>
      <p><strong>Nome:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(payload.subject)}</p>
      <p><strong>Mensagem:</strong></p>
      <pre style="white-space: pre-wrap">${escapeHtml(payload.message)}</pre>
      <hr />
      <p style="color:#777">Enviado em ${new Date().toLocaleString()}</p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: cfg.from,
    to: cfg.to,
    replyTo: `${payload.name} <${payload.email}>`,
    subject: `[Portfolio] ${payload.subject}`,
    text: `Nome: ${payload.name}\nEmail: ${payload.email}\nAssunto: ${payload.subject}\n\n${payload.message}`,
    html,
  });

  return info;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


