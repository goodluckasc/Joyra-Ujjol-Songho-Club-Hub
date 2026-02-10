
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateEventDescription(title: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a compelling and professional club event description for an event titled: "${title}". Make it engaging and concise.`,
      });
      return response.text || "No description generated.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate description at this time.";
    }
  }

  async suggestActivities(): Promise<string[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Suggest 5 unique community club activities suitable for a youth and social development club in South Asia. Format as a simple list.",
      });
      return response.text?.split('\n').filter(line => line.trim()) || [];
    } catch (error) {
      console.error("Gemini Error:", error);
      return ["Charity Drive", "Sports Tournament", "Skills Workshop", "Cultural Night", "Environmental Cleanup"];
    }
  }
}

export const geminiService = new GeminiService();
