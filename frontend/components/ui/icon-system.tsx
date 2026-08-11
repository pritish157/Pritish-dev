import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  Download,
  Copy,
  Check,
  X,
  Search,
  Filter,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Code2,
  Database,
  Server,
  Cpu,
  Layers,
  Globe,
  Terminal,
  Shield,
  Box
} from "lucide-react";
import { RiGithubFill, RiLinkedinFill, RiTwitterXFill, RiMailLine, RiFileTextLine } from "react-icons/ri";
import { IconWrapper } from "./icon-wrapper";

export { IconWrapper };

/**
 * SocialIcon Component — Mapped social platform icons.
 */
export type SocialIconProps = {
  platform: "github" | "linkedin" | "twitter" | "email" | "resume";
  className?: string;
  size?: number;
};

export function SocialIcon({ platform, className, size = 18 }: SocialIconProps) {
  const map = {
    github: <RiGithubFill size={size} />,
    linkedin: <RiLinkedinFill size={size} />,
    twitter: <RiTwitterXFill size={size} />,
    email: <RiMailLine size={size} />,
    resume: <RiFileTextLine size={size} />
  };

  return <span className={cn("inline-flex shrink-0", className)}>{map[platform]}</span>;
}

/**
 * TechIcon Component — Tech stack brand icon renderer.
 */
export type TechIconProps = {
  name: string;
  className?: string;
  size?: number;
};

export function TechIcon({ name, className, size = 18 }: TechIconProps) {
  const normalized = name.toLowerCase();

  let icon = <Code2 size={size} />;

  if (normalized.includes("node") || normalized.includes("express") || normalized.includes("server")) {
    icon = <Server size={size} />;
  } else if (normalized.includes("mongo") || normalized.includes("sql") || normalized.includes("redis") || normalized.includes("db")) {
    icon = <Database size={size} />;
  } else if (normalized.includes("react") || normalized.includes("next") || normalized.includes("front")) {
    icon = <Layers size={size} />;
  } else if (normalized.includes("docker") || normalized.includes("container") || normalized.includes("box")) {
    icon = <Box size={size} />;
  } else if (normalized.includes("api") || normalized.includes("http") || normalized.includes("web")) {
    icon = <Globe size={size} />;
  } else if (normalized.includes("cli") || normalized.includes("bash") || normalized.includes("terminal")) {
    icon = <Terminal size={size} />;
  } else if (normalized.includes("security") || normalized.includes("steg") || normalized.includes("auth")) {
    icon = <Shield size={size} />;
  } else if (normalized.includes("python") || normalized.includes("algo") || normalized.includes("cpu")) {
    icon = <Cpu size={size} />;
  }

  return <span className={cn("inline-flex shrink-0 text-violet-400", className)}>{icon}</span>;
}

/**
 * ActionIcon Component — Clickable icon button wrapper for actions (copy, external link, download, search).
 */
export type ActionIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  action: "copy" | "external" | "download" | "close" | "search" | "filter" | "chevron";
  active?: boolean;
};

export function ActionIcon({ action, active, className, ...props }: ActionIconProps) {
  const [copied, setCopied] = React.useState(false);

  const icons = {
    copy: copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />,
    external: <ExternalLink className="h-4 w-4" />,
    download: <Download className="h-4 w-4" />,
    close: <X className="h-4 w-4" />,
    search: <Search className="h-4 w-4" />,
    filter: <Filter className="h-4 w-4" />,
    chevron: <ChevronDown className="h-4 w-4" />
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (action === "copy") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
        active && "border-violet-500/40 bg-violet-500/10 text-violet-300",
        className
      )}
      {...props}
    >
      {icons[action]}
    </button>
  );
}

/**
 * StatusIcon Component — Status feedback icon renderer.
 */
export type StatusIconProps = {
  status: "success" | "warning" | "error" | "info";
  className?: string;
  size?: number;
};

export function StatusIcon({ status, className, size = 20 }: StatusIconProps) {
  const map = {
    success: <CheckCircle2 size={size} className="text-emerald-400" />,
    warning: <AlertTriangle size={size} className="text-amber-400" />,
    error: <AlertCircle size={size} className="text-rose-400" />,
    info: <Info size={size} className="text-sky-400" />
  };

  return <span className={cn("inline-flex shrink-0", className)}>{map[status]}</span>;
}
