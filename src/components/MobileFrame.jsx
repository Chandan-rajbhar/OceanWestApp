import React from 'react';

export default function MobileFrame({
  children,
  bottomBar,
  scrollContainerRef
}) {
  return (
    <div className="desktop-viewport-wrapper">
      {/* The Phone Device Mockup Container */}
      <div className="device-outer-frame">
        {/* Device Bezel Detail */}
        <div className="device-hardware-bezel">
<<<<<<< Updated upstream
          {/* Top Speaker / Dynamic Island */}
          <div className="device-dynamic-island" aria-hidden="true">
            <div className="device-camera-lens"></div>
            <div className="device-speaker-slit"></div>
          </div>

          {/* Device Mobile Status Bar safe area */}
          <div className="device-status-bar" aria-hidden="true" />

=======
>>>>>>> Stashed changes
          {/* Scrollable Screen Content */}
          <div className="device-screen-scrollable" ref={scrollContainerRef}>
            {children}
          </div>

          {/* Fixed / Sticky Bottom Navigation Bar (Always Pinned at Bottom of Phone Screen) */}
          {bottomBar}

          {/* Bottom Home Indicator Bar */}
          <div className="device-home-bar" aria-hidden="true">
            <div className="home-indicator-pill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
