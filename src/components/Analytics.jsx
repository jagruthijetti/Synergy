import React from 'react';
import { useStudy } from '../context/StudyContext';

export default function Analytics() {
  const { partner, cards, streak } = useStudy();

  const structuralIntegrity = Math.min(cards.length * 8, 100);
  const partnershipBalance = partner ? Math.floor((streak / (streak + 3)) * 100) : 0;

  return (
    <div className="max-w-4xl animate-fade-in" style={{ padding: '0 1rem' }}>
      <h2 className="section-title text-primary flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
        <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        System Participation Diagnostics
      </h2>
      <p className="text-muted mb-6" style={{ textAlign: 'left' }}>Inspect synchronization alignment parameters below.</p>

      <div className="grid-2 gap-6">
        {/* Core Metrics Progress bars */}
        <div className="card-container text-left space-y-4">
          {/* Replaced flex-center with standard flex and items alignment */}
          <h3 className="action-panel-title flex gap-2" style={{ alignItems: 'center' }}>
            <svg className="icon text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Operational Metrics
          </h3>
          
          <div className="meter-group">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Memory Matrix Integrity</span>
              <span className="text-primary font-bold">{structuralIntegrity}%</span>
            </div>
            {/* Fixed Template Literal String */}
            <div className="bar-track"><div className="bar-fill bg-primary" style={{ width: `${structuralIntegrity}%` }} /></div>
          </div>

          <div className="meter-group">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Alliance Activity Sync</span>
              <span className="text-success font-bold">{partner ? '74%' : '0%'}</span>
            </div>
            <div className="bar-track"><div className="bar-fill bg-success" style={{ width: partner ? '74%' : '0%' }} /></div>
          </div>

          <div className="meter-group">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Streak Retention Parameter</span>
              <span className="text-orange font-bold">{Math.min(streak * 10, 100)}%</span>
            </div>
            {/* Fixed Template Literal String */}
            <div className="bar-track"><div className="bar-fill bg-orange" style={{ width: `${Math.min(streak * 10, 100)}%` }} /></div>
          </div>
        </div>

        {/* Contribution Logs View */}
        <div className="card-container text-left">
          {/* Replaced flex-center with standard flex and items alignment */}
          <h3 className="action-panel-title flex gap-2" style={{ alignItems: 'center' }}>
            <svg className="icon text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Balance of Participation
          </h3>
          {partner ? (
            <div className="space-y-4">
              <p className="text-sm text-muted">Tracks active resource allocation balances between your node and your partner.</p>
              
              <div className="balance-grid" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <div className="balance-node" style={{ flex: 1, textAlign: 'center', background: 'var(--background)', padding: '0.75rem', borderRadius: '0.375rem' }}>
                  <svg className="icon text-primary" style={{ margin: '0 auto 0.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <span className="node-label text-sm text-muted" style={{ display: 'block' }}>Your Cards</span>
                  <span className="node-val" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{cards.length}</span>
                </div>
                <div className="balance-node" style={{ flex: 1, textAlign: 'center', background: 'var(--background)', padding: '0.75rem', borderRadius: '0.375rem' }}>
                  <svg className="icon text-success" style={{ margin: '0 auto 0.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span className="node-label text-sm text-muted" style={{ display: 'block' }}>Partner Log</span>
                  <span className="node-val" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{partner.activeDays + 2}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <div className="flex justify-between text-xs text-muted font-bold mb-2">
                  <span>Resource Balance Mapping</span>
                  <span>{partnershipBalance}% Equity</span>
                </div>
                <div className="split-bar-track" style={{ display: 'flex', height: '8px', background: 'var(--background)', borderRadius: '4px', overflow: 'hidden' }}>
                  {/* Fixed Template Literal Strings inside inline styles */}
                  <div className="split-bar-left bg-primary" style={{ width: `${partnershipBalance}%`, height: '100%' }} />
                  <div className="split-bar-right bg-success" style={{ width: `${100 - partnershipBalance}%`, height: '100%' }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2rem 0' }}>
              Link an active study partner node to calculate shared balance metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}