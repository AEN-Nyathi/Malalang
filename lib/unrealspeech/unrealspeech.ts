export const getAudioUrl = async (text: string): Promise<string | null> => {
    const UNREAL_API_KEY = process.env.UNREAL_API_KEY || '';
    if (!UNREAL_API_KEY) {
        console.error('UnrealSpeech API key missing');
        return null;
    }

    const endpoint = 'https://api.v8.unrealspeech.com/speech';

    const bodyPayload = {
        Text: text,
        VoiceId: 'Sierra',
        Bitrate: '320k',
        AudioFormat: 'mp3',
        OutputFormat: 'uri',
        TimestampType: 'sentence',
        sync: false, // Set to true if you need immediate URL, but `false` is for async queue
    };

    try {
        const resp = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${UNREAL_API_KEY}` },
            body: JSON.stringify(bodyPayload),
        });

        if (!resp.ok) {
            const errorText = await resp.text();
            console.error(`UnrealSpeech failed: ${resp.status} ${errorText}`);
            return null;
        }

        const data = await resp.json();
        const audioUrl: string | null = data?.OutputUri || data?.audioUrl || null;

        if (!audioUrl) {
             console.error('UnrealSpeech did not return audio URL:', data);
        }

        return audioUrl;
    } catch (err) {
        console.error('[generate-audio] unexpected error', err);
        return null;
    }
};