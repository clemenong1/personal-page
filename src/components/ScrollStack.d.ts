import { ReactNode } from 'react';

export interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

declare const ScrollStack: React.FC<ScrollStackProps>;
declare const ScrollStackItem: React.FC<ScrollStackItemProps>;

export default ScrollStack;
