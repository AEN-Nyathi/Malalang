### Stream Synthesis

Source: https://docs.v8.unrealspeech.com/index

Use the /stream endpoint for short, time-sensitive audio synthesis tasks, supporting up to 1,000 characters.

```APIDOC
## POST /stream

### Description
Synthesizes speech from text for short, time-sensitive use cases (e.g., chatbots). Supports up to 1,000 characters.

### Method
POST

### Endpoint
/stream

### Parameters
#### Request Body
- **VoiceId** (string) - Required - The ID of the voice to use for synthesis. See 'Parameter Details' for available voices.
- **Bitrate** (string) - Optional - The bitrate for the audio. Defaults to '192k'. Allowed values: '16k', '32k', '48k', '64k', '128k', '192k', '256k', '320k'.
- **Speed** (float) - Optional - Controls the speech speed. Defaults to 0. Range: -1.0 to 1.0.
- **Pitch** (float) - Optional - Controls the speech pitch. Defaults to 1.0. Range: 0.5 to 1.5.

### Request Example
```json
{
  "VoiceId": "Autumn",
  "text": "Hello, this is a test."
}
```

### Response
#### Success Response (200)
- **audio** (string) - Base64 encoded audio data.
- **timestamps** (object) - Timestamps for each word in the synthesized audio.

#### Response Example
```json
{
  "audio": "base64encodedaudio...",
  "timestamps": [
    {
      "word": "Hello",
      "start": 0.1,
      "end": 0.5
    }
  ]
}
```
```

--------------------------------

### Synthesis Tasks

Source: https://docs.v8.unrealspeech.com/index

Utilize the /synthesisTasks endpoint for large text inputs (up to 500,000 characters), returning a task ID for retrieving audio and timestamp URLs.

```APIDOC
## POST /synthesisTasks

### Description
Creates a synthesis task for large text inputs (up to 500,000 characters). Returns a task ID that can be used to retrieve the audio and timestamp URLs once synthesis is complete.

### Method
POST

### Endpoint
/synthesisTasks

### Parameters
#### Request Body
- **VoiceId** (string) - Required - The ID of the voice to use for synthesis. See 'Parameter Details' for available voices.
- **Bitrate** (string) - Optional - The bitrate for the audio. Defaults to '192k'. Allowed values: '16k', '32k', '48k', '64k', '128k', '192k', '256k', '320k'.
- **Speed** (float) - Optional - Controls the speech speed. Defaults to 0. Range: -1.0 to 1.0.
- **Pitch** (float) - Optional - Controls the speech pitch. Defaults to 1.0. Range: 0.5 to 1.5.

### Request Example
```json
{
  "VoiceId": "Melody",
  "text": "This is a very long text for synthesis task creation..."
}
```

### Response
#### Success Response (200)
- **taskId** (string) - The ID of the synthesis task.

#### Response Example
```json
{
  "taskId": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
}
```
```

```APIDOC
## GET /synthesisTasks

### Description
Retrieves the status and results of a previously created synthesis task.

### Method
GET

### Endpoint
/synthesisTasks

### Parameters
#### Query Parameters
- **taskId** (string) - Required - The ID of the synthesis task to retrieve.

### Response
#### Success Response (200)
- **status** (string) - The status of the task (e.g., 'processing', 'completed', 'failed').
- **audioUrl** (string) - (If completed) A publicly accessible URL to the synthesized audio file.
- **timestampsUrl** (string) - (If completed) A publicly accessible URL to the timestamps file.

#### Response Example
```json
{
  "status": "completed",
  "audioUrl": "https://cdn.unrealspeech.com/audio/...".",
  "timestampsUrl": "https://cdn.unrealspeech.com/timestamps/..."
}
```
```

--------------------------------

### Speech Synthesis

Source: https://docs.v8.unrealspeech.com/index

Use the /speech endpoint for synthesizing speech from text, returning publicly accessible URLs to the audio and timestamps. Supports up to 3,000 characters.

```APIDOC
## POST /speech

### Description
Synthesizes speech from text, returning publicly accessible URLs for the audio and timestamps. Supports up to 3,000 characters.

### Method
POST

### Endpoint
/speech

### Parameters
#### Request Body
- **VoiceId** (string) - Required - The ID of the voice to use for synthesis. See 'Parameter Details' for available voices.
- **Bitrate** (string) - Optional - The bitrate for the audio. Defaults to '192k'. Allowed values: '16k', '32k', '48k', '64k', '128k', '192k', '256k', '320k'.
- **Speed** (float) - Optional - Controls the speech speed. Defaults to 0. Range: -1.0 to 1.0.
- **Pitch** (float) - Optional - Controls the speech pitch. Defaults to 1.0. Range: 0.5 to 1.5.

### Request Example
```json
{
  "VoiceId": "Noah",
  "text": "This is a longer test for speech synthesis."
}
```

### Response
#### Success Response (200)
- **audioUrl** (string) - A publicly accessible URL to the synthesized audio file.
- **timestampsUrl** (string) - A publicly accessible URL to the timestamps file.

#### Response Example
```json
{
  "audioUrl": "https://cdn.unrealspeech.com/audio/...".",
  "timestampsUrl": "https://cdn.unrealspeech.com/timestamps/..."
}
```
```

--------------------------------

### WebSocket Stream with Timestamps

Source: https://docs.v8.unrealspeech.com/index

Utilize the wss://api.v8.unrealspeech.com/streamWithTimestamps endpoint for real-time audio streaming with per-word timestamps.

```APIDOC
## WebSocket /streamWithTimestamps

### Description
Establishes a WebSocket connection to stream both audio and per-word timestamps in real-time.

### Method
WebSocket

### Endpoint
wss://api.v8.unrealspeech.com/streamWithTimestamps

### Parameters
#### Request Body (sent over WebSocket)
- **VoiceId** (string) - Required - The ID of the voice to use for synthesis.
- **text** (string) - Required - The text to synthesize.
- **Bitrate** (string) - Optional - The bitrate for the audio. Defaults to '192k'.
- **Speed** (float) - Optional - Controls the speech speed. Defaults to 0.
- **Pitch** (float) - Optional - Controls the speech pitch. Defaults to 1.0.

### Request Example
```javascript
const socket = new WebSocket('wss://api.v8.unrealspeech.com/streamWithTimestamps');

socket.onopen = () => {
  socket.send(JSON.stringify({
    "VoiceId": "Hannah",
    "text": "Streaming with timestamps."
  }));
};

socket.onmessage = (event) => {
  // Process incoming audio and timestamp data
  console.log(event.data);
};
```

### Response (received over WebSocket)
#### Success Response
- **audio** (string) - Base64 encoded audio data chunks.
- **timestamps** (array) - An array of timestamp objects for each word.
  - **word** (string) - The synthesized word.
  - **start** (float) - The start time of the word in seconds.
  - **end** (float) - The end time of the word in seconds.

#### Response Example
```json
{
  "audio": "base64encodedchunk...",
  "timestamps": [
    {
      "word": "Streaming",
      "start": 0.2,
      "end": 0.8
    },
    {
      "word": "with",
      "start": 0.9,
      "end": 1.1
    }
  ]
}
```
```