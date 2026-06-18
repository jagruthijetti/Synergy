import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';

export default function QuizEngine() {
  const { cards, addRewards } = useStudy();

  const [quizDeck] = useState(() => [...cards].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAttempt, setUserAttempt] = useState('');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [results, setResults] = useState([]); // track each card result

  const activeCard = quizDeck[currentIndex];

  const handleCheck = () => {
    if (!userAttempt.trim()) return;
    const isCorrect = userAttempt.trim().toLowerCase() === activeCard.info.trim().toLowerCase();
    setResult(isCorrect ? 'correct' : 'wrong');
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setResults(prev => [...prev, {
      keyword: activeCard.keyword,
      correct: isCorrect,
      userAnswer: userAttempt.trim(),
      correctAnswer: activeCard.info.trim()
    }]);
    if (isCorrect) addRewards(15);
  };

  const handleNext = () => {
    setUserAttempt('');
    setResult(null);
    setCurrentIndex(prev => prev + 1);
  };

  if (quizDeck.length === 0) {
    return (
      <div className="card-container max-w-md text-center animate-fade-in" style={{ margin: '3rem auto' }}>
        <p className="text-muted">No memory cards found. Create some cards first!</p>
      </div>
    );
  }

  // ── Results Screen ──────────────────────────────────────
  if (currentIndex >= quizDeck.length) {
    const percentage = Math.round((score.correct / score.total) * 100);
    const missed = results.filter(r => !r.correct);
    const perfect = percentage === 100;

    let performanceLabel, performanceClass, tip;
    if (percentage === 100) {
      performanceLabel = 'Perfect Score!';
      performanceClass = 'qe-perf--perfect';
      tip = 'Outstanding! You have mastered all the cards in this deck. Try adding more advanced cards to keep challenging yourself.';
    } else if (percentage >= 75) {
      performanceLabel = 'Good Job!';
      performanceClass = 'qe-perf--good';
      tip = 'You are doing well! Focus on the missed keywords below and review them before your next attempt.';
    } else if (percentage >= 50) {
      performanceLabel = 'Needs Practice';
      performanceClass = 'qe-perf--average';
      tip = 'You are halfway there. Re-read the descriptions for the cards you missed, then retake the quiz.';
    } else {
      performanceLabel = 'Keep Going';
      performanceClass = 'qe-perf--low';
      tip = 'Do not worry — review all the cards in the Memory Matrix section and try again. Repetition is key!';
    }

    return (
      <div className="max-w-2xl animate-fade-in" style={{ padding: '0 1rem', margin: '0 auto' }}>

        {/* Score Banner */}
        <div className={`qe-score-banner ${performanceClass}`}>
          <h2 className="qe-score-title">{performanceLabel}</h2>
          <div className="qe-score-circle">
            <span className="qe-score-pct">{percentage}%</span>
            <span className="qe-score-sub">{score.correct} / {score.total} correct</span>
          </div>
        </div>

        {/* Tip Box */}
        <div className="qe-tip-box">
          <span className="qe-tip-icon">💡</span>
          <p>{tip}</p>
        </div>

        {/* Per-card Breakdown */}
        <h3 className="qe-section-heading">Answer Breakdown</h3>
        <div className="qe-breakdown-list">
          {results.map((r, i) => (
            <div key={i} className={`qe-breakdown-item ${r.correct ? 'qe-breakdown--correct' : 'qe-breakdown--wrong'}`}>
              <div className="qe-breakdown-header">
                <span className="qe-breakdown-keyword">{r.keyword}</span>
                <span className={`qe-breakdown-badge ${r.correct ? 'badge--correct' : 'badge--wrong'}`}>
                  {r.correct ? '✓ Correct' : '✗ Wrong'}
                </span>
              </div>
              {!r.correct && (
                <div className="qe-breakdown-answers">
                  <div className="qe-answer-row">
                    <span className="qe-answer-label">Your answer:</span>
                    <span className="qe-answer-text qe-answer--wrong">{r.userAnswer}</span>
                  </div>
                  <div className="qe-answer-row">
                    <span className="qe-answer-label">Correct answer:</span>
                    <span className="qe-answer-text qe-answer--correct">{r.correctAnswer}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Improve Section — only if there are missed cards */}
        {!perfect && (
          <>
            <h3 className="qe-section-heading" style={{ marginTop: '2rem' }}>
              📌 Keywords to Revisit ({missed.length})
            </h3>
            <div className="qe-revisit-list">
              {missed.map((r, i) => (
                <div key={i} className="qe-revisit-card">
                  <span className="qe-revisit-keyword">{r.keyword}</span>
                  <p className="qe-revisit-answer">{r.correctAnswer}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Retake */}
        <button
          className="btn-primary w-full"
          style={{ marginTop: '2rem', padding: '1rem' }}
          onClick={() => window.location.reload()}
        >
          Retake Quiz
        </button>

      </div>
    );
  }

  // ── Quiz Screen ─────────────────────────────────────────
  return (
    <div className="max-w-2xl animate-fade-in" style={{ padding: '0 1rem', margin: '0 auto' }}>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${(currentIndex / quizDeck.length) * 100}%` }} />
      </div>
      <p className="text-muted text-xs" style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
        {currentIndex + 1} / {quizDeck.length}
      </p>

      <div className="interactive-flashcard" style={{ cursor: 'default' }}>
        <span className="label-accent text-primary">Keyword</span>
        <h2 className="flashcard-main-text">{activeCard.keyword}</h2>
      </div>

      <div className="card-container text-left animate-fade-in" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
        <label className="input-label">Enter the description for this keyword:</label>
        <textarea
          value={userAttempt}
          onChange={e => setUserAttempt(e.target.value)}
          placeholder="Type the description here..."
          className="form-input"
          disabled={result !== null}
          style={{ height: '90px', resize: 'none', marginTop: '0.5rem' }}
        />

        {result === 'correct' && (
          <div className="qe-feedback qe-feedback--correct">✓ Correct! That matches perfectly.</div>
        )}
        {result === 'wrong' && (
          <div className="qe-feedback qe-feedback--wrong">
            ✗ Not quite. The correct answer was:
            <p className="qe-correct-answer">{activeCard.info}</p>
          </div>
        )}

        <div style={{ marginTop: '1rem' }}>
          {result === null ? (
            <button className="btn-primary w-full" onClick={handleCheck} disabled={!userAttempt.trim()}>
              Check Answer
            </button>
          ) : (
            <button className="btn-primary w-full" onClick={handleNext}>
              {currentIndex + 1 < quizDeck.length ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}