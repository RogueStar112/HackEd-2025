"use server";

import { GoogleGenAI, Type } from "@google/genai";
import { CreateResponse } from "@/lib/types";


export default async function findProjectData({ prompt } : { prompt: string }) {

    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    console.log("working");

    const systemPrompt = `You are an assistant who is part of an application which matches users together who want to work on projects collaboratively. You will be given a block of text describing a project the user wants to find. Your job is to return a list of categories in the format of your response schema, which match what they have described. These categories will later be used by the app to select projects from the database which the user can choose from. Return at least three categories, but add as many as you can, up to 9.`;

    console.log("trying");

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            categoryName: {
                                type: Type.STRING,
                            },
                        },
                        propertyOrdering: ["categoryName"],
                    },
                },
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });

        console.log("response: ", response.text);

        const data = JSON.parse(response.text!);
        console.log("data: ", data);

        return data as CreateResponse;

    } catch (error) {
        throw error;
    }
}

