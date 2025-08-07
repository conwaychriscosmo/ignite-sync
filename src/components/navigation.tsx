import React from "react";
import { Heart, MessageCircle, User, Compass, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { configProvider } from "@/config/app-config";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, className }) => {
  const config = configProvider.getConfig();
  
  const tabs = [
    {
      id: "discover",
      icon: Flame,
      label: configProvider.getCopy("discover_title", "en"),
      enabled: true,
    },
    {
      id: "likes",
      icon: Heart,
      label: "Likes",
      enabled: true,
    },
    {
      id: "messages",
      icon: MessageCircle,
      label: configProvider.getCopy("messages_title", "en"),
      enabled: configProvider.isFeatureEnabled("messagingEnabled"),
    },
    {
      id: "profile",
      icon: User,
      label: configProvider.getCopy("profile_title", "en"),
      enabled: true,
    },
  ].filter(tab => tab.enabled);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 px-4 py-2 safe-area-pb",
      className
    )}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 transition-all duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};