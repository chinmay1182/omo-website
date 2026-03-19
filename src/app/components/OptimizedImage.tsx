"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import styles from './OptimizedImage.module.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  objectFit = 'cover',
  placeholder = 'blur',
  blurDataURL,
  sizes,
  quality = 85,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={`${styles.errorPlaceholder} ${className}`}>
        <ImageOff size={40} />
        <span>Image failed to load</span>
      </div>
    );
  }

  const imageProps = {
    src,
    quality,
    priority,
    loading: priority ? 'eager' as const : loading,
    placeholder: placeholder as any,
    blurDataURL: blurDataURL || defaultBlurDataURL,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} ${isLoading ? styles.loading : ''}`,
    style: { objectFit },
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  };

  if (fill) {
    return <Image alt={alt} {...imageProps} fill />;
  }

  // Ensure width and height are defined for non-fill images
  if (!width || !height) {
    console.error('OptimizedImage: width and height are required when not using fill prop');
    return (
      <div className={`${styles.errorPlaceholder} ${className}`}>
        <ImageOff size={40} />
        <span>Invalid image dimensions</span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      {...imageProps}
      width={width}
      height={height}
    />
  );
};

export default OptimizedImage;
