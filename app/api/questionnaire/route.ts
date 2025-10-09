import { enhanceAnswerFlow, suggestAnswerFlow } from '@/lib/aiSupport/genkit';
import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, payload } = body;

  if (!action || !payload) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders });
  }

  try {
    if (action === 'enhance') {
      const enhancedAnswer = await enhanceAnswerFlow(payload);
      return NextResponse.json({ result: enhancedAnswer }, { headers: corsHeaders });
    } else if (action === 'suggest') {
      const suggestions = await suggestAnswerFlow(payload);
      return NextResponse.json({ result: suggestions }, { headers: corsHeaders });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400, headers: corsHeaders });
  } catch (error) {
    console.error(`Error in ${action} action:`, error);
    return NextResponse.json({ error: 'An error occurred on the server.' }, { status: 500, headers: corsHeaders });
  }
}
