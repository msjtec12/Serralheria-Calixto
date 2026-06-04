"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b bg-white dark:bg-zinc-950 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center">
        {/* Placeholder para Mobile Menu Trigger */}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Olá, {session?.user?.name || "Usuário"}
        </span>
        <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/login" })}>
          <LogOut className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </Button>
      </div>
    </header>
  );
}
