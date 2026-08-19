import { cn } from "@/lib/utils";

export function MfgBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-amber",
        className,
      )}
    >
      JetFlo Mfg
    </span>
  );
}

export function PoweredBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center rounded-full border border-amber/40 bg-amber-soft px-2.5 py-1 text-amber-ink",
        className,
      )}
    >
      Powered by JetFlo
    </span>
  );
}

export function SizeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-caps absolute right-3 bottom-3 z-10 rounded-full bg-primary px-2.5 py-1 text-amber">
      {children}
    </span>
  );
}
