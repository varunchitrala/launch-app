import React, { useState } from 'react';
import { Fingerprint, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import './index.css';

// ============================================================================ //
// CONFIGURE YOUR PROJECT URL HERE
// ============================================================================ //
// When the scan succeeds, the app will automatically redirect to this URL.
// Change this to the actual URL of your project frontend dashboard.
const PROJECT_URL = "http://localhost:3000"; 
// ============================================================================ //

export default function App() {
  const [status, setStatus] = useState('idle'); // idle, scanning, success, redirecting

  const startAuthorization = () => {
    if (status !== 'idle') return;
    
    setStatus('scanning');

    // Simulate complete authorization sequence (3 seconds)
    setTimeout(() => {
      setStatus('success');
      
      // Multi-layered epic confetti explosion that lasts until redirect
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#00c6ff', '#00ff88', '#a855f7', '#ffffff'],
          zIndex: 9999
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#00c6ff', '#00ff88', '#a855f7', '#ffffff'],
          zIndex: 9999
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      // Start the confetti barrage
      frame();

      // Redirect after spectacular success
      setTimeout(() => {
        setStatus('redirecting');
        window.location.href = PROJECT_URL; // Opens the user's project!
      }, 2500);

    }, 3000); // 3 seconds scan time
  };

  return (
    <>
      <div className="bg-aurora"></div>

      <div className="portal-container">
        <div className="title-container">
          <h1 className="main-title">Vidya Sethu</h1>
          <p className="sub-title">Secure Inauguration Gateway</p>
        </div>

        <div 
          className={`scanner-box ${status === 'scanning' ? 'is-scanning' : ''} ${status === 'success' || status === 'redirecting' ? 'is-success' : ''}`}
          onClick={startAuthorization}
        >
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
          <div className="scan-line"></div>
          
          <div className="fingerprint-icon">
            {status === 'success' || status === 'redirecting' ? (
              <Check size={90} strokeWidth={3} color="#00ff88" />
            ) : (
              <Fingerprint size={100} strokeWidth={1.2} />
            )}
          </div>
        </div>

        <div 
          className="status-text"
          style={{
            color: status === 'idle' ? '#a1a1aa' : 
                   status === 'scanning' ? '#00c6ff' : 
                   '#00ff88'
          }}
        >
          {status === 'idle' && "Click to Authorize"}
          {status === 'scanning' && "Analyzing Biometrics..."}
          {status === 'success' && "Authorization Granted"}
          {status === 'redirecting' && "Opening Project..."}
        </div>
      </div>
    </>
  );
}
