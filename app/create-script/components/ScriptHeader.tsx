import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function ScriptHeader() {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <CardTitle className="font-headline">Script & Preview</CardTitle>
      </div>
      <CardDescription>
        Enter a topic to create your script, then generate a full video preview.
      </CardDescription>
    </CardHeader>
  );
}
