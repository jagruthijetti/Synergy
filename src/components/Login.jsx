import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';

export default function Login() {
  const { login } = useStudy();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter your username');
    login(name.trim());
  };

  return (
    <div className="card-container max-w-2xl animate-fade-in" style={{ marginTop: '4rem' }}>
      <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0', color: 'var(--primary-light)' }}>Synapse Network Protocol</h2>
      <p className="text-muted mb-6">Initialize tracking matrices, match with learning nodes, and sync telemetry.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label className="input-label">Node Access Identity Signature</label>
          <input 
            type="text" 
            placeholder="Enter handle or username..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn-primary w-full">Establish Terminal Connection</button>
      </form>
    </div>
  );
}