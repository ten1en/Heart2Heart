import React from 'react';
import { readings } from './Chart'; // Grabs the data array from your chart file

export default function HormoneRatio() {
  // 1. Grab the latest week's data point from the array
  const latestData = readings[readings.length - 1];
  
  // 2. Perform the calculation (Oestrogen divided by Cortisol)
  const numericRatio = latestData.oestrogen / latestData.cortisol;
  const formattedRatio = numericRatio.toFixed(2);

  // 3. Conditional configuration based on your threshold rules
  let statusColor = '#10b981'; // Green default
  let alertBg = '#f0fdf4';      // Soft Green background
  let summaryText = '';

  if (numericRatio > 1) {
    statusColor = '#ef4444';    // Red
    alertBg = '#fef2f2';        // Soft Red
    summaryText = "Your recent readings show that your cortisol has significantly overtaken your oestrogen levels. This kind of hormonal imbalance has been linked to increased cardiovascular risk in perimenopausal women. We recommend speaking to your GP soon — you can download a summary of your readings below to bring to your appointment.";
  } else if (numericRatio >= 0.5) {
    statusColor = '#f59e0b';    // Amber
    alertBg = '#fffbeb';        // Soft Amber
    summaryText = "Your cortisol levels are rising relative to your oestrogen. This is a pattern worth watching closely. We recommend logging readings every few days so Heart Buddy can track whether this trend continues.";
  } else {
    statusColor = '#10b981';    // Green
    alertBg = '#f0fdf4';        // Soft Green
    summaryText = "Your hormone levels are currently well balanced. Keep logging your readings regularly — consistent tracking is what allows Heart Buddy to build a picture of what's normal for you personally.";
  }

  // Styling layout configurations
  const cardStyle = {
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    width: '100%',
    maxWidth: '600px',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
    border: '1px solid #e1e4e8',
    boxSizing: 'border-box',
    marginTop: '20px'
  };

  const ratioNumberStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: statusColor,
    margin: '10px 0',
    transition: 'color 0.3s ease'
  };

  const progressTrackStyle = {
    background: '#e9ecef',
    borderRadius: '8px',
    height: '12px',
    width: '100%',
    overflow: 'hidden',
    marginTop: '15px',
    marginBottom: '24px'
  };

  // Scales the visual bar smoothly relative to the threshold rules
  const fillPercentage = Math.min((numericRatio * 50), 100); 
  const progressFillStyle = {
    background: statusColor,
    height: '100%',
    width: `${fillPercentage}%`,
    transition: 'width 0.5s ease-in-out, background-color 0.3s ease'
  };

  const summaryBlockStyle = {
    padding: '16px',
    borderRadius: '8px',
    background: alertBg,
    borderLeft: `4px solid ${statusColor}`,
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#1f2937',
    transition: 'all 0.3s ease'
  };

  const downloadButtonStyle = {
    marginTop: '12px',
    padding: '8px 16px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px'
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0', color: '#1a1a1a', fontSize: '20px' }}>
        Current Hormone Balance Ratio
      </h3>
      <p style={{ margin: '4px 0 0 0', color: '#65676b', fontSize: '14px' }}>
        Based on {latestData.week} metrics (Oestrogen : Cortisol)
      </p>

      <div style={ratioNumberStyle}>{formattedRatio}</div>

      <p style={{ margin: '0', fontSize: '14px', color: '#4e5053' }}>
        For every 1 unit of Cortisol, there are <strong>{formattedRatio}</strong> units of Oestrogen.
      </p>

      {/* Progress Metric Bar */}
      <div style={progressTrackStyle}>
        <div style={progressFillStyle}></div>
      </div>

      {/* Summary Box Interpretation */}
      <div style={summaryBlockStyle}>
        {summaryText}
        
        {/* Render PDF download action ONLY on Red status */}
        {numericRatio > 1 && (
          <div>
            <button 
              style={downloadButtonStyle} 
              onClick={() => alert('Preparing your Heart Buddy medical summary...')}
            >
              Download PDF Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}