import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = typeof body?.text === 'string' ? body.text : null;
    if (!text) {
      return NextResponse.json({ error: 'text required' }, { status: 400 });
    }

    const UNREAL_API_KEY = process.env.UNREAL_API_KEY || '';
    const UNREAL_VOICE_ID = process.env.UNREAL_VOICE_ID || 'Sierra';
    const endpoint = 'https://api.v8.unrealspeech.com/speech';

    const bodyPayload = {
      Text: text,
      VoiceId: UNREAL_VOICE_ID,
      Bitrate: process.env.UNREAL_BITRATE || '320k',
      AudioFormat: 'mp3',
      OutputFormat: 'uri',
      TimestampType: 'sentence',
      sync: false,
    };

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${UNREAL_API_KEY}` },
      body: JSON.stringify(bodyPayload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      const msg = `UnrealSpeech failed: ${resp.status} ${text}`;
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const data = await resp.json();
    const audioUrl: string | null = data?.OutputUri || data?.audioUrl || null;
    if (!audioUrl) {
      return NextResponse.json({ error: 'UnrealSpeech did not return audio URL' }, { status: 500 });
    }
    return NextResponse.json({ audioUrl });
  } catch (err: any) {
    console.error('[generate-audio] unexpected error', err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
