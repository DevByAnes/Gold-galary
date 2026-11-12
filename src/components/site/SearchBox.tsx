import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export function SearchBox({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    void navigate({ to: "/products", search: { q: q.trim() || undefined } });
  };
  return (
    <form role="search" onSubmit={submit} className={cn("relative", className)}>
      <label htmlFor={`search-${tone}`} className="sr-only">
        جستجوی محصولات
      </label>
      <input
        id={`search-${tone}`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="جستجوی محصولات..."
        className={cn(
          "h-11 w-full rounded-md border pe-11 ps-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold",
          tone === "light"
            ? "border-border bg-cream text-foreground"
            : "border-ink-line bg-ink-soft text-ink-foreground placeholder:text-ink-muted",
        )}
      />
      <button
        type="submit"
        aria-label="جستجو"
        className={cn(
          "absolute inset-y-0 end-0 grid w-11 place-items-center",
          tone === "light" ? "text-muted-foreground hover:text-foreground" : "text-ink-muted hover:text-gold",
        )}
      >
        <Search className="size-[18px]" strokeWidth={1.6} />
      </button>
    </form>
  );
}
