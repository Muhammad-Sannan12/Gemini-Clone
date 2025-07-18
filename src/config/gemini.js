const YOUR_GEMINI_API_KEY ="AIzaSyAZ2RHXkGraITyMU912BNml-8FURuS88ec";

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: YOUR_GEMINI_API_KEY, 
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `${prompt}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = ''; // Initialize an empty string to accumulate the response
  for await (const chunk of response) {
    fullResponse += chunk.text; // Append each chunk's text to fullResponse
 // Still useful for seeing chunks as they arrive (optional)
  }
  return fullResponse; // Return the complete accumulated response
}

export default main;
