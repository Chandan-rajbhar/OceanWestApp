import React, { useState } from 'react';
import {
  Image,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Utensils,
  Camera
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/cateringData';

export default function PhotoGalleryModal({
  isOpen,
  onClose,
  onSelectDishToMenu
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  if (!isOpen) return null;

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === activeCategory);

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Culinary Photo Gallery">
      <div className="modal-content-box gallery-modal-card" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Gallery"
        >
          <X size={18} />
        </button>

        <div className="modal-header-centered">
          <div className="modal-icon-badge">
            <Camera size={22} />
          </div>
          <h3 className="modal-heading">Culinary &amp; Event Gallery</h3>
          <p className="modal-subtext">
            Bespoke Pacific Northwest dish photography, wedding banquets, mobile film galleys, and artisanal platters.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="gallery-filter-tabs-wrapper">
          <div className="gallery-filter-tabs">
            {[
              { id: 'all', label: 'All Images' },
              { id: 'dishes', label: 'Signature Dishes' },
              { id: 'weddings', label: 'Weddings' },
              { id: 'film', label: 'Film Craft Services' },
              { id: 'corporate', label: 'Corporate Galas' },
              { id: 'platters', label: 'Platters & Grazing' }
            ].map(tab => (
              <button
                type="button"
                key={tab.id}
                className={`filter-tab-pill ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid-stack">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-item-card"
              onClick={() => setLightboxPhoto(photo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setLightboxPhoto(photo);
                }
              }}
              aria-label={`View enlarged photo of ${photo.title}`}
            >
              <div className="gallery-item-img-box">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="gallery-thumb-img"
                />
                <div className="gallery-hover-overlay">
                  <Maximize2 size={20} />
                </div>
                <span className="gallery-type-badge">{photo.courseType}</span>
              </div>
              <div className="gallery-item-caption">
                <h4 className="gallery-photo-title">{photo.title}</h4>
                <p className="gallery-photo-sub">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Overlay */}
        {lightboxPhoto && (
          <div
            className="lightbox-overlay"
            onClick={() => setLightboxPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged Image"
          >
            <div className="lightbox-content-box" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxPhoto(null)}
                aria-label="Close enlarged preview"
              >
                <X size={20} />
              </button>

              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={handlePrevPhoto}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={handleNextPhoto}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="lightbox-image-wrap">
                <img
                  src={lightboxPhoto.image}
                  alt={lightboxPhoto.alt}
                  className="lightbox-main-img"
                />
              </div>

              <div className="lightbox-meta">
                <span className="lightbox-badge">{lightboxPhoto.courseType}</span>
                <h3 className="lightbox-title">{lightboxPhoto.title}</h3>
                <p className="lightbox-desc">{lightboxPhoto.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

