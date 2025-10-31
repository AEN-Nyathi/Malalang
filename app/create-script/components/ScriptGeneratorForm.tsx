"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ScriptSegment } from "@/lib/types";
import { LoaderCircle, WandSparkles } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { toast } from "sonner";

interface ScriptGeneratorFormProps {
  setInternalSegments: Dispatch<SetStateAction<ScriptSegment[]>>;
  setIsPreviewing: Dispatch<SetStateAction<boolean>>
}

export default function ScriptGeneratorForm({
  setInternalSegments,setIsPreviewing
}: ScriptGeneratorFormProps) {
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [Topic, setTopic] = useState<string>(
    "Grow Your Local Business with a Professional Website No Deposit Required. Malalang is the best platform to create stunning websites easily."
  );
  const handleGenerateScript = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsGeneratingScript(true);
      try {
        const resp = await fetch("/api/generate-script", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: Topic }),
        });
        const json = await resp.json();
        if (!resp.ok || !json.success) {
          toast.error(json.error || "Failed to generate script");
        } else if (json.segments) {
          setInternalSegments(json.segments);
          toast.success("Script generated successfully.");
          setIsPreviewing(false);
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Failed to generate script");
      } finally {
        setIsGeneratingScript(false);
      }
    },
    [Topic, setInternalSegments]
  );
  return (
    <form onSubmit={handleGenerateScript} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="topic"
          name="topic"
          placeholder="e.g., 'The Future of Renewable Energy'"
          required
          value={Topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isGeneratingScript}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isGeneratingScript}>
        {isGeneratingScript ? (
          <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
        ) : (
          <WandSparkles className="mr-2 h-5 w-5" />
        )}
        <span>Generate Script</span>
      </Button>
    </form>
  );
}
