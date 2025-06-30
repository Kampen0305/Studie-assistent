import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAnswer = async (question: string, kennisbank: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API-sleutel niet gevonden. Zorg ervoor dat de omgevingsvariabele is ingesteld.");
  }

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

  const systemInstruction = `
    Je bent een vriendelijke en behulpzame studie-assistent voor MBO-studenten. 
    Je taak is om vragen van studenten te beantwoorden.
    Gebruik UITSLUITEND de informatie uit de onderstaande Kennisbank om je antwoord te formuleren.
    - Antwoord altijd in het Nederlands.
    - Wees duidelijk en to-the-point.
    - Als het antwoord niet in de Kennisbank te vinden is, geef dan eerlijk aan dat je de informatie niet hebt en adviseer de student om contact op te nemen met een docent.
    - Citeer nooit direct de Kennisbank, maar formuleer een antwoord in je eigen woorden op basis van de context.
  `;

  const contents = [
    {
      role: "user",
      parts: [
        { text: `
# Kennisbank

${kennisbank}

---

# Vraag van de student

"${question}"
        ` }
      ]
    }
  ];

  try {
    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.3,
        topP: 0.9
      },
      systemInstruction
    });

    const responseText = await result.response.text();

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
