import React from 'react';
import { formatPrice } from '../../lib/format';

interface PriceDisplayProps {
  price: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm font-medium',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold text-primary',
  };

  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      {formatPrice(price)}
    </span>
  );
};