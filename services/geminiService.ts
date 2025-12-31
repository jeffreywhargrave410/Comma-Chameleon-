
import { GoogleGenAI, Type } from "@google/genai";
import type { CommaProblem } from '../types';

const PROMPT = `
You are an expert in English grammar for young children (ages 7-10).
Your task is to generate a single comma placement problem.

Please provide your response in a JSON format that adheres to the following schema.
Do not include any text outside of the JSON object, not even markdown markers.

Example problem topics:
- A list of three items (e.g., I like apples, oranges, and bananas.)
- Separating two independent clauses with a conjunction (and, but, so) (e.g., I wanted to play, but it was raining.)
- After an introductory word or phrase (e.g., "First, you mix the flour." or "In the morning, I eat breakfast.")
- Separating a city from a state (e.g., We visited Paris, Texas.)

Generate a new, unique problem now. Ensure the sentences are simple enough for a 7-10 year old to understand.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
      sentenceWithoutComma: {
        type: Type.STRING,
        description: "A simple sentence that is grammatically incorrect because it is missing a single, necessary comma. The sentence should be appropriate for a 7-10 year old."
      },
      sentenceWithComma: {
        type: Type.STRING,
        description: "The corrected version of the sentence with the comma in the correct place."
      },
      explanation: {
        type: Type.STRING,
        description: "A very simple, one-sentence explanation of why the comma is needed, phrased for a child to understand. For example: 'Use a comma to separate items in a list.' or 'Use a comma after an introductory phrase.'"
      }
    },
    required: ["sentenceWithoutComma", "sentenceWithComma", "explanation"]
};

export const generateCommaProblem = async (): Promise<CommaProblem> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: PROMPT,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 1.0, 
      }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    // Basic validation
    if (parsed.sentenceWithoutComma && parsed.sentenceWithComma && parsed.explanation) {
      return parsed as CommaProblem;
    } else {
      throw new Error("Received invalid data structure from API");
    }

  } catch (error) {
    console.error("Error generating comma problem:", error);
    throw new Error("Failed to generate a comma problem from the Gemini API.");
  }
};
