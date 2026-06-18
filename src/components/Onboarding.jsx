import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';

export default function Onboarding({ onComplete }) {
  const { savePreferences, getRecommendedPartners, setPartner } = useStudy();
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [studyStyle, setStudyStyle] = useState('Visual');

  const subjectOptions = ['React', 'JavaScript', 'Data Structures', 'CSS', 'Mathematics', 'Artifical Intelligence'];

  const toggleSubject = (sub) => {
    setSelectedSubjects(prev => 
      prev.includes(sub) ? prev.filter(item => item !== sub) : [...prev, sub]
    );
  };

  const handleNextStep = () => {
    if (step === 1 && selectedSubjects.length === 0) return alert('Select at least one subject!');
    if (step === 1) {
      savePreferences({ subjects: selectedSubjects, studyStyle });
      setStep(2);
    }
  };

  const selectPartner = (peer) => {
    setPartner(peer);
    onComplete();
  };

  return (
    <div className="card-container max-w-2xl animate-fade-in">
      {step === 1 ? (
        <div>
          <h2 className="section-title flex-center gap-2" style={{ color: 'var(--primary)' }}>
            <svg className="icon text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4M4 19h4m12-7v.01M12 12h.01M16 16h.01M10 10h.01M14 14h.01M17 7l-1.414 1.414M16 11.586L17.414 13m-5.828-5.828L10.172 8.586m5.656 5.656l-1.414 1.414M11.586 16l1.414 1.414m-5.656-5.656l1.414-1.414" /></svg>
            Tell Us Your Goals
          </h2>
          <p className="text-muted">Select topics you are working on to align with global peers.</p>
          
          <label className="input-label">Core Subjects of Focus</label>
          <div className="grid-2 gap-3 mb-4">
            {subjectOptions.map(sub => {
              const isSelected = selectedSubjects.includes(sub);
              return (
                <button
                  key={sub}
                  onClick={() => toggleSubject(sub)}
                  className={`onboarding-chip ${isSelected ? 'active' : ''}`}
                >
                  <span>{sub}</span>
                  {isSelected && (
                    <svg className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                </button>
              );
            })}
          </div>

          <label className="input-label">Cognitive Learning Archetype</label>
          <select 
            value={studyStyle} 
            onChange={(e) => setStudyStyle(e.target.value)}
            className="form-input mb-6"
          >
            <option value="Visual">Visual / Diagrams</option>
            <option value="Hands-on">Hands-on Sandbox Projects</option>
            <option value="Theoretical">Theoretical Paper Review</option>
          </select>

          <button onClick={handleNextStep} className="btn-primary w-full flex-center gap-2">
            Compute Ideal Matches 
            <svg className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      ) : (
        <div>
          <h2 className="section-title" style={{ color: 'var(--primary)' }}>Recommended Alliances</h2>
          <p className="text-muted">These peers share your subject mappings and learning style metrics.</p>
          
          <div className="flex-col gap-4">
            {getRecommendedPartners().map(peer => (
              <div key={peer.id} className="partner-row">
                <div>
                  <h4 className="partner-name">{peer.name}</h4>
                  <p className="partner-meta">Archetype: <span style={{ color: 'var(--primary-light)' }}>{peer.style}</span></p>
                  <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
                    {peer.subjects.map(s => (
                      <span key={s} className="badge">{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="match-percent">{peer.matchScore}% Affinity Match</div>
                  <button onClick={() => selectPartner(peer)} className="btn-secondary btn-sm">
                    Form Bond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
;
}