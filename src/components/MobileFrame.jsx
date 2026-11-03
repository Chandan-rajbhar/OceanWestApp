import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function MobileFrame({
  children,
  bottomBar,
  scrollContainerRef
}) {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="desktop-viewport-wrapper">
      {/* The Phone Device Mockup Container */}
      <div className="device-outer-frame">
        {/* Device Bezel & Side Buttons Detail */}
        <div className="device-hardware-bezel">
          {/* Top Speaker / Dynamic Island */}
          <div className="device-dynamic-island" aria-hidden="true">
            <div className="device-camera-lens"></div>
            <div className="device-speaker-slit"></div>
          </div>

          {/* Device Mobile Status Bar */}
          <div className="device-status-bar" aria-hidden="true">
            <span className="status-time">{currentTime}</span>
            <div className="status-icons">
              <Signal size={12} strokeWidth={2.4} />
              <Wifi size={13} strokeWidth={2.4} />
              <Battery size={14} strokeWidth={2.4} />
            </div>
          </div>

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
