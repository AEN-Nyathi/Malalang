import ScriptPanel from './script-panel';
import type { ScriptSegment } from '../../../lib/types';
import { initialProject } from '@/lib/placeholder-data';

export default function ScriptPanelServer() {
  // Server component: provide only initial data. The client ScriptPanel will
  // call useActionState locally to wire up server actions.
  return (
    <ScriptPanel
      initialSegments={initialProject.scriptSegments}
      initialTopic={initialProject.name}
    />
  );
}
