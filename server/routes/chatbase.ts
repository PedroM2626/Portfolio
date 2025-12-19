import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const handleChatbaseToken = async (req: Request, res: Response) => {
  try {
    const secret = process.env.CHATBOT_IDENTITY_SECRET;

    if (!secret) {
      console.error("CHATBOT_IDENTITY_SECRET is not defined");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // MOCK USER - In a real app, you would get this from the authenticated session
    const user = {
      id: "guest_" + Math.random().toString(36).substring(7),
      email: "guest@example.com",
      name: "Guest User",
    };

    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        name: user.name,
      },
      secret,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error generating Chatbase token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
};
