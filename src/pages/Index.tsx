import React, { useState } from "react";
import { SplashScreen } from "@/components/splash-screen";
import { OnboardingScreen } from "@/components/onboarding-screen";
import { DiscoveryScreen } from "@/components/discovery-screen";
import { Navigation } from "@/components/navigation";
import { configProvider } from "@/config/app-config";

type AppState = "splash" | "onboarding" | "main";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("splash");
  const [activeTab, setActiveTab] = useState("discover");
  const [userProfile, setUserProfile] = useState(null);

  const handleGetStarted = () => {
    setAppState("onboarding");
  };

  const handleOnboardingComplete = (data: any) => {
    setUserProfile(data);
    setAppState("main");
  };

  if (appState === "splash") {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  if (appState === "onboarding") {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Main Content */}
      {activeTab === "discover" && <DiscoveryScreen />}
      
      {activeTab === "likes" && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Likes You</h2>
            <p className="text-muted-foreground">See who liked you with premium</p>
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-glow rounded-2xl blur-sm" />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "messages" && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Messages</h2>
            <p className="text-muted-foreground">Start matching to begin conversations</p>
          </div>
        </div>
      )}
      
      {activeTab === "profile" && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Your Profile</h2>
            <p className="text-muted-foreground">Edit your profile and settings</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
