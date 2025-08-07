// YAML-driven configuration system as outlined in the blueprint

export interface AppConfig {
  version: string;
  app: {
    name: string;
    logo_url: string;
  };
  theming: {
    mode: 'light' | 'dark' | 'system';
    animations_enabled: boolean;
    corner_radius: 'sm' | 'md' | 'lg' | 'full';
  };
  copy: Record<string, Record<string, string>>;
  featureFlags: Record<string, {
    description: string;
    enabled: boolean;
    rollout?: Array<{
      percentage: number;
      targeting?: Record<string, any>;
    }>;
  }>;
  businessRules: {
    free_tier: {
      swipe_limit_per_day: number;
    };
    monetization: {
      membership_model: 'contribution' | 'subscription' | 'freemium';
      suggested_monthly_contribution: number;
      pay_to_boost: boolean;
      in_app_purchases_enabled: boolean;
      tiers: Array<{
        name: string;
        contribution: number;
        features: string[];
      }>;
    };
  };
  matching: {
    algorithm: string;
    max_distance_km: number;
    age_range: {
      min: number;
      max: number;
    };
    allow_cross_community_matching: boolean;
    allow_nonbinary_matching: boolean;
  };
  profile: {
    required_fields: string[];
    optional_fields: string[];
    photo_policy: {
      min_photos: number;
      max_photos: number;
      allow_memes: boolean;
      allow_group_photos: boolean;
    };
  };
  community: {
    name: string;
    invite_only: boolean;
    onboarding_flow: string;
    admin_moderation_enabled: boolean;
  };
}

// Default configuration following the YAML blueprint
export const defaultConfig: AppConfig = {
  version: '3.0.0',
  app: {
    name: 'Cinder',
    logo_url: '/assets/logo.svg',
  },
  theming: {
    mode: 'light',
    animations_enabled: true,
    corner_radius: 'lg',
  },
  copy: {
    en: {
      onboarding_title: 'Create Your Authentic Profile',
      match_screen_title: "It's a Match!",
      premium_cta: 'Become a Supporter',
      app_tagline: 'Where authentic connections begin',
      discover_title: 'Discover',
      messages_title: 'Messages',
      profile_title: 'Profile',
      get_verified: 'Get Verified',
      safety_first: 'Safety First',
    },
  },
  featureFlags: {
    messagingEnabled: {
      description: 'Enables the core chat and messaging functionality.',
      enabled: true,
    },
    voiceMessages: {
      description: 'Allows users to send and receive voice messages in chat.',
      enabled: false,
    },
    videoChat: {
      description: 'Enables in-app Face to Face video calls between matches.',
      enabled: true,
    },
    discoveryRadiusSlider: {
      description: 'Allows users to set a discovery radius with a slider.',
      enabled: true,
    },
    paidBoostEnabled: {
      description: 'Enables the premium Boost feature for increased visibility.',
      enabled: false,
    },
    profileVerificationRequired: {
      description: 'Makes photo verification mandatory for all users during onboarding.',
      enabled: true,
    },
  },
  businessRules: {
    free_tier: {
      swipe_limit_per_day: 100,
    },
    monetization: {
      membership_model: 'contribution',
      suggested_monthly_contribution: 5,
      pay_to_boost: false,
      in_app_purchases_enabled: false,
      tiers: [
        {
          name: 'Member',
          contribution: 5,
          features: ['full_access', 'profile_boosts_monthly_1'],
        },
        {
          name: 'Supporter',
          contribution: 10,
          features: ['all_member_features', 'invite_others', 'influence_roadmap'],
        },
      ],
    },
  },
  matching: {
    algorithm: 'proximity-weighted-compatibility',
    max_distance_km: 30,
    age_range: {
      min: 21,
      max: 50,
    },
    allow_cross_community_matching: false,
    allow_nonbinary_matching: true,
  },
  profile: {
    required_fields: ['name', 'age', 'pronouns', 'location', 'photos'],
    optional_fields: ['interests', 'profession', 'education', 'values'],
    photo_policy: {
      min_photos: 2,
      max_photos: 6,
      allow_memes: false,
      allow_group_photos: false,
    },
  },
  community: {
    name: 'Cinder Community',
    invite_only: false,
    onboarding_flow: 'safety-first',
    admin_moderation_enabled: true,
  },
};

// Configuration provider class
export class ConfigProvider {
  private static instance: ConfigProvider;
  private config: AppConfig = defaultConfig;

  private constructor() {}

  public static getInstance(): ConfigProvider {
    if (!ConfigProvider.instance) {
      ConfigProvider.instance = new ConfigProvider();
    }
    return ConfigProvider.instance;
  }

  public getConfig(): AppConfig {
    return this.config;
  }

  public updateConfig(newConfig: Partial<AppConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public isFeatureEnabled(featureName: string): boolean {
    const feature = this.config.featureFlags[featureName];
    return feature?.enabled ?? false;
  }

  public getCopy(key: string, language: string = 'en'): string {
    return this.config.copy[language]?.[key] ?? key;
  }

  public getBusinessRule(path: string): any {
    const keys = path.split('.');
    let value: any = this.config.businessRules;
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }
    
    return value;
  }
}

export const configProvider = ConfigProvider.getInstance();