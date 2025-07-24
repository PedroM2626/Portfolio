import { RequestHandler } from "express";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const handleContactForm: RequestHandler = async (req, res) => {
  try {
    const { name, email, subject, message }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: "Todos os campos são obrigatórios" 
      });
    }

    // Log the contact form submission (in production, you'd send this via email service)
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // In a real application, you would:
    // 1. Use a service like SendGrid, Nodemailer, or AWS SES to send emails
    // 2. Store the message in a database
    // 3. Send confirmation emails
    
    // For now, we'll just return success
    res.json({ 
      success: true, 
      message: "Mensagem recebida com sucesso!" 
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ 
      error: "Erro interno do servidor" 
    });
  }
};
