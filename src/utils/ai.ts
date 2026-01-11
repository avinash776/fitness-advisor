/// <reference types="vite/client" />

// Use Netlify function in production, local proxy in development
const isProduction = import.meta.env.PROD;
const NETLIFY_FUNCTION_URL = '/.netlify/functions/ai-chat';

// In development, use local proxy server to avoid CORS issues
const DEV_PROXY_URL = 'http://localhost:3001/api/chat';

// System prompt for fitness advice
const SYSTEM_PROMPT = `You are an expert fitness advisor and health coach. Provide helpful, accurate, and encouraging advice about:
- Workout routines and exercises
- Nutrition and meal planning
- Health and wellness tips
- Fitness goal setting and tracking
- Recovery and rest

Keep your responses concise, actionable, and easy to understand. Format your responses with clear structure using bullet points or numbered lists when appropriate.`;

export const getAIHealthAdvice = async (question: string): Promise<string> => {
  return getAIResponse(question);
};

export const getAIResponse = async (question: string): Promise<string> => {
  try {
    // In production (deployed on Netlify), use the Netlify function to avoid CORS
    if (isProduction) {
      return await callNetlifyFunction(question);
    }
    
    // In development, use direct API call only
    return await callDirectAPI(question);
  } catch (error) {
    console.error('Error getting AI advice:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return "Network error: Unable to connect to the AI service. Please check your internet connection.";
    }
    
    if (error instanceof Error) {
      return `I apologize, but I encountered an error: ${error.message}`;
    }
    
    return "I apologize, but I encountered an unexpected error. Please try again later.";
  }
};

// Call the Netlify serverless function
const callNetlifyFunction = async (question: string): Promise<string> => {
  const response = await fetch(NETLIFY_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: question,
      systemPrompt: SYSTEM_PROMPT,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Netlify function error:', response.status, errorData);
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.content) {
    return "I apologize, but I couldn't generate a response at this time. Please try again.";
  }
  
  return data.content;
};

// Call the NVIDIA API via local proxy server (to avoid CORS in development)
const callDirectAPI = async (question: string): Promise<string> => {
  console.log('Calling proxy API at:', DEV_PROXY_URL);
  
  const response = await fetch(DEV_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta/llama-3.1-8b-instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: question }
      ],
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', response.status, errorText);
    
    if (response.status === 401) {
      throw new Error('API authentication failed. Please check the API key.');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    } else if (response.status === 503) {
      throw new Error('AI service is temporarily unavailable. Please try again.');
    }
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log('API Response:', data);

  let content = data?.choices?.[0]?.message?.content;

  if (!content) {
    console.error('No content in response:', data);
    return "I apologize, but I couldn't generate a response at this time. Please try again.";
  }

  // Clean up the response
  content = cleanAIResponse(content);

  return content;
};

// Helper function to clean up AI response
const cleanAIResponse = (content: string): string => {
  // Remove <think>...</think> tags that DeepSeek R1 might include
  let cleaned = content.replace(/<think>[\s\S]*?<\/think>/gi, '');
  
  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();
  
  // If the response is empty after cleaning, return a default message
  if (!cleaned) {
    return "I apologize, but I couldn't generate a meaningful response. Please try rephrasing your question.";
  }
  
  return cleaned;
};

// Function to generate workout plan with AI
export const generateAIWorkoutPlan = async (
  fitnessLevel: string,
  goal: string,
  preferredExercises: string[]
): Promise<string> => {
  const prompt = `Create a detailed workout plan for someone who is at a ${fitnessLevel} fitness level with the goal of ${goal.replace('_', ' ')}. 
They prefer these types of exercises: ${preferredExercises.join(', ')}.

Please provide:
1. A weekly schedule (which days to work out)
2. For each workout day, list 5-8 exercises with:
   - Exercise name
   - Number of sets and reps
   - Rest time between sets
   - Brief form instructions

Keep the plan practical and achievable.`;

  return getAIResponse(prompt);
};

// Function to generate meal suggestions with AI
export const generateAIMealSuggestion = async (
  calories: number,
  dietaryRestrictions: string[]
): Promise<string> => {
  const restrictions = dietaryRestrictions.length > 0 
    ? `Dietary restrictions: ${dietaryRestrictions.join(', ')}` 
    : 'No specific dietary restrictions';
    
  const prompt = `Suggest a balanced meal plan for one day targeting approximately ${calories} calories.
${restrictions}

Please provide:
1. Breakfast, Lunch, Dinner, and 2 snacks
2. For each meal, include:
   - Meal name and description
   - Approximate calories
   - Key macros (protein, carbs, fat)
   
Keep suggestions practical and easy to prepare.`;

  return getAIResponse(prompt);
};