// Netlify serverless function to proxy AI API calls
// This avoids CORS issues when calling the NVIDIA API from the browser
/* eslint-env node */

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const API_KEY = process.env.NVIDIA_API_KEY || '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';
  const API_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';

  try {
    const { messages, systemPrompt } = JSON.parse(event.body);

    const requestMessages = [];
    
    // Add system prompt if provided
    if (systemPrompt) {
      requestMessages.push({ role: 'system', content: systemPrompt });
    }
    
    // Add user messages
    if (Array.isArray(messages)) {
      requestMessages.push(...messages);
    } else if (messages) {
      requestMessages.push({ role: 'user', content: messages });
    }

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages: requestMessages,
        temperature: 0.6,
        top_p: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NVIDIA API Error:', response.status, errorText);
      
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: `API request failed with status ${response.status}`,
          details: errorText 
        }),
      };
    }

    const data = await response.json();
    
    // Extract content and clean it
    let content = data?.choices?.[0]?.message?.content || '';
    
    // Remove <think>...</think> tags that DeepSeek R1 might include
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content,
        success: true 
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
}
