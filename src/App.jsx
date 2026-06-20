import React from 'react';
import Profile from './components/Profile';
import LineChart from './components/Chart';
import HormoneRatio from './components/RatioIndicator'; // Use this one!
import GPSummaryView from './components/GPSummaryView';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Profile />
      <LineChart />
      <HormoneRatio />
      <GPSummaryView />
    </div>
  );
}

export default App;