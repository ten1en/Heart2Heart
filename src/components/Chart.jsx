import React from 'react';

export const readings = [
  { week: "Wk 1", oestrogen: 320, cortisol: 110 },
  { week: "Wk 2", oestrogen: 285, cortisol: 140 },
  { week: "Wk 3", oestrogen: 300, cortisol: 155 },
  { week: "Wk 4", oestrogen: 240, cortisol: 190 },
  { week: "Wk 5", oestrogen: 210, cortisol: 220 },
  { week: "Wk 6", oestrogen: 175, cortisol: 265 },
];

export default function LineChart() {
  // SVG Grid dimensions
  const width = 500;
  const height = 250;
  const padding = 40;
  const maxY = 350; // Max ceiling for hormone values to scale smoothly

  // Functions to map data points to absolute SVG coordinates
  const getX = (index) => padding + (index * (width - padding * 2)) / (readings.length - 1);
  const getY = (value) => height - padding - (value / maxY) * (height - padding * 2);

  // Convert array data into coordinate point strings for the SVG lines
  const oestrogenPoints = readings.map((d, i) => `${getX(i)},${getY(d.oestrogen)}`).join(' ');
  const cortisolPoints = readings.map((d, i) => `${getX(i)},${getY(d.cortisol)}`).join(' ');

  const cardStyle = {
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    width: '100%',
    maxWidth: '600px',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
    border: '1px solid #e1e4e8',
    boxSizing: 'border-box'
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 6px 0', color: '#1a1a1a', fontSize: '20px' }}>Hormone Trends</h3>
      <p style={{ margin: '0 0 20px 0', color: '#65676b', fontSize: '14px' }}>6-Week Health Insights</p>
      
      {/* Legend Indicator */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', background: '#ec4899', borderRadius: '50%' }}></div>
          <span style={{ color: '#ec4899' }}>Oestrogen (pg/mL)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%' }}></div>
          <span style={{ color: '#3b82f6' }}>Cortisol (ng/mL)</span>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {/* Y-Axis Grid Background Lines */}
        {[0, 100, 200, 300].map((val) => (
          <g key={val}>
            <line 
              x1={padding} y1={getY(val)} x2={width - padding} y2={getY(val)} 
              stroke="#f0f2f5" strokeWidth="1" 
            />
            <text x={padding - 10} y={getY(val) + 4} textAnchor="end" fontSize="11" fill="#8a8d91">
              {val}
            </text>
          </g>
        ))}

        {/* X-Axis Labels */}
        {readings.map((d, i) => (
          <text key={i} x={getX(i)} y={height - padding + 20} textAnchor="middle" fontSize="11" fill="#8a8d91">
            {d.week}
          </text>
        ))}

        {/* Oestrogen Pink Trendline */}
        <polyline fill="none" stroke="#ec4899" strokeWidth="3" points={oestrogenPoints} strokeLinecap="round" strokeLinejoin="round" />
        {readings.map((d, i) => (
          <circle key={`o-${i}`} cx={getX(i)} cy={getY(d.oestrogen)} r="4" fill="#ffffff" stroke="#ec4899" strokeWidth="2" />
        ))}

        {/* Cortisol Blue Trendline */}
        <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points={cortisolPoints} strokeLinecap="round" strokeLinejoin="round" />
        {readings.map((d, i) => (
          <circle key={`c-${i}`} cx={getX(i)} cy={getY(d.cortisol)} r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}