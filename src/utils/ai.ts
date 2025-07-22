/// <reference types="vite/client" />

export const getAIHealthAdvice = async (question: string): Promise<string> => {
  return getAIResponse(question);
};

export const getAIResponse = async (question: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: question },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Gemini API response');
    }
    const data = await response.json();
    // Gemini returns candidates[0].content.parts[0].text
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, but I couldn't generate a response at this time."
    );
  } catch (error) {
    console.error('Error getting Gemini advice:', error);
    return "I apologize, but I encountered an error while generating advice. Please try again later.";
  }
}; 