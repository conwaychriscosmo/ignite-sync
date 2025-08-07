import React, { useState } from "react";
import { Heart, X, Star, RotateCcw, Zap, MapPin, Shield, Camera } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Profile {
  id: string;
  name: string;
  age: number;
  distance: number;
  photos: string[];
  bio?: string;
  interests?: string[];
  verified: boolean;
  profession?: string;
  education?: string;
}

interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onNope: () => void;
  onSuperLike: () => void;
  onRewind?: () => void;
  onBoost?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ profile, onLike, onNope, onSuperLike, onRewind, onBoost, isLoading, className }, ref) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    const nextPhoto = () => {
      if (profile.photos.length > 1) {
        setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length);
      }
    };

    const prevPhoto = () => {
      if (profile.photos.length > 1) {
        setCurrentPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-sm mx-auto bg-card rounded-3xl overflow-hidden shadow-elevated",
          "transform transition-all duration-300 hover:scale-[1.02]",
          isLoading && "opacity-50 pointer-events-none",
          className
        )}
      >
        {/* Photo Section */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={profile.photos[currentPhotoIndex]}
            alt={`${profile.name}'s photo`}
            className="w-full h-full object-cover"
            onClick={() => setShowDetails(!showDetails)}
          />
          
          {/* Photo Navigation */}
          {profile.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
              >
                ←
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
              >
                →
              </button>
              
              {/* Photo Indicators */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
                {profile.photos.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentPhotoIndex ? "bg-white" : "bg-white/40"
                    )}
                  />
                ))}
              </div>
            </>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-overlay" />

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold">{profile.name}</h3>
              <span className="text-xl">{profile.age}</span>
              {profile.verified && (
                <Shield className="w-5 h-5 text-safety fill-safety" />
              )}
            </div>
            
            <div className="flex items-center gap-1 text-white/80 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{profile.distance} km away</span>
            </div>

            {/* Quick Details */}
            {!showDetails && (
              <div className="space-y-1">
                {profile.profession && (
                  <p className="text-sm text-white/90">{profile.profession}</p>
                )}
                {profile.interests && profile.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.slice(0, 3).map((interest, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-white/20 text-white border-white/30"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Extended Details */}
            {showDetails && (
              <div className="space-y-3 max-h-32 overflow-y-auto">
                {profile.bio && (
                  <p className="text-sm text-white/90 leading-relaxed">{profile.bio}</p>
                )}
                
                {profile.interests && profile.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-white/20 text-white border-white/30"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {profile.education && (
                  <p className="text-sm text-white/80">{profile.education}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-gradient-surface">
          <div className="flex items-center justify-center gap-4">
            {onRewind && (
              <ActionButton
                variant="rewind"
                size="sm"
                onClick={onRewind}
                icon={<RotateCcw className="w-4 h-4" />}
              />
            )}
            
            <ActionButton
              variant="nope"
              size="default"
              onClick={onNope}
              icon={<X className="w-5 h-5" />}
            />
            
            <ActionButton
              variant="super-like"
              size="lg"
              onClick={onSuperLike}
              icon={<Star className="w-6 h-6" />}
            />
            
            <ActionButton
              variant="like"
              size="default"
              onClick={onLike}
              icon={<Heart className="w-5 h-5" />}
            />
            
            {onBoost && (
              <ActionButton
                variant="boost"
                size="sm"
                onClick={onBoost}
                icon={<Zap className="w-4 h-4" />}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";