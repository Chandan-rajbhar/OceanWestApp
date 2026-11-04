import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

export default function ImageWithFallback({
  src,
  alt = 'Ocean West Fine Catering',
  aspectRatio = '16/10', // '16/10' | '1/1' | 'auto'
  className = '',
  loading = 'lazy',
  badgeText = null,
  badgeType = 'plum', // 'plum' | 'gold' | 'blue' | 'navy' | 'green'
  showGradientOverlay = false
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClass =
    aspectRatio === '16/10'
      ? 'aspect-16-10'
      : aspectRatio === '1/1'
      ? 'aspect-1-1'
      : '';

  return (
    <div className={`img-wrapper-card ${aspectClass} ${className}`}>
      {/* Loading Skeleton */}
      {!loaded && !error && (
        <div className="img-skeleton-shimmer" aria-hidden="true" />
      )}

      {/* Fallback Display if Error */}
      {error ? (
        <div className="img-fallback-box" aria-label={alt}>
          <Utensils size={24} className="img-fallback-icon" />
          <span className="img-fallback-label">Ocean West Artisanal</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`img-cover-content ${loaded ? 'is-loaded' : 'is-loading'}`}
        />
      )}

      {/* Optional Gradient Overlay for text contrast */}
      {showGradientOverlay && !error && (
        <div className="img-bottom-gradient-overlay" aria-hidden="true" />
      )}

      {/* Top-Left Consistent Badge */}
      {badgeText && (
        <span className={`img-corner-badge badge-${badgeType}`}>
          {badgeText}
        </span>
      )}
    </div>
  );
}

