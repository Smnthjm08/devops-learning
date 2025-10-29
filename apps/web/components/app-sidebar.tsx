"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Target,
  DollarSign,
  Puzzle,
  BarChart3,
  User,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

const mainNavItems = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/campaigns", label: "Campaigns", icon: Target },
  { href: "/app/donations", label: "Donations", icon: DollarSign },
  { href: "/app/widgets", label: "Widgets", icon: Puzzle },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
];

const secondaryNavItems = [
  { href: "/app/profile", label: "Profile", icon: User },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-4">
            Navigation
          </h2>
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-sidebar-border" />

        {/* Secondary Navigation */}
        <div>
          <h2 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-4">
            Account
          </h2>
          <div className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
