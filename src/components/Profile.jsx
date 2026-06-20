import React, { useState } from 'react';

function Profile() {
  // 1. Initialize state variables with empty or default values
  const [name, setName] = useState("Sarah Johnson");
  const [age, setAge] = useState(49);
  const [ethnicity, setEthnicity] = useState("Black British");
  const [stage, setStage] = useState("Perimenopausal");

  // Inline styles for layout
  const containerStyle = {
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  };

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '14px'
  };

  const cardStyle = {
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
    border: '1px solid #e1e4e8'
  };

  const infoGroupStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f2f5'
  };

  return (
    <div style={containerStyle}>
      {/* 2. The Input Form */}
      <div style={formStyle}>
        <h3>Edit Profile Details</h3>
        <label>Name:</label>
        <input 
          style={inputStyle} 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <label>Age:</label>
        <input 
          style={inputStyle} 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />

        <label>Ethnicity:</label>
        <input 
          style={inputStyle} 
          type="text" 
          value={ethnicity} 
          onChange={(e) => setEthnicity(e.target.value)} 
        />

        <label>Stage:</label>
        <input 
          style={inputStyle} 
          type="text" 
          value={stage} 
          onChange={(e) => setStage(e.target.value)} 
        />
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #eee' }} />

      {/* 3. The Live Preview Card */}
      <div style={cardStyle}>
        <h2 style={{ margin: '0 0 16px 0', color: '#1a1a1a', fontSize: '24px' }}>
          {name || "Anonymous"}
        </h2>
        
        <div style={infoGroupStyle}>
          <span style={{ color: '#65676b', fontWeight: '500' }}>Age</span>
          <span style={{ color: '#050505' }}>{age || "N/A"}</span>
        </div>
        
        <div style={infoGroupStyle}>
          <span style={{ color: '#65676b', fontWeight: '500' }}>Ethnicity</span>
          <span style={{ color: '#050505' }}>{ethnicity || "N/A"}</span>
        </div>
        
        <div style={{ ...infoGroupStyle, borderBottom: 'none' }}>
          <span style={{ color: '#65676b', fontWeight: '500' }}>Stage</span>
          <span style={{ color: '#050505' }}>{stage || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile ;