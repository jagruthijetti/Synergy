import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';

export default function MemoryCards() {
  const { cards, addCard, setCards } = useStudy();
  const [keyword, setKeyword] = useState('');
  const [info, setInfo] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim() || !info.trim()) return alert('Ensure core data nodes are mapped.');
    addCard(keyword.trim(), info.trim());
    setKeyword('');
    setInfo('');
    setShowForm(false);
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl animate-fade-in" style={{ padding: '0 1rem' }}>
      <h2 className="section-title text-primary flex-center gap-2">
        <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        Personalized Memory Matrix
      </h2>
      <p className="text-muted mb-6">Construct data cards immediately following lecture sequences for deep reinforcement.</p>

      {/* Add Card Button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="btn-primary" onClick={() => setShowForm(prev => !prev)}>
          {showForm ? '✕ Cancel' : '+ Add Card'}
        </button>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="mc-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="mc-add-form" onClick={e => e.stopPropagation()}>
            <h3 className="action-panel-title" style={{ margin: '0 0 1rem 0' }}>New Flashcard</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label className="input-label">Keyword (Front)</label>
                <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g., Virtual DOM" className="form-input" />
              </div>
              <div>
                <label className="input-label">Description (Back)</label>
                <textarea value={info} onChange={e => setInfo(e.target.value)} placeholder="e.g., Lightweight abstraction enabling decoupled render pipelines." className="form-input" style={{ height: '90px', resize: 'none' }} />
              </div>
              <button className="btn-primary" onClick={handleSubmit}>Save Card</button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {cards.length === 0 ? (
        <div className="empty-state">
          <svg className="icon-lg text-muted mb-2" style={{ margin: '0 auto' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-muted">No cards yet. Click "+ Add Card" to get started.</p>
        </div>
      ) : (
        <div className="mc-cards-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`mc-card ${flippedCards[card.id] ? 'mc-card--flipped' : ''}`}
              onClick={() => toggleFlip(card.id)}
            >
              <div className="mc-card-inner">
                {/* Front */}
                <div className="mc-card-face mc-card-front">
                  <span className="mc-card-keyword">{card.keyword}</span>
                  <span className="mc-card-hint">click to reveal</span>
                  <button
                    className="mc-delete-btn"
                    onClick={e => { e.stopPropagation(); deleteCard(card.id); }}
                    title="Delete card"
                  >✕</button>
                </div>
                {/* Back */}
                <div className="mc-card-face mc-card-back">
                  <span className="mc-card-keyword" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>{card.keyword}</span>
                  <p className="mc-card-description">{card.info}</p>
                  <button
                    className="mc-delete-btn"
                    onClick={e => { e.stopPropagation(); deleteCard(card.id); }}
                    title="Delete card"
                  >✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}