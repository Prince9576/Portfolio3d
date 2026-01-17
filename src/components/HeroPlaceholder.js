import React from 'react';

export default function HeroPlaceholder() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1a0933 100%)',
      color: '#fff'
    }}>
      <div style={{textAlign: 'center'}}>
        <h1 style={{margin: 0, fontSize: 'clamp(20px, 4vw, 36px)'}}>Prince Kumar</h1>
        <p style={{opacity: 0.85, marginTop: 8}}>Frontend Developer — Loading interactive experience…</p>
      </div>
    </div>
  );
}
