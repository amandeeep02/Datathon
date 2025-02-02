import express from "express";
import type { Request, Response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_BOT_TOKEN: string;
      GOOGLE_API_KEY: string;
      PORT?: string;
    }
  }
}

const app = express();

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY ?? "");

// Store user contexts
const userContexts = new Map<number, UserProfile>();

interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  experienceLevel: string;
  investmentBudget: number;
  investmentTimeline: string;
  tradingStrategy: string;
  goals: string;
  labour: number;
  material: number;
  monthlyProfits: number;
  others: number;
  rent: number;
  riskTolerance: string;
  transport: number;
  createdAt: string;
  updatedAt: string;
}

app.use(bodyParser.json());

interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username?: string;
    language_code?: string;
  };
  chat: {
    id: number;
    first_name: string;
    username?: string;
    type: string;
  };
  date: number;
  text: string;
}

interface TelegramUpdate {
  update_id: number;
  message: TelegramMessage;
}

app.post(
  "/webhook",
  async (req: Request<{}, {}, TelegramUpdate>, res: Response) => {
    console.log("Received update:", req.body); // Log the incoming request

    const { message } = req.body;
    if (!message?.text) {
      console.log("No text in message");
      res.sendStatus(200);
      return;
    }

    const chatId = message.chat.id;
    const userMessage = message.text.trim();

    try {
      // Check if we already have user context
      if (!userContexts.has(chatId)) {
        // If message doesn't contain email and we don't have context
        if (!userMessage.includes("@")) {
          await sendTelegramMessage(
            chatId,
            "Please provide your email address to get started."
          );
          res.sendStatus(200);
          return;
        }

        // Extract email and fetch user profile
        const email = userMessage.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
        )?.[0];
        if (!email) {
          await sendTelegramMessage(
            chatId,
            "Please provide a valid email address."
          );
          res.sendStatus(200);
          return;
        }

        try {
          const response = await axios.get(
            `https://datathon-backend.vercel.app/api/user/email/${email}`
          );
          userContexts.set(chatId, response.data);
          await sendTelegramMessage(
            chatId,
            `Welcome ${response.data.firstName}! How can I help you with your investments today?`
          );
        } catch (error) {
          console.error("Error fetching user profile:", error);
          await sendTelegramMessage(
            chatId,
            "Sorry, I could not find your profile. Please check your email address and try again."
          );
        }
        res.sendStatus(200);
        return;
      }

      // If we have context, process the message with Gemini
      const userProfile = userContexts.get(chatId)!;
      const geminiResponse = await getGeminiResponse(userMessage, userProfile);
      await sendTelegramMessage(chatId, geminiResponse);
    } catch (error) {
      console.error("Error processing message:", error);
      await sendTelegramMessage(
        chatId,
        "Sorry, there was an error processing your message."
      );
    }

    res.sendStatus(200);
  }
);

async function getGeminiResponse(
  userMessage: string,
  userProfile: UserProfile
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `You are a personal investment advisor. You have access to the following user profile information:
  
Name: ${userProfile.firstName} ${userProfile.lastName}
Experience Level: ${userProfile.experienceLevel}
Investment Budget: ${userProfile.investmentBudget}
Investment Timeline: ${userProfile.investmentTimeline}
Trading Strategy: ${userProfile.tradingStrategy}
Goals: ${userProfile.goals}
Risk Tolerance: ${userProfile.riskTolerance}

Monthly Expenses:
- Labour: ${userProfile.labour}
- Material: ${userProfile.material}
- Monthly Profits: ${userProfile.monthlyProfits}
- Others: ${userProfile.others}
- Rent: ${userProfile.rent}
- Transport: ${userProfile.transport}

Please provide personalized investment advice based on this profile information. Keep responses concise, practical, and tailored to the user's experience level and risk tolerance. Always consider their monthly expenses and profits when making suggestions.

User's message: ${userMessage}

Please respond in a friendly, conversational manner while maintaining professionalism.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

async function sendTelegramMessage(
  chatId: number,
  text: string
): Promise<void> {
  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
    console.log("Telegram API response:", response.data);
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
