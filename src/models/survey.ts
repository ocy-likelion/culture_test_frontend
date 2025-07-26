import { ReactNode } from "react";

export interface SurveyLayoutProps {
  children: ReactNode;
  leftSlot?: ReactNode;
  middleSlot?: ReactNode;
  rightSlot?: ReactNode;
  primaryBtn?: ReactNode;
  secondaryBtn?: ReactNode;
  lastBtn?: ReactNode;
  containerCN?: string;
  mainCN?: string;
  footerCN?: string;
}

export interface HeaderProps {
  leftSlot?: ReactNode;
  middleSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export interface FooterProps {
  primaryBtn?: ReactNode;
  secondaryBtn?: ReactNode;
  footerCN?: string;
}

export type FormData = {
  "terms-required": boolean;
  "personal-required": boolean;
  "survey-used": boolean;
};
