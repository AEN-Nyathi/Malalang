import ScriptPanel from "@/app/create-script/components/script-panel";
import { Card } from "@/components/ui/card";
import ScriptHeader from "./components/ScriptHeader";

export default function CreateScriptPage() {
  return (
    <main>
      <section className="p-20 bg-slate-900">
        <Card className="flex flex-col h-full overflow-hidden">
          <ScriptHeader />
          <ScriptPanel />
        </Card>
      </section>
    </main>
  );
}
