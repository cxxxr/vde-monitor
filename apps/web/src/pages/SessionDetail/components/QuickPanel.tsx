import { List, X } from "lucide-react";

import { Card, IconButton, LastInputPill, SurfaceButton, Toolbar } from "@/components/ui";
import { agentIconMeta, formatRepoDirLabel, statusIconMeta } from "@/lib/quick-panel-utils";
import type { SessionGroup } from "@/lib/session-group";

import { formatRelativeTime, getLastInputTone } from "../sessionDetailUtils";

type QuickPanelProps = {
  open: boolean;
  sessionGroups: SessionGroup[];
  nowMs: number;
  onOpenLogModal: (paneId: string) => void;
  onClose: () => void;
  onToggle: () => void;
};

export const QuickPanel = ({
  open,
  sessionGroups,
  nowMs,
  onOpenLogModal,
  onClose,
  onToggle,
}: QuickPanelProps) => {
  return (
    <div className="fixed bottom-4 left-6 z-40 flex flex-col items-start gap-3">
      {open && (
        <Card className="font-body animate-panel-enter border-latte-lavender/30 bg-latte-mantle/85 relative max-h-[80dvh] w-[calc(100vw-3rem)] max-w-[320px] overflow-hidden rounded-[28px] border-2 p-4 shadow-[0_25px_80px_-20px_rgba(114,135,253,0.4),0_0_0_1px_rgba(114,135,253,0.15)] ring-1 ring-inset ring-white/10 backdrop-blur-xl">
          <IconButton
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3"
            variant="lavender"
            size="sm"
            aria-label="Close quick panel"
          >
            <X className="h-4 w-4" />
          </IconButton>
          <div className="custom-scrollbar -mr-4 mt-2 max-h-[70dvh] overflow-y-auto overscroll-contain">
            <div className="space-y-3 pr-5">
              {sessionGroups.length === 0 && (
                <div className="border-latte-lavender/20 bg-latte-crust/50 text-latte-subtext0 rounded-2xl border px-3 py-4 text-center text-xs">
                  No sessions available.
                </div>
              )}
              {sessionGroups.map((group) => (
                <div key={group.repoRoot ?? "no-repo"} className="space-y-2">
                  <div className="text-latte-lavender/70 px-2 text-[11px] font-semibold uppercase tracking-wider">
                    {formatRepoDirLabel(group.repoRoot)}
                  </div>
                  <div className="space-y-2">
                    {group.sessions.map((item) => {
                      const displayTitle = item.customTitle ?? item.title ?? item.sessionName;
                      const lastInputTone = getLastInputTone(item.lastInputAt ?? null, nowMs);
                      const statusMeta = statusIconMeta(item.state);
                      const agentMeta = agentIconMeta(item.agent);
                      const StatusIcon = statusMeta.icon;
                      const AgentIcon = agentMeta.icon;
                      return (
                        <SurfaceButton
                          key={item.paneId}
                          type="button"
                          onClick={() => onOpenLogModal(item.paneId)}
                        >
                          <Toolbar>
                            <div className="flex min-w-0 items-center gap-2">
                              <span
                                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${statusMeta.wrap}`}
                                aria-label={statusMeta.label}
                              >
                                <StatusIcon className={`h-3.5 w-3.5 ${statusMeta.className}`} />
                              </span>
                              <span
                                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${agentMeta.wrap}`}
                                aria-label={agentMeta.label}
                              >
                                <AgentIcon className={`h-3.5 w-3.5 ${agentMeta.className}`} />
                              </span>
                              <span className="text-latte-text text-sm font-semibold">
                                {displayTitle}
                              </span>
                            </div>
                            <LastInputPill
                              tone={lastInputTone}
                              label="Last"
                              value={formatRelativeTime(item.lastInputAt, nowMs)}
                              size="xs"
                            />
                          </Toolbar>
                        </SurfaceButton>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
      <IconButton
        type="button"
        onClick={onToggle}
        variant="lavenderStrong"
        size="lg"
        aria-label="Toggle session quick panel"
      >
        <List className="h-5 w-5" />
      </IconButton>
    </div>
  );
};
