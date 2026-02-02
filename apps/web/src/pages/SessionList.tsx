import { Link } from "@tanstack/react-router";
import { MonitorX, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Badge,
  Button,
  Callout,
  Card,
  ConnectionStatusPill,
  EmptyCard,
  FilterToggleGroup,
  GlassPanel,
  GlowCard,
  LastInputPill,
  TagPill,
  Toolbar,
} from "@/components/ui";
import { buildSessionGroups } from "@/lib/session-group";
import { useSessions } from "@/state/session-context";

const stateTone = (state: string) => {
  switch (state) {
    case "RUNNING":
      return "running";
    case "WAITING_INPUT":
      return "waiting";
    case "WAITING_PERMISSION":
      return "permission";
    default:
      return "unknown";
  }
};

const agentTone = (agent: string) => {
  switch (agent) {
    case "codex":
      return "codex" as const;
    case "claude":
      return "claude" as const;
    default:
      return "unknown" as const;
  }
};

const agentLabel = (agent: string) => {
  switch (agent) {
    case "codex":
      return "CODEX";
    case "claude":
      return "CLAUDE";
    default:
      return "UNKNOWN";
  }
};

const formatPath = (value: string | null) => {
  if (!value) return "—";
  const match = value.match(/^\/(Users|home)\/[^/]+(\/.*)?$/);
  if (match) {
    return `~${match[2] ?? ""}`;
  }
  return value;
};

const formatRepoLabel = (value: string | null) => {
  if (!value) return "No repo";
  return formatPath(value);
};

const formatRelativeTime = (value: string | null, nowMs: number) => {
  if (!value) return "-";
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) return "-";
  const diffSec = Math.max(0, Math.floor((nowMs - ts) / 1000));
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}d ago`;
};

const getLastInputTone = (value: string | null, nowMs: number) => {
  if (!value) {
    return {
      pill: "border-latte-surface2/70 bg-latte-crust/60 text-latte-subtext0",
      dot: "bg-latte-subtext0",
    };
  }
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) {
    return {
      pill: "border-latte-surface2/70 bg-latte-crust/60 text-latte-subtext0",
      dot: "bg-latte-subtext0",
    };
  }
  const diffSec = Math.max(0, Math.floor((nowMs - ts) / 1000));
  if (diffSec < 300) {
    return {
      pill: "border-latte-green/40 bg-latte-green/10 text-latte-green",
      dot: "bg-latte-green shadow-[0_0_8px_rgba(64,160,43,0.6)]",
    };
  }
  if (diffSec < 1800) {
    return {
      pill: "border-latte-yellow/40 bg-latte-yellow/10 text-latte-yellow",
      dot: "bg-latte-yellow shadow-[0_0_8px_rgba(223,142,29,0.6)]",
    };
  }
  if (diffSec < 7200) {
    return {
      pill: "border-latte-peach/40 bg-latte-peach/10 text-latte-peach",
      dot: "bg-latte-peach shadow-[0_0_8px_rgba(239,159,118,0.6)]",
    };
  }
  return {
    pill: "border-latte-red/40 bg-latte-red/10 text-latte-red",
    dot: "bg-latte-red shadow-[0_0_8px_rgba(210,15,57,0.6)]",
  };
};

export const SessionListPage = () => {
  const { sessions, connected, connectionIssue, readOnly, reconnect, refreshSessions } =
    useSessions();
  const [filter, setFilter] = useState("ALL");
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    return sessions.filter((session) => {
      const matchesFilter = filter === "ALL" || session.state === filter;
      return matchesFilter;
    });
  }, [filter, sessions]);

  const groups = useMemo(() => buildSessionGroups(filtered), [filtered]);

  return (
    <div className="animate-fade-in-up mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <header className="shadow-glass border-latte-surface1/60 bg-latte-base/80 animate-fade-in stagger-1 flex flex-col gap-4 rounded-[32px] border p-6 opacity-0 backdrop-blur">
        <Toolbar className="gap-3">
          <div>
            <p className="text-latte-subtext0 text-xs uppercase tracking-[0.5em]">
              tmux-agent-monitor
            </p>
            <h1 className="font-display text-latte-text text-4xl font-semibold tracking-tight">
              Live Sessions
            </h1>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <ConnectionStatusPill connected={connected} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (connected ? refreshSessions() : reconnect())}
                aria-label={connected ? "Refresh" : "Reconnect"}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">{connected ? "Refresh" : "Reconnect"}</span>
              </Button>
            </div>
          </div>
        </Toolbar>
        <FilterToggleGroup
          value={filter}
          onChange={setFilter}
          options={["ALL", "RUNNING", "WAITING_INPUT", "WAITING_PERMISSION", "UNKNOWN"].map(
            (state) => ({
              value: state,
              label: state.replace("_", " "),
            }),
          )}
        />
        {readOnly && (
          <Callout tone="warning" size="sm">
            Read-only mode is active. Actions are disabled.
          </Callout>
        )}
        {connectionIssue && (
          <Callout tone="warning" size="sm">
            {connectionIssue}
          </Callout>
        )}
      </header>

      <div className="flex flex-col gap-6">
        {sessions.length === 0 && (
          <EmptyCard
            icon={<MonitorX className="text-latte-overlay1 h-10 w-10" />}
            title="No Active Sessions"
            description="Start a tmux session with Codex or Claude Code to see it here. Sessions will appear automatically when detected."
            className="py-16"
            iconWrapperClassName="bg-latte-surface1/50 h-20 w-20"
            titleClassName="text-xl"
            descriptionClassName="max-w-sm"
            action={
              <Button variant="ghost" size="sm" onClick={refreshSessions} className="mt-2">
                <RefreshCw className="h-4 w-4" />
                Check Again
              </Button>
            }
          />
        )}
        {sessions.length > 0 && groups.length === 0 && (
          <EmptyCard
            icon={<Search className="text-latte-overlay1 h-8 w-8" />}
            title="No Matching Sessions"
            description="No sessions match the selected filter. Try selecting a different status."
            className="py-12"
            iconWrapperClassName="bg-latte-surface1/50 h-16 w-16"
            titleClassName="text-lg"
            action={
              <Button variant="ghost" size="sm" onClick={() => setFilter("ALL")} className="mt-2">
                Show All Sessions
              </Button>
            }
          />
        )}
        {groups.map((group) => {
          const groupTone = getLastInputTone(group.lastInputAt, nowMs);
          return (
            <GlowCard key={group.repoRoot ?? "no-repo"}>
              <GlassPanel>
                <p className="text-latte-subtext0 text-[10px] uppercase tracking-[0.4em]">
                  Repository
                </p>
                <p className="text-latte-text mt-1 text-base font-semibold">
                  {formatRepoLabel(group.repoRoot)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <TagPill tone="neutral">{group.sessions.length} sessions</TagPill>
                  <LastInputPill
                    tone={groupTone}
                    label="Latest input"
                    value={formatRelativeTime(group.lastInputAt, nowMs)}
                    size="md"
                  />
                </div>
              </GlassPanel>
              <div className="grid gap-4 md:grid-cols-2">
                {group.sessions.map((session) => {
                  const sessionTone = getLastInputTone(session.lastInputAt, nowMs);
                  return (
                    <Link
                      key={session.paneId}
                      to="/sessions/$paneId"
                      params={{ paneId: session.paneId }}
                      className="group"
                    >
                      <Card interactive className="p-6">
                        <div className="flex flex-col gap-2">
                          <Toolbar className="gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge tone={stateTone(session.state)}>{session.state}</Badge>
                            </div>
                            {session.pipeConflict && <TagPill tone="danger">Pipe conflict</TagPill>}
                          </Toolbar>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone={agentTone(session.agent)}>
                              {agentLabel(session.agent)}
                            </Badge>
                            <LastInputPill
                              tone={sessionTone}
                              label="Last input"
                              value={formatRelativeTime(session.lastInputAt, nowMs)}
                              size="sm"
                            />
                          </div>
                        </div>
                        <div className="mt-4 space-y-3">
                          <h3 className="font-display text-latte-text text-lg">
                            {session.customTitle ?? session.title ?? session.sessionName}
                          </h3>
                          <p className="text-latte-subtext0 text-sm">
                            {formatPath(session.currentPath)}
                          </p>
                          {session.lastMessage && (
                            <p className="text-latte-overlay1 text-xs">{session.lastMessage}</p>
                          )}
                        </div>
                        <div className="text-latte-overlay1 mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                          <TagPill tone="meta">Session {session.sessionName}</TagPill>
                          <TagPill tone="meta">Window {session.windowIndex}</TagPill>
                          <TagPill tone="meta">Pane {session.paneId}</TagPill>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
};
