import { ButtonHTMLAttributes, ReactNode } from "react";

// ✅ ButtonHTMLAttributes<HTMLButtonElement>를 상속하면 onClick, type, disabled, className 등 기본 버튼 속성을 모두 사용가능
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  kakao?: boolean;
  google?: boolean;
  // success?: boolean;
  // warning?: boolean;
  // danger?: boolean;
  // outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
}

// Chart.js
interface ChartSide {
  type: string;
  score: number;
}

export interface ChartProps {
  label: string;
  left: ChartSide;
  right: ChartSide;
  color?: string;
}

export interface ChartCanvasProps {
  chartData: ChartProps[];
}

export interface ChartData {
  resultType: string;
  result: ChartProps[];
  history?: boolean;
  className?: string;
}

type Choices = {
  choiceId: number;
  content: string;
};

export interface QuestionProps {
  questionId: number;
  displayOrder: number;
  content: string;
  choices: Choices[];
  onSelect(questionId: number, choiceId: number): void;
}

export interface ResultData {
  type: string;
  date: string;
  image: string;
}

export interface SurveyPaper {
  content: QuestionProps[];
  totalPages: number;
}
