import { NextRequest, NextResponse } from 'next/server';
import { enhanceAnswerFlow, suggestAnswerFlow } from '@/lib/aiSupport/aiSupport';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, payload } = body;

  if (!action || !payload) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    if (action === 'enhance') {
      const enhancedAnswer = await enhanceAnswerFlow(payload);
      return NextResponse.json({ result: enhancedAnswer });
    } else if (action === 'suggest') {
      const suggestions = await suggestAnswerFlow(payload);
      return NextResponse.json({ result: suggestions });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error(`Error in ${action} action:`, error);
    return NextResponse.json({ error: 'An error occurred on the server.' }, { status: 500 });
  }
}
