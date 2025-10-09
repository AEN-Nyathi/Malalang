'use client';
import { useState } from 'react';
import type { ScriptSegment } from '@/lib/types';
import { initialProject } from '@/lib/placeholder-data';
import ScriptPanel from '@/app/create-script/components/script-panel';


export default function CreateScriptPage() {
  const [segments, setSegments] = useState<ScriptSegment[]>(initialProject.scriptSegments);
  const [topic, setTopic] = useState(initialProject.name);

  return (
  
    
      <main >
        <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <ScriptPanel
            segments={segments}
            setSegments={setSegments}
            topic={topic}
            setTopic={setTopic}
          />
        </div>
        </section>
      </main>
 
  );
}