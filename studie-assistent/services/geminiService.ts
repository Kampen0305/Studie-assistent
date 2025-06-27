import { GoogleGenAI } from "@google/genai";

export const getAnswer = async (question: string, kennisbank: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API-sleutel niet gevonden. Zorg ervoor dat de omgevingsvariabele is ingesteld.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    Je bent een vriendelijke en behulpzame studie-assistent voor MBO-studenten. 
    Je taak is om vragen van studenten te beantwoorden.
    Gebruik UITSLUITEND de informatie uit de onderstaande Kennisbank om je antwoord te formuleren.
    - Antwoord altijd in het Nederlands.
    - Wees duidelijk en to-the-point.
    - Als het antwoord niet in de Kennisbank te vinden is, geef dan eerlijk aan dat je de informatie niet hebt en adviseer de student om contact op te nemen met een docent.
    - Citeer nooit direct de Kennisbank, maar formuleer een antwoord in je eigen woorden op basis van de context.
  `;

  const contents = `
    # Kennisbank

    ${kennisbank}

    ---

    # Vraag van de student
    
    "${question}"
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, 
        topP: 0.9,
      },
    });

    const responseText = response.text;
    
    if (!responseText) {
      throw new Error("Leeg antwoord ontvangen van de API.");
    }

    return responseText;

  } catch (error) {
    console.error("Fout bij het genereren van antwoord:", error);
    if (error instanceof Error && error.message.includes("API-sleutel")) {
        throw error;
    }
    throw new Error("Er is iets misgegaan bij het ophalen van het antwoord. Probeer het later opnieuw.");
  }
};