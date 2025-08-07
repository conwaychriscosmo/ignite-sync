import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Shield, Zap } from "lucide-react";
import { configProvider } from "@/config/app-config";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onGetStarted: () => void;
  className?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted, className }) => {
  const config = configProvider.getConfig();

  return (
    <div className={cn("min-h-screen bg-gradient-surface flex flex-col", className)}>
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 space-y-8">
        {/* Logo & Brand */}
        <div className="space-y-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-glow">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-safety rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              {config.app.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              {configProvider.getCopy("app_tagline", "en")}
            </p>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="space-y-6 max-w-md">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-safety/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-safety" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Verified Profiles</h3>
              <p className="text-sm text-muted-foreground">
                Every profile is verified for authenticity and safety
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Meaningful Connections</h3>
              <p className="text-sm text-muted-foreground">
                Find people looking for real relationships, not just hookups
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Smart Matching</h3>
              <p className="text-sm text-muted-foreground">
                Our algorithm learns your preferences for better matches
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 w-full max-w-sm">
          <Button
            onClick={onGetStarted}
            className="w-full py-4 text-lg font-semibold bg-gradient-primary shadow-elevated hover:shadow-glow transition-all duration-300"
          >
            Create Account
          </Button>
          
          <Button
            variant="ghost"
            className="w-full py-4 text-lg"
          >
            Already have an account? Sign In
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center space-y-4">
        <p className="text-xs text-muted-foreground">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
        
        {/* Community Badge */}
        {config.community.name !== "Cinder Community" && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-accent-foreground">
              {config.community.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};