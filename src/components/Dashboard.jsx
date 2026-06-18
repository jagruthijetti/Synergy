import React from 'react';
import { useStudy } from '../context/StudyContext';

export default function Dashboard({ setView }) {
  const { user, cards, partner, rewards, streak } = useStudy();

  return (
    <div className="max-w-6xl animate-fade-in" style={{ padding: '0 1rem' }}>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome {user?.username}</h1>
          <p className="text-muted">Track your's and your partner's progress </p>
        </div>
        {partner && (
          <div className="partner-alert-box">
            <svg className="icon text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <div>
              <p className="alert-box-label">Linked Partner</p>
              <p className="alert-box-name">{partner.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* Analytics Telemetry Matrix */}
      <div className="grid-3 gap-6 mb-8">
        <div className="metric-card card-orange">
          <svg className="icon-lg text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <h3 className="metric-value">{streak} Days</h3>
          <p className="metric-label">Active Commits Streak</p>
        </div>
        <div className="metric-card card-yellow">
          <svg className="icon-lg text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h3 className="metric-value">{rewards}</h3>
          <p className="metric-label">Platform Reward Tokens</p>
        </div>
        <div className="metric-card card-primary">
          <svg className="icon-lg text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <h3 className="metric-value">{cards.length} Cards</h3>
          <p className="metric-label">Personalized Matrix Size</p>
        </div>
      </div>

      {/* Grid Control Actions */}
      <div className="grid-2 gap-6">
        <div className="action-panel border-primary">
          <h3 className="action-panel-title">
            <svg className="icon text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Personalized Memory Cards
          </h3>
          <p className="text-muted text-sm">Capture keywords and background concepts directly following your focus reading sessions.</p>
          <button onClick={() => setView('cards')} className="btn-secondary w-full">
            Open Deck 
          </button>
        </div>

        <div className="action-panel border-success">
          <h3 className="action-panel-title">
            Active Recall Quiz
          </h3>
          <p className="text-muted text-sm">Shuffle personalized entries and invoke memory matching with automated evaluation matrices.</p>
          <button 
            disabled={cards.length === 0}
            onClick={() => setView('quiz')} 
            className="btn-secondary w-full"
          >
            {cards.length === 0 ? 'Add Cards First to Quiz' : 'Initialize Recall Exam'}
          </button>
        </div>

        <div className="action-panel border-cyan">
          <h3 className="action-panel-title">
            <svg className="icon text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-5.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
            Peer Arena Contests
          </h3>
          <p className="text-muted text-sm">Form a temporary operational pairing to contest scores against real-time simulated rival alliances.</p>
          <button 
            disabled={!partner}
            onClick={() => setView('contest')} 
            className="btn-secondary w-full"
          >
            {partner ? 'Enter Contest Arena' : 'Link Partner to Compete'}
          </button>
        </div>

        <div className="action-panel border-purple">
          <h3 className="action-panel-title">
            <svg className="icon text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Platform Analytics
          </h3>
          <p className="text-muted text-sm">Inspect participation discrepancies and telemetry between individual output and partner logs.</p>
          <button onClick={() => setView('analytics')} className="btn-secondary w-full">
            Review Participation Analysis
          </button>
        </div>

        <div className="action-panel border-yellow">
          <h3 className="action-panel-title">
            <svg className="icon text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Concept Flash Cards
          </h3>
          <p className="text-muted text-sm">Review curated key points for BST, AVL, Segment Tree, Fenwick Tree, Prim's, and Kruskal's — flip cards to test your recall.</p>
          <button onClick={() => setView('flashcards')} className="btn-secondary w-full">
            Open Flash Cards
          </button>
        </div>

        <div className="action-panel border-cyan" >
          <h3 className="action-panel-title">
            <svg className="icon text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Recommended Study Materials
          </h3>
          <p className="text-muted text-sm">Curated books, courses, and references for Data Structures & Algorithms and React — ranked by depth and utility.</p>
          <button onClick={() => setView('studymaterials')} className="btn-secondary w-full">
            Browse Resources
          </button>
        </div>
      </div>
    </div>
  );
}