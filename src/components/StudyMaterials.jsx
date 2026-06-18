import React, { useState } from 'react';

const materials = {
  dsa: {
    label: 'Data Structures & Algorithms',
    accent: 'text-cyan',
    border: 'border-cyan',
    tag: 'DSA',
    resources: [
      {
        rank: 1,
        title: 'Introduction to Algorithms (CLRS)',
        author: 'Cormen, Leiserson, Rivest, Stein',
        type: 'Book',
        level: 'Advanced',
        description: 'The definitive reference for algorithms and data structures. Covers proofs, complexity analysis, and every major structure in rigorous depth.',
        url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
      },
      {
        rank: 2,
        title: 'MIT 6.006 — Introduction to Algorithms',
        author: 'MIT OpenCourseWare',
        type: 'Course',
        level: 'Intermediate',
        description: 'Free lecture series from MIT covering sorting, hashing, graphs, dynamic programming, and more with problem sets.',
        url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
      },
      {
        rank: 3,
        title: 'Algorithms by Robert Sedgewick',
        author: 'Robert Sedgewick & Kevin Wayne',
        type: 'Book',
        level: 'Intermediate',
        description: 'Java-based coverage of fundamental algorithms with visual explanations. Paired with a free Coursera course by the same authors.',
        url: 'https://algs4.cs.princeton.edu/home/',
      },
      {
        rank: 4,
        title: 'CP-Algorithms',
        author: 'Community (e-maxx)',
        type: 'Reference',
        level: 'Advanced',
        description: 'Comprehensive online encyclopedia of competitive programming algorithms — segment trees, Fenwick trees, graph algorithms, and more with code.',
        url: 'https://cp-algorithms.com/',
      },
      {
        rank: 5,
        title: 'Visualgo',
        author: 'Steven Halim (NUS)',
        type: 'Interactive',
        level: 'Beginner',
        description: 'Visualize BSTs, AVL trees, heaps, sorting algorithms, and graphs with step-by-step animation. Ideal for building intuition.',
        url: 'https://visualgo.net/',
      },
      {
        rank: 6,
        title: 'The Algorithm Design Manual',
        author: 'Steven Skiena',
        type: 'Book',
        level: 'Intermediate',
        description: 'Practical focus on selecting the right algorithm for the right problem. Famous "war stories" section shows real-world applications.',
        url: 'https://www.algorist.com/',
      },
      {
        rank: 7,
        title: 'LeetCode — Explore Cards',
        author: 'LeetCode',
        type: 'Practice',
        level: 'All Levels',
        description: 'Structured problem sets grouped by data structure: arrays, linked lists, trees, graphs, dynamic programming. Best for interview prep.',
        url: 'https://leetcode.com/explore/',
      },
      {
        rank: 8,
        title: 'Codeforces — EDU Section',
        author: 'Codeforces',
        type: 'Practice',
        level: 'Intermediate',
        description: 'Structured courses on segment trees, DSU, suffix arrays, and more — each with interactive problems of increasing difficulty.',
        url: 'https://codeforces.com/edu/courses',
      },
      {
        rank: 9,
        title: 'Data Structures — UC San Diego (Coursera)',
        author: 'UC San Diego / HSE',
        type: 'Course',
        level: 'Beginner',
        description: 'Part of the Algorithmic Toolbox specialization. Covers arrays, linked lists, stacks, queues, trees, and heaps with coding assignments.',
        url: 'https://www.coursera.org/learn/data-structures',
      },
      {
        rank: 10,
        title: 'Competitive Programmer\'s Handbook',
        author: 'Antti Laaksonen',
        type: 'Book',
        level: 'Advanced',
        description: 'Free PDF covering the entire competitive programming curriculum — from basics to advanced graph algorithms, trees, and math.',
        url: 'https://cses.fi/book/book.pdf',
      },
      {
        rank: 11,
        title: 'CSES Problem Set',
        author: 'CSES / Antti Laaksonen',
        type: 'Practice',
        level: 'Intermediate',
        description: '300 carefully curated problems covering every major DSA topic. Widely regarded as the gold standard problem set for learning.',
        url: 'https://cses.fi/problemset/',
      },
      {
        rank: 12,
        title: 'Striver\'s A2Z DSA Sheet',
        author: 'Raj Vikramaditya (Striver)',
        type: 'Roadmap',
        level: 'Beginner',
        description: 'Structured 455-problem roadmap from arrays to graphs to DP. Extremely popular for placement prep with video explanations per topic.',
        url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
      },
    ],
  },
  react: {
    label: 'React',
    accent: 'text-primary',
    border: 'border-primary',
    tag: 'React',
    resources: [
      {
        rank: 1,
        title: 'React Official Docs (react.dev)',
        author: 'Meta / React Team',
        type: 'Documentation',
        level: 'All Levels',
        description: 'The rewritten official docs with interactive sandboxes, deep dives on hooks, and the new mental model for thinking in React.',
        url: 'https://react.dev/',
      },
      {
        rank: 2,
        title: 'The Road to React',
        author: 'Robin Wieruch',
        type: 'Book',
        level: 'Beginner',
        description: 'Build a real Hacker News client from scratch. Covers hooks, async data fetching, custom hooks, and React patterns in depth.',
        url: 'https://www.roadtoreact.com/',
      },
      {
        rank: 3,
        title: 'Epic React by Kent C. Dodds',
        author: 'Kent C. Dodds',
        type: 'Course',
        level: 'Advanced',
        description: 'Workshop-style deep dive into React fundamentals, hooks, advanced patterns, performance optimization, and testing.',
        url: 'https://epicreact.dev/',
      },
      {
        rank: 4,
        title: 'Full Stack Open',
        author: 'University of Helsinki',
        type: 'Course',
        level: 'Intermediate',
        description: 'Free university-grade course covering React, Redux, Node, GraphQL, TypeScript, and testing. One of the best free full-stack curricula.',
        url: 'https://fullstackopen.com/',
      },
      {
        rank: 5,
        title: 'React Patterns',
        author: 'Alex Moldovan',
        type: 'Reference',
        level: 'Intermediate',
        description: 'Catalog of compound components, render props, HOCs, custom hooks, and context patterns with clear code examples.',
        url: 'https://reactpatterns.com/',
      },
      {
        rank: 6,
        title: 'Josh W Comeau — Joy of React',
        author: 'Josh W Comeau',
        type: 'Course',
        level: 'Intermediate',
        description: 'Deeply visual, interactive course focused on building intuition for how React actually works under the hood with modern patterns.',
        url: 'https://www.joyofreact.com/',
      },
      {
        rank: 7,
        title: 'Scrimba — Learn React',
        author: 'Scrimba',
        type: 'Course',
        level: 'Beginner',
        description: 'Interactive screencast course where you edit the instructor\'s code inline. Covers JSX, state, props, hooks, and project-based learning.',
        url: 'https://scrimba.com/learn/learnreact',
      },
      {
        rank: 8,
        title: 'Tao of React',
        author: 'Alex Moskov',
        type: 'Book',
        level: 'Intermediate',
        description: 'Concise guide to software design decisions in React — folder structure, component design, state management, and performance.',
        url: 'https://taoofreact.com/',
      },
      {
        rank: 9,
        title: 'React TypeScript Cheatsheet',
        author: 'Community (swyx)',
        type: 'Reference',
        level: 'Intermediate',
        description: 'The go-to reference for typing React components, hooks, events, context, and HOCs in TypeScript. Actively maintained.',
        url: 'https://react-typescript-cheatsheet.netlify.app/',
      },
      {
        rank: 10,
        title: 'Bulletproof React',
        author: 'Alan Alickovic',
        type: 'Reference',
        level: 'Advanced',
        description: 'Production-ready React architecture guide with a real codebase. Covers project structure, API layers, auth, testing, and performance.',
        url: 'https://github.com/alan2207/bulletproof-react',
      },
      {
        rank: 11,
        title: 'React Query (TanStack Query) Docs',
        author: 'TanStack',
        type: 'Documentation',
        level: 'Intermediate',
        description: 'Essential reading for server-state management in React. Covers caching, background refetching, mutations, and optimistic updates.',
        url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
      },
      {
        rank: 12,
        title: 'Theo (t3.gg) — YouTube Channel',
        author: 'Theo Browne',
        type: 'Video',
        level: 'Intermediate',
        description: 'Opinionated, fast-paced takes on the React ecosystem — Next.js, tRPC, Zustand, server components, and emerging patterns.',
        url: 'https://www.youtube.com/@t3dotgg',
      },
    ],
  },
};

const typeColors = {
  Book:          { bg: 'rgba(108,99,255,0.12)', color: '#6c63ff' },
  Course:        { bg: 'rgba(34,211,238,0.12)', color: '#22d3ee' },
  Reference:     { bg: 'rgba(168,85,247,0.12)', color: '#a855f7' },
  Interactive:   { bg: 'rgba(34,197,94,0.12)',  color: '#22c55e' },
  Practice:      { bg: 'rgba(249,115,22,0.12)', color: '#f97316' },
  Documentation: { bg: 'rgba(245,197,24,0.12)', color: '#f5c518' },
  Roadmap:       { bg: 'rgba(34,211,238,0.12)', color: '#22d3ee' },
  Video:         { bg: 'rgba(249,115,22,0.12)', color: '#f97316' },
};

const levelColors = {
  'Beginner':     '#22c55e',
  'Intermediate': '#f5c518',
  'Advanced':     '#f97316',
  'All Levels':   '#a855f7',
};

export default function StudyMaterials() {
  const [selected, setSelected] = useState(null);

  const subject = selected ? materials[selected] : null;

  return (
    <div className="studymat-root animate-fade-in">
      {/* Header */}
      <div className="studymat-header">
        {selected && (
          <button className="flashcards-back-btn" onClick={() => setSelected(null)}>
            ← Back
          </button>
        )}
        <div>
          <h1 className="dashboard-title">
            {selected ? subject.label : 'Study Materials'}
          </h1>
          <p className="text-muted">
            {selected
              ? `${subject.resources.length} curated resources · ranked by depth and utility`
              : 'Choose a subject to load its recommended resources.'}
          </p>
        </div>
      </div>

      {/* Subject Picker */}
      {!selected && (
        <div className="studymat-picker">
          <button
            className="studymat-subject-tile border-cyan"
            onClick={() => setSelected('dsa')}
          >
            <span className="studymat-tile-icon">🧩</span>
            <span className="studymat-tile-label text-cyan">Data Structures & Algorithms</span>
            <span className="studymat-tile-sub">12 resources · books, courses, practice</span>
          </button>
          <button
            className="studymat-subject-tile border-primary"
            onClick={() => setSelected('react')}
          >
            <span className="studymat-tile-icon">⚛️</span>
            <span className="studymat-tile-label text-primary">React</span>
            <span className="studymat-tile-sub">12 resources · docs, courses, patterns</span>
          </button>
        </div>
      )}

      {/* Resource List */}
      {selected && subject && (
        <div className="studymat-list">
          {subject.resources.map((r) => {
            const typeStyle = typeColors[r.type] || { bg: 'rgba(255,255,255,0.08)', color: '#ccc' };
            const levelColor = levelColors[r.level] || '#888';
            return (
              <a
                key={r.rank}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="studymat-card"
              >
                <div className="studymat-card-rank">{String(r.rank).padStart(2, '0')}</div>
                <div className="studymat-card-body">
                  <div className="studymat-card-top">
                    <span className="studymat-card-title">{r.title}</span>
                    <div className="studymat-card-badges">
                      <span
                        className="studymat-badge"
                        style={{ background: typeStyle.bg, color: typeStyle.color }}
                      >
                        {r.type}
                      </span>
                      <span
                        className="studymat-badge"
                        style={{ background: 'transparent', color: levelColor, border: `1px solid ${levelColor}` }}
                      >
                        {r.level}
                      </span>
                    </div>
                  </div>
                  <p className="studymat-card-author">{r.author}</p>
                  <p className="studymat-card-desc">{r.description}</p>
                </div>
                <div className="studymat-card-arrow">↗</div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}