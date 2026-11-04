import React, { useState, useRef } from 'react';
import {
  X,
  Sliders,
  CheckCircle2,
  Utensils,
  Layout,
  Users2,
  Wine,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Trash2,
  AlertCircle,
  Save,
  HelpCircle
} from 'lucide-react';
import { CUSTOMIZATION_OPTIONS } from '../data/cateringData';

export default function EventCustomizationModal({
  isOpen,
  onClose,
  initialCustomizations = {},
  onSaveCustomizations,
  showToast
}) {
  const fileInputRef = useRef(null);

  // Form state
  const [serviceStyle, setServiceStyle] = useState(initialCustomizations.serviceStyle || 'plated');
  const [tableSetup, setTableSetup] = useState(initialCustomizations.tableSetup || 'rustic_pnw');
  const [staffingTier, setStaffingTier] = useState(initialCustomizations.staffingTier || 'full_team');
  const [beveragePreference, setBeveragePreference] = useState(
    initialCustomizations.beveragePreference || 'bc_wine'
  );
  const [decorPreferences, setDecorPreferences] = useState(
    initialCustomizations.decorPreferences || ['wildflowers']
  );
  const [dietaryAllergyNotes, setDietaryAllergyNotes] = useState(
    initialCustomizations.dietaryAllergyNotes || ''
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    initialCustomizations.specialInstructions || ''
  );

  // Inspiration images (local storage preview)
  const [uploadedImages, setUploadedImages] = useState(
    initialCustomizations.uploadedImages || []
  );

  if (!isOpen) return null;

  const toggleDecor = (decorId) => {
    if (decorPreferences.includes(decorId)) {
      setDecorPreferences(decorPreferences.filter((id) => id !== decorId));
    } else {
      setDecorPreferences([...decorPreferences, decorId]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const maxFileSize = 4 * 1024 * 1024; // 4MB
    const validFiles = files.filter((file) => {
      if (file.size > maxFileSize) {
        if (showToast) showToast(`"${file.name}" exceeds the 4MB preview limit.`, 'info');
        return false;
      }
      return true;
    });

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImg = {
          id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          name: file.name,
          sizeKb: Math.round(file.size / 1024),
          previewUrl: event.target.result
        };
        setUploadedImages((prev) => [...prev.slice(-3), newImg]); // keep up to 4 images
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (imgId) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== imgId));
  };

  const handleSave = () => {
    const customizedData = {
      serviceStyle,
      tableSetup,
      staffingTier,
      beveragePreference,
      decorPreferences,
      dietaryAllergyNotes,
      specialInstructions,
      uploadedImages
    };

    if (onSaveCustomizations) {
      onSaveCustomizations(customizedData);
    }
    if (showToast) {
      showToast('Event customizations saved to your inquiry draft!', 'success');
    }
    onClose();
  };

  return (
    <div
      className="modal-overlay-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Event Customization and Planning Options"
    >
      <div
        className="modal-content-box customization-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-top-header">
          <div className="modal-title-lockup">
            <span className="modal-kicker">Bespoke Event Design</span>
            <h2 className="modal-headline">Event Customization</h2>
          </div>
          <button
            type="button"
            className="modal-close-round-btn"
            onClick={onClose}
            aria-label="Close event customization modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="modal-scroll-body customization-body">
          <div className="customization-intro-banner">
            <p>
              Tailor every element of your Pacific Northwest dining experience—from presentation and
              sommelier pairings to staffing and visual inspiration.
            </p>
          </div>

          {/* 1. Catering & Service Style */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <Utensils size={15} />
              <span>1. Service &amp; Catering Format</span>
            </div>
            <div className="custom-options-grid">
              {CUSTOMIZATION_OPTIONS.serviceStyles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`custom-select-card ${serviceStyle === item.id ? 'is-selected' : ''}`}
                  onClick={() => setServiceStyle(item.id)}
                >
                  <div className="card-top-indicator">
                    <span className="card-title-text">{item.label}</span>
                    {serviceStyle === item.id && (
                      <CheckCircle2 size={15} className="selected-indicator-icon" />
                    )}
                  </div>
                  <p className="card-desc-text">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Table Setup & Presentation */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <Layout size={15} />
              <span>2. Table Presentation &amp; Setup Style</span>
            </div>
            <div className="custom-options-grid">
              {CUSTOMIZATION_OPTIONS.tableSetups.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`custom-select-card ${tableSetup === item.id ? 'is-selected' : ''}`}
                  onClick={() => setTableSetup(item.id)}
                >
                  <div className="card-top-indicator">
                    <span className="card-title-text">{item.label}</span>
                    {tableSetup === item.id && (
                      <CheckCircle2 size={15} className="selected-indicator-icon" />
                    )}
                  </div>
                  <p className="card-desc-text">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 3. Serving Staff Requirements */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <Users2 size={15} />
              <span>3. Culinary Staff &amp; Service Team</span>
            </div>
            <div className="custom-options-grid">
              {CUSTOMIZATION_OPTIONS.staffingOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`custom-select-card ${staffingTier === item.id ? 'is-selected' : ''}`}
                  onClick={() => setStaffingTier(item.id)}
                >
                  <div className="card-top-indicator">
                    <span className="card-title-text">{item.label}</span>
                    {staffingTier === item.id && (
                      <CheckCircle2 size={15} className="selected-indicator-icon" />
                    )}
                  </div>
                  <p className="card-desc-text">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 4. Beverage & Bar Preferences */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <Wine size={15} />
              <span>4. Beverage &amp; Sommelier Pairings</span>
            </div>
            <div className="custom-options-grid">
              {CUSTOMIZATION_OPTIONS.beveragePreferences.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`custom-select-card ${
                    beveragePreference === item.id ? 'is-selected' : ''
                  }`}
                  onClick={() => setBeveragePreference(item.id)}
                >
                  <div className="card-top-indicator">
                    <span className="card-title-text">{item.label}</span>
                    {beveragePreference === item.id && (
                      <CheckCircle2 size={15} className="selected-indicator-icon" />
                    )}
                  </div>
                  <p className="card-desc-text">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 5. Decoration & Table Accents */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <Sparkles size={15} />
              <span>5. Decoration &amp; Atmosphere Accents</span>
            </div>
            <div className="decor-multi-pills">
              {CUSTOMIZATION_OPTIONS.decorPreferences.map((item) => {
                const isChecked = decorPreferences.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`decor-pill-btn ${isChecked ? 'is-checked' : ''}`}
                    onClick={() => toggleDecor(item.id)}
                  >
                    <span className="decor-pill-name">{item.label}</span>
                    {isChecked ? <CheckCircle2 size={13} /> : <span className="decor-add-plus">+</span>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 6. Inspiration Moodboard Upload */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <ImageIcon size={15} />
              <span>6. Moodboard &amp; Inspiration Photos</span>
            </div>
            <p className="custom-section-hint">
              Attach table layout sketches, floral concepts, or Pinterest reference photos (stored
              in your browser session).
            </p>

            <div className="upload-container-box">
              <input
                ref={fileInputRef}
                type="file"
                id="moodboard-upload-input"
                className="visually-hidden"
                accept="image/png, image/jpeg, image/webp"
                multiple
                onChange={handleFileChange}
              />
              <label htmlFor="moodboard-upload-input" className="file-dropzone-label">
                <Upload size={20} className="upload-icon" />
                <span className="upload-main-text">Click to browse or upload inspiration images</span>
                <span className="upload-sub-text">PNG, JPG, or WEBP up to 4MB (Max 4 photos)</span>
              </label>

              {/* Uploaded Thumbnails Preview */}
              {uploadedImages.length > 0 && (
                <div className="uploaded-thumbnails-grid">
                  {uploadedImages.map((img) => (
                    <div key={img.id} className="uploaded-thumb-card">
                      <img src={img.previewUrl} alt={img.name} className="thumb-preview-img" />
                      <div className="thumb-info-bar">
                        <span className="thumb-name" title={img.name}>
                          {img.name}
                        </span>
                        <span className="thumb-size">{img.sizeKb} KB</span>
                      </div>
                      <button
                        type="button"
                        className="thumb-remove-btn"
                        onClick={() => handleRemoveImage(img.id)}
                        title="Remove photo"
                        aria-label={`Remove photo ${img.name}`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 7. Dietary & Allergy Protocols */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <AlertCircle size={15} />
              <span>7. Specific Allergy Notes &amp; Cross-Contact Safeguards</span>
            </div>
            <div className="form-group-field">
              <textarea
                value={dietaryAllergyNotes}
                onChange={(e) => setDietaryAllergyNotes(e.target.value)}
                placeholder="List any severe anaphylactic allergies (e.g. peanuts, tree nuts, shellfish, celiac disease). Never assume safety—our kitchen prepares custom isolated boxes upon request."
                rows={3}
                className="custom-textarea-input"
              />
            </div>
          </section>

          {/* 8. Special Event Instructions */}
          <section className="custom-section-block">
            <div className="custom-section-title">
              <Sliders size={15} />
              <span>8. Venue Logistics &amp; Special Timings</span>
            </div>
            <div className="form-group-field">
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Mention any load-in constraints (e.g. dock access, ferry schedule, kitchen availability, private residence gate code)."
                rows={3}
                className="custom-textarea-input"
              />
            </div>
          </section>
        </div>

        {/* Modal Action Footer */}
        <div className="modal-bottom-footer-bar custom-footer-bar">
          <button type="button" className="footer-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="footer-save-btn" onClick={handleSave}>
            <Save size={15} />
            <span>Save to Inquiry Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
}

