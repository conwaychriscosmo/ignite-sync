import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Camera, Heart, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { configProvider } from "@/config/app-config";
import { cn } from "@/lib/utils";

interface OnboardingData {
  name: string;
  age: string;
  gender: string;
  interestedIn: string;
  location: string;
  photos: string[];
  bio: string;
  interests: string[];
  profession: string;
}

interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
  className?: string;
}

const INTERESTS_OPTIONS = [
  "Art", "Music", "Travel", "Food", "Sports", "Books", "Movies", "Tech",
  "Fitness", "Nature", "Photography", "Gaming", "Dancing", "Cooking",
  "Wine", "Coffee", "Hiking", "Yoga", "Meditation", "Fashion"
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, className }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    gender: "",
    interestedIn: "",
    location: "",
    photos: [],
    bio: "",
    interests: [],
    profession: "",
  });

  const config = configProvider.getConfig();
  const totalSteps = 6;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    updateData(
      "interests",
      data.interests.includes(interest)
        ? data.interests.filter(i => i !== interest)
        : [...data.interests, interest]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.name.trim().length > 0;
      case 1: return data.age && parseInt(data.age) >= 18;
      case 2: return data.gender && data.interestedIn;
      case 3: return data.photos.length >= config.profile.photo_policy.min_photos;
      case 4: return data.bio.trim().length > 0;
      case 5: return data.interests.length >= 3;
      default: return true;
    }
  };

  const handleComplete = () => {
    if (canProceed()) {
      onComplete(data);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What's your name?</h2>
              <p className="text-muted-foreground">This is how you'll appear to other users</p>
            </div>
            <div className="space-y-4">
              <Input
                value={data.name}
                onChange={(e) => updateData("name", e.target.value)}
                placeholder="Enter your first name"
                className="text-center text-lg py-6"
                maxLength={30}
              />
              <p className="text-sm text-muted-foreground">
                Only your first name will be shown
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">How old are you?</h2>
              <p className="text-muted-foreground">You must be 18 or older to use Cinder</p>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                value={data.age}
                onChange={(e) => updateData("age", e.target.value)}
                placeholder="Enter your age"
                className="text-center text-lg py-6"
                min="18"
                max="100"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">I am a...</h2>
              <p className="text-muted-foreground">Choose your gender identity</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {["Woman", "Man", "Non-binary", "Other"].map((option) => (
                  <Button
                    key={option}
                    variant={data.gender === option ? "default" : "outline"}
                    onClick={() => updateData("gender", option)}
                    className="py-4 text-lg"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold text-foreground">Show me...</h3>
              <div className="grid grid-cols-1 gap-3">
                {["Women", "Men", "Everyone"].map((option) => (
                  <Button
                    key={option}
                    variant={data.interestedIn === option ? "default" : "outline"}
                    onClick={() => updateData("interestedIn", option)}
                    className="py-4 text-lg"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Add your photos</h2>
              <p className="text-muted-foreground">
                Upload at least {config.profile.photo_policy.min_photos} photos to continue
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: config.profile.photo_policy.max_photos }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-[3/4] rounded-2xl border-2 border-dashed border-border",
                    "flex items-center justify-center cursor-pointer hover:border-primary transition-colors",
                    data.photos[index] && "border-solid border-primary"
                  )}
                  onClick={() => {
                    // Simulate photo upload
                    const mockPhoto = `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=600&fit=crop&crop=face`;
                    const newPhotos = [...data.photos];
                    if (newPhotos[index]) {
                      newPhotos.splice(index, 1);
                    } else {
                      newPhotos[index] = mockPhoto;
                    }
                    updateData("photos", newPhotos.filter(Boolean));
                  }}
                >
                  {data.photos[index] ? (
                    <img
                      src={data.photos[index]}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Add Photo</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {configProvider.isFeatureEnabled("profileVerificationRequired") && (
              <div className="flex items-center gap-2 justify-center text-safety">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Photo verification required</span>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Tell us about yourself</h2>
              <p className="text-muted-foreground">Write a bio that shows your personality</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <textarea
                  value={data.bio}
                  onChange={(e) => updateData("bio", e.target.value)}
                  placeholder="I'm passionate about..."
                  className="w-full p-4 border border-border rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-sm text-muted-foreground text-right">
                  {data.bio.length}/500
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profession">What do you do?</Label>
                <Input
                  id="profession"
                  value={data.profession}
                  onChange={(e) => updateData("profession", e.target.value)}
                  placeholder="Your profession"
                  className="py-3"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What are you into?</h2>
              <p className="text-muted-foreground">Choose at least 3 interests</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS_OPTIONS.map((interest) => (
                <Badge
                  key={interest}
                  variant={data.interests.includes(interest) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer py-2 px-4 text-sm font-medium transition-all",
                    data.interests.includes(interest) 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-accent"
                  )}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Selected: {data.interests.length}/10
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("min-h-screen bg-gradient-surface flex flex-col", className)}>
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="opacity-70 hover:opacity-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Cinder</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {currentStep + 1}/{totalSteps}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {renderStep()}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button
          onClick={currentStep === totalSteps - 1 ? handleComplete : nextStep}
          disabled={!canProceed()}
          className="w-full py-4 text-lg font-semibold bg-gradient-primary"
        >
          {currentStep === totalSteps - 1 ? "Complete Profile" : "Continue"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};