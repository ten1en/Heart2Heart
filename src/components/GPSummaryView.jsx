import React from 'react';
import { readings } from './Chart'; // Reusing your existing chart data

export default function GPSummaryView({ patientName = "Sarah Johnson", age = 49, ethnicity = "Black British" }) {
  // 1. Calculate latest metrics
  const latestData = readings[readings.length - 1];
  const numericRatio = latestData.oestrogen / latestData.cortisol;
  const formattedRatio = numericRatio.toFixed(2);

  // 2. Scan data array to find exactly when thresholds were crossed
  let amberWeek = "Not crossed";
  let redWeek = "Not crossed";

  readings.forEach((item) => {
    const ratio = item.oestrogen / item.cortisol;
    if (ratio >= 0.5 && ratio <= 1.0 && amberWeek === "Not crossed") {
      amberWeek = item.week;
    }
    if (ratio > 1.0 && redWeek === "Not crossed") {
      redWeek = item.week;
    }
  });

  // 3. Simple layout styling for a full-screen view
  const screenContainerStyle = {
    fontFamily: '"Segoe UI", Roboto, Helvetica, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box'
  };

  const mainCardStyle = {
    backgroundColor: '#ffffff',
    maxWidth: '650px',
    width: '100%',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    padding: '40px',
    boxSizing: 'border-box',
    textAlign: 'center'
  };

  const headerStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 12px 0'
  };

  const subtextStyle = {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#475569',
    margin: '0 0 32px 0'
  };

  const summaryBoxStyle = {
    backgroundColor: '#f1f5f9',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'left',
    margin: '0 0 32px 0',
    border: '1px solid #e2e8f0'
  };

  const dataRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px'
  };

  const downloadBtnStyle = {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)',
    transition: 'background-color 0.2s'
  };

  const footerStyle = {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#94a3b8',
    marginTop: '32px',
    maxWidth: '500px'
  };

  return (
    <div style={screenContainerStyle}>
      <div style={mainCardStyle}>
        
        {/* Header Block */}
        <h1 style={headerStyle}>It's time to speak to your GP</h1>
        <p style={subtextStyle}>
          Over the past 6 weeks, Heart Buddy has detected a significant shift in your cortisol to oestrogen ratio. 
          This pattern is associated with increased cardiovascular risk in perimenopausal women. 
          This is not a diagnosis — but it is a pattern your GP should know about.
        </p>

        {/* Structured Clinical Summary Box */}
        <div style={summaryBoxStyle}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1e293b', fontWeight: '600' }}>
            Clinical Export Summary
          </h3>
          
          <div style={dataRowStyle}>
            <span style={{ color: '#64748b' }}>Patient Metrics</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>
              {patientName} (Age: {age}) • {ethnicity}
            </span>
          </div>

          <div style={dataRowStyle}>
            <span style={{ color: '#64748b' }}>Current Ratio</span>
            <span style={{ fontWeight: '700', color: '#ef4444' }}>{formattedRatio}</span>
          </div>

          <div style={dataRowStyle}>
            <span style={{ color: '#64748b' }}>Trend Direction</span>
            <span style={{ fontWeight: '600', color: '#ef4444' }}>
              Rising ↑ (Cortisol dominant)
            </span>
          </div>

          <div style={dataRowStyle}>
            <span style={{ color: '#64748b' }}>Amber Threshold Crossed</span>
            <span style={{ fontWeight: '600', color: '#334155' }}>{amberWeek}</span>
          </div>

          <div style={{ ...dataRowStyle, borderBottom: 'none' }}>
            <span style={{ color: '#64748b' }}>Red Threshold Crossed</span>
            <span style={{ fontWeight: '600', color: '#334155' }}>{redWeek}</span>
          </div>
        </div>

        {/* Download Action */}
        <button 
          style={downloadBtnStyle}
          onClick={() => window.print()} // Quick trick to let them print/save as PDF natively!
        >
          Download GP Summary
        </button>

        {/* Disclaimer Footer */}
        <p style={footerStyle}>
          Heart Buddy does not replace medical advice. Always consult a qualified healthcare professional.
        </p>

      </div>
    </div>
  );
}