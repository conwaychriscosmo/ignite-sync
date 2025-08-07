import React, { useState, useEffect } from "react";
import { ProfileCard, Profile } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { configProvider } from "@/config/app-config";
import { Heart, Sparkles, Settings, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock profiles for demonstration
const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 26,
    distance: 2.3,
    photos: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face"
    ],
    bio: "Artist & coffee enthusiast. Looking for someone who appreciates deep conversations and spontaneous adventures. Love hiking, painting, and trying new restaurants.",
    interests: ["Art", "Coffee", "Hiking", "Photography", "Travel"],
    verified: true,
    profession: "Graphic Designer",
    education: "Art Institute"
  },
  {
    id: "2", 
    name: "Alex",
    age: 29,
    distance: 5.1,
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face"
    ],
    bio: "Software engineer who loves rock climbing and live music. Always up for trying new cuisines or exploring hidden gems in the city.",
    interests: ["Tech", "Climbing", "Music", "Food", "Startups"],
    verified: true,
    profession: "Software Engineer",
    education: "UC Berkeley"
  },
  {
    id: "3",
    name: "Maya",
    age: 24,
    distance: 1.8,
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop&crop=face"
    ],
    bio: "Yoga instructor and wellness coach. Passionate about mindful living, sustainable fashion, and connecting with nature.",
    interests: ["Yoga", "Wellness", "Sustainability", "Nature", "Meditation"],
    verified: true,
    profession: "Yoga Instructor",
    education: "Wellness Institute"
  }
];

interface DiscoveryScreenProps {
  className?: string;
}

export const DiscoveryScreen: React.FC<DiscoveryScreenProps> = ({ className }) => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [newMatch, setNewMatch] = useState<Profile | null>(null);

  const config = configProvider.getConfig();
  const maxSwipes = config.businessRules.free_tier.swipe_limit_per_day;

  const currentProfile = profiles[currentProfileIndex];
  const isAtLimit = swipeCount >= maxSwipes;

  const handleLike = () => {
    if (isAtLimit || !currentProfile) return;
    
    // Simulate match probability (30% chance)
    const isMatch = Math.random() < 0.3;
    
    if (isMatch) {
      setMatches(prev => [...prev, currentProfile]);
      setNewMatch(currentProfile);
      setShowMatch(true);
    }
    
    nextProfile();
  };

  const handleNope = () => {
    if (isAtLimit || !currentProfile) return;
    nextProfile();
  };

  const handleSuperLike = () => {
    if (isAtLimit || !currentProfile) return;
    
    // Super like has higher match probability (70% chance)
    const isMatch = Math.random() < 0.7;
    
    if (isMatch) {
      setMatches(prev => [...prev, currentProfile]);
      setNewMatch(currentProfile);
      setShowMatch(true);
    }
    
    nextProfile();
  };

  const nextProfile = () => {
    setSwipeCount(prev => prev + 1);
    setCurrentProfileIndex(prev => prev + 1);
  };

  const closeMatchModal = () => {
    setShowMatch(false);
    setNewMatch(null);
  };

  if (currentProfileIndex >= profiles.length) {
    return (
      <div className={cn("flex flex-col items-center justify-center min-h-screen p-6", className)}>
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">
            {configProvider.getCopy("no_more_profiles", "en") || "No more profiles"}
          </h2>
          <p className="text-muted-foreground max-w-md">
            You've seen everyone in your area! Try expanding your discovery settings or check back later for new people.
          </p>
          <Button 
            onClick={() => {
              setCurrentProfileIndex(0);
              setSwipeCount(0);
            }}
            className="mt-4"
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  if (isAtLimit) {
    return (
      <div className={cn("flex flex-col items-center justify-center min-h-screen p-6", className)}>
        <div className="text-center space-y-4">
          <Heart className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Daily limit reached!</h2>
          <p className="text-muted-foreground max-w-md">
            You've used all {maxSwipes} of your daily likes. Upgrade to {config.businessRules.monetization.tiers[0]?.name} for unlimited likes!
          </p>
          <Button className="mt-4 bg-gradient-primary">
            {configProvider.getCopy("premium_cta", "en")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col min-h-screen bg-gradient-surface", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-foreground">
            {configProvider.getCopy("discover_title", "en")}
          </h1>
          <Badge variant="secondary" className="text-xs">
            {swipeCount}/{maxSwipes}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        {currentProfile && (
          <ProfileCard
            profile={currentProfile}
            onLike={handleLike}
            onNope={handleNope}
            onSuperLike={handleSuperLike}
            className="max-w-sm w-full"
          />
        )}
      </div>

      {/* Match Modal */}
      {showMatch && newMatch && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-primary rounded-3xl p-8 text-center max-w-sm w-full text-white relative overflow-hidden">
            {/* Celebratory Background */}
            <div className="absolute inset-0 bg-gradient-glow opacity-50" />
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">
                {configProvider.getCopy("match_screen_title", "en")}
              </h2>
              <p className="text-white/90 mb-6">
                You and {newMatch.name} liked each other!
              </p>
              
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
                  <img 
                    src={newMatch.photos[0]} 
                    alt="You" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
                  <img 
                    src={newMatch.photos[0]} 
                    alt={newMatch.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={closeMatchModal}
                  className="w-full bg-white text-primary hover:bg-white/90"
                >
                  Send Message
                </Button>
                <Button 
                  onClick={closeMatchModal}
                  variant="ghost"
                  className="w-full text-white hover:bg-white/10"
                >
                  Keep Swiping
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};