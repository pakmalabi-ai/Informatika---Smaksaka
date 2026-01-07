import { ReactNode } from 'react';

export type MainPageRoute = 1 | 2 | 3 | 4 | 5 | 6;

export interface NavItem {
  id: MainPageRoute;
  label: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

export interface HardwareItem {
  id: number;
  name: string;
  icon: ReactNode;
  desc: string; // Keep for backward compatibility or summary
  category: 'device' | 'cable';
  details?: {
    func: string;
    example: string;
    diff?: string; // Optional: for comparison (e.g. Switch vs Hub)
  };
}

export type NetworkSubPage = 'intro' | 'hardware' | 'topology' | 'config' | 'lkpd' | 'apps' | 'sim' | 'quiz';