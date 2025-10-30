import ScriptPanel from '@/app/create-script/components/script-panel';
import { initialProject } from '@/lib/placeholder-data';

export default function CreateScriptPage() {
  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <ScriptPanel initialSegments={initialProject.scriptSegments} initialTopic={initialProject.name} />
        </div>
      </section>
    </main>
  );
}