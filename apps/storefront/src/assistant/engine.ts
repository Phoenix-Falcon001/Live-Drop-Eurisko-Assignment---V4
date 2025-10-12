import groundTruth from './ground-truth.json';

// !!! IMPORTANT: Replace with your actual deployed or local Flask API URL
const RAG_API_URL = 'http://localhost:5000/chat';

interface AssistantResponse {
  answer: string;
  source: 'local' | 'rag';
}

/**
 * 1. Checks local ground-truth data for an exact match.
 */
function askLocalSupport(question: string): string | null {
  const normalizedQ = question.toLowerCase().trim();
  const found = groundTruth.find(
    (item) => normalizedQ.includes(item.q.toLowerCase().trim())
  );
  return found ? found.a : null;
}

/**
 * 2. Calls the Flask RAG API.
 */
async function askLLM(question: string): Promise<string> {
  const response = await fetch(RAG_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`RAG API failed with status: ${response.status}`);
  }

  const data = await response.json();
  // Expecting the final answer text from your Flask API response structure
  return data.response; 
}


/**
 * Main function to get the assistant's answer.
 */
export async function getAssistantResponse(question: string): Promise<AssistantResponse> {
  // First, try local cache (fastest)
  const localAnswer = askLocalSupport(question);
  if (localAnswer) {
    return { answer: localAnswer, source: 'local' };
  }

  // Second, call the RAG API
  try {
    const ragAnswer = await askLLM(question);
    return { answer: ragAnswer, source: 'rag' };
  } catch (error) {
    console.error('Error calling RAG API:', error);
    return { 
      answer: "I'm sorry, my advanced RAG system is currently unavailable. Please try again later or call customer service.", 
      source: 'rag' 
    };
  }
}