export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  tags: string[];
  preview: string;
  thumbnail: string;
  isPremium: boolean;
  popularity: number;
  dimensions: {
    width: number;
    height: number;
  };
  elements: DesignElement[];
}

export type TemplateCategory = 
  | 'business'
  | 'event'
  | 'social-media'
  | 'education'
  | 'health'
  | 'real-estate'
  | 'restaurant'
  | 'fitness'
  | 'beauty'
  | 'technology';

export interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'icon';
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  opacity: number;
  zIndex: number;
  locked: boolean;
  visible: boolean;
  properties: TextProperties | ImageProperties | ShapeProperties | IconProperties;
}

export interface TextProperties {
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing?: number;
}

export interface ImageProperties {
  src: string;
  alt?: string;
  fit: 'cover' | 'contain' | 'fill';
  filters?: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
  };
}

export interface ShapeProperties {
  shape: 'rectangle' | 'circle' | 'triangle' | 'polygon';
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  borderRadius?: number;
}

export interface IconProperties {
  name: string;
  color: string;
  strokeWidth?: number;
}

export interface Design {
  id: string;
  name: string;
  userId: string;
  templateId?: string;
  thumbnail: string;
  dimensions: {
    width: number;
    height: number;
  };
  elements: DesignElement[];
  background: {
    type: 'color' | 'gradient' | 'image';
    value: string;
  };
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  version: number;
}

export interface AIGenerationRequest {
  type: 'text' | 'design' | 'color-palette';
  prompt: string;
  businessType: string;
  tone: 'professional' | 'casual' | 'creative' | 'urgent' | 'friendly';
  targetAudience: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  isGenerated: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  colors: string[];
  fonts: string[];
  assets: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodEnd: string;
  features: {
    templatesAccess: boolean;
    aiGeneration: boolean;
    exportFormats: string[];
    storageLimit: number;
    brandKits: number;
  };
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'mpesa' | 'card' | 'bank';
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  createdAt: string;
}