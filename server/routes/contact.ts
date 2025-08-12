import { RequestHandler } from "express";
import { z } from "zod";
import { sendContactEmail } from "../utils/mailer";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "Assunto muito curto").max(200),
  message: z.string().min(5, "Mensagem muito curta").max(5000),
});

export const handleContactForm: RequestHandler = async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      });
    }

    const { name, email, subject, message } = parsed.data as ContactFormData;

    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ error: "Erro ao enviar a mensagem" });
  }
};
