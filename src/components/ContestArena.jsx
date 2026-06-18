import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../context/StudyContext';

const QUESTION_BANK = {
  bst: [
    { question: "What is the time complexity of searching in a balanced BST?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "B) O(log n)" },
    { question: "In a BST, where is the minimum element always found?", options: ["A) Root", "B) Rightmost node", "C) Leftmost node", "D) Any leaf"], answer: "C) Leftmost node" },
    { question: "What is the worst-case time complexity of BST insertion?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n²)"], answer: "C) O(n)" },
    { question: "Which traversal of a BST gives elements in sorted order?", options: ["A) Preorder", "B) Postorder", "C) Level order", "D) Inorder"], answer: "D) Inorder" },
    { question: "What is the maximum number of nodes in a BST of height h?", options: ["A) h", "B) 2h", "C) 2^h - 1", "D) 2^(h+1) - 1"], answer: "D) 2^(h+1) - 1" },
    { question: "Deleting a node with two children in a BST replaces it with?", options: ["A) Left child", "B) Right child", "C) Inorder successor", "D) Root"], answer: "C) Inorder successor" },
    { question: "Which property must every node in a BST satisfy?", options: ["A) Left child > node > right child", "B) Left child < node < right child", "C) All children equal node", "D) Node is always a leaf"], answer: "B) Left child < node < right child" },
    { question: "What is the height of a BST with only 1 node?", options: ["A) -1", "B) 0", "C) 1", "D) 2"], answer: "B) 0" },
    { question: "A degenerate BST is essentially equivalent to?", options: ["A) Heap", "B) Stack", "C) Linked list", "D) Queue"], answer: "C) Linked list" },
    { question: "What is the average case time complexity of BST search?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "B) O(log n)" },
    { question: "Which of the following is NOT a valid BST operation?", options: ["A) Search", "B) Insert", "C) Heapify", "D) Delete"], answer: "C) Heapify" },
    { question: "In BST deletion, a node with no children is called?", options: ["A) Internal node", "B) Root", "C) Leaf node", "D) Branch"], answer: "C) Leaf node" },
    { question: "What is the inorder predecessor of a node in a BST?", options: ["A) Largest node in right subtree", "B) Smallest node in right subtree", "C) Largest node in left subtree", "D) Parent node"], answer: "C) Largest node in left subtree" },
    { question: "Building a BST from n sorted elements results in height?", options: ["A) log n", "B) n/2", "C) n-1", "D) √n"], answer: "C) n-1" },
    { question: "Which operation is most expensive in a skewed BST?", options: ["A) Finding root", "B) Finding min", "C) Finding max", "D) Searching a non-existent element"], answer: "D) Searching a non-existent element" },
  ],
  avl: [
    { question: "What is the balance factor of a node in an AVL tree?", options: ["A) Left height + Right height", "B) Left height - Right height", "C) Right height - Left height", "D) Max(Left, Right) height"], answer: "B) Left height - Right height" },
    { question: "Which balance factors are allowed in an AVL tree?", options: ["A) -2, -1, 0", "B) 0, 1, 2", "C) -1, 0, 1", "D) -2, 0, 2"], answer: "C) -1, 0, 1" },
    { question: "What rotation is needed for a Left-Left imbalance?", options: ["A) Left rotation", "B) Right rotation", "C) Left-Right rotation", "D) Right-Left rotation"], answer: "B) Right rotation" },
    { question: "What is the time complexity of insertion in an AVL tree?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "B) O(log n)" },
    { question: "How many rotations does a Left-Right imbalance require?", options: ["A) 0", "B) 1", "C) 2", "D) 3"], answer: "C) 2" },
    { question: "What is the maximum height of an AVL tree with n nodes?", options: ["A) log n", "B) 1.44 log n", "C) 2 log n", "D) n/2"], answer: "B) 1.44 log n" },
    { question: "Which imbalance requires a Right-Left double rotation?", options: ["A) Node inserted in left subtree of left child", "B) Node inserted in right subtree of right child", "C) Node inserted in left subtree of right child", "D) Node inserted in right subtree of left child"], answer: "C) Node inserted in left subtree of right child" },
    { question: "AVL trees are a type of?", options: ["A) Heap", "B) Self-balancing BST", "C) Complete binary tree", "D) B-tree"], answer: "B) Self-balancing BST" },
    { question: "After insertion in AVL, rebalancing starts from?", options: ["A) Root", "B) Newly inserted node upward", "C) Leaves downward", "D) Random node"], answer: "B) Newly inserted node upward" },
    { question: "What is the minimum number of nodes in an AVL tree of height 3?", options: ["A) 4", "B) 5", "C) 6", "D) 7"], answer: "D) 7" },
    { question: "Which is faster for lookups: AVL tree or Red-Black tree?", options: ["A) Red-Black tree", "B) AVL tree", "C) Both are equal", "D) Depends on input"], answer: "B) AVL tree" },
    { question: "A Right-Right imbalance is fixed by?", options: ["A) Right rotation", "B) Left rotation", "C) Double right rotation", "D) Left-Right rotation"], answer: "B) Left rotation" },
    { question: "AVL tree deletion may require at most how many rotations?", options: ["A) 1", "B) log n", "C) n", "D) 2"], answer: "B) log n" },
    { question: "The balance factor of a leaf node is?", options: ["A) 1", "B) -1", "C) 0", "D) 2"], answer: "C) 0" },
    { question: "Which property distinguishes AVL from a regular BST?", options: ["A) Faster insertion", "B) Guaranteed height balance", "C) Allows duplicates", "D) Uses less memory"], answer: "B) Guaranteed height balance" },
  ],
  segment: [
    { question: "What is a segment tree primarily used for?", options: ["A) Sorting arrays", "B) Range queries and updates", "C) Graph traversal", "D) Hashing"], answer: "B) Range queries and updates" },
    { question: "What is the space complexity of a segment tree for n elements?", options: ["A) O(n)", "B) O(n log n)", "C) O(2n)", "D) O(4n)"], answer: "D) O(4n)" },
    { question: "What is the time complexity of a range query in a segment tree?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "B) O(log n)" },
    { question: "What is the time complexity of building a segment tree?", options: ["A) O(log n)", "B) O(n)", "C) O(n log n)", "D) O(n²)"], answer: "B) O(n)" },
    { question: "In a segment tree, leaf nodes represent?", options: ["A) Ranges of elements", "B) Individual elements", "C) Sum of all elements", "D) Tree height"], answer: "B) Individual elements" },
    { question: "A lazy propagation segment tree is used for?", options: ["A) Faster construction", "B) Efficient range updates", "C) Reducing space", "D) Sorting"], answer: "B) Efficient range updates" },
    { question: "For an array of size n, a segment tree has how many nodes?", options: ["A) n", "B) 2n", "C) 2n-1", "D) 4n"], answer: "C) 2n-1" },
    { question: "Which operation does NOT benefit from a segment tree?", options: ["A) Range sum query", "B) Range min query", "C) Point update", "D) Sorting"], answer: "D) Sorting" },
    { question: "What is the time complexity of a point update in a segment tree?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "B) O(log n)" },
    { question: "The root of a segment tree represents?", options: ["A) First element", "B) Last element", "C) Entire array range", "D) Middle element"], answer: "C) Entire array range" },
    { question: "In a 1-indexed segment tree, left child of node i is?", options: ["A) i+1", "B) 2i", "C) 2i+1", "D) i/2"], answer: "B) 2i" },
    { question: "Which is better for range updates without lazy propagation?", options: ["A) Segment tree", "B) BIT/Fenwick tree", "C) Both equal", "D) Neither"], answer: "B) BIT/Fenwick tree" },
    { question: "Segment tree can answer range GCD queries in?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "B) O(log n)" },
    { question: "What does a merge step in segment tree construction do?", options: ["A) Splits a range", "B) Combines children results", "C) Deletes a node", "D) Rebalances the tree"], answer: "B) Combines children results" },
    { question: "Lazy propagation defers updates to?", options: ["A) Root only", "B) Only when children are accessed", "C) All nodes immediately", "D) Leaf nodes only"], answer: "B) Only when children are accessed" },
  ],
  fenwick: [
    { question: "Another name for Fenwick tree is?", options: ["A) Segment tree", "B) Binary Indexed Tree", "C) AVL tree", "D) Trie"], answer: "B) Binary Indexed Tree" },
    { question: "What is the time complexity of a prefix sum query in a Fenwick tree?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "B) O(log n)" },
    { question: "What is the space complexity of a Fenwick tree?", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n log n)"], answer: "C) O(n)" },
    { question: "Fenwick trees use which bit operation to find parent?", options: ["A) XOR", "B) AND with complement", "C) OR", "D) Left shift"], answer: "B) AND with complement" },
    { question: "To move to the next responsible node during update, you?", options: ["A) Add the lowest set bit", "B) Remove the lowest set bit", "C) Double the index", "D) Halve the index"], answer: "A) Add the lowest set bit" },
    { question: "Fenwick trees are typically 1-indexed because?", options: ["A) 0 has no set bits", "B) Easier to implement", "C) Faster queries", "D) Less memory"], answer: "A) 0 has no set bits" },
    { question: "What operation does i & (-i) compute?", options: ["A) Floor of i/2", "B) Lowest set bit of i", "C) Highest set bit of i", "D) XOR of i"], answer: "B) Lowest set bit of i" },
    { question: "Fenwick tree is best suited for?", options: ["A) Range min queries", "B) Dynamic prefix sum queries", "C) Graph traversal", "D) Sorting"], answer: "B) Dynamic prefix sum queries" },
    { question: "Can a Fenwick tree answer range sum query [l, r]?", options: ["A) No", "B) Yes, using prefix[r] - prefix[l-1]", "C) Only for l=1", "D) Only for r=n"], answer: "B) Yes, using prefix[r] - prefix[l-1]" },
    { question: "Compared to segment tree, Fenwick tree has?", options: ["A) More functionality", "B) Less memory and simpler code", "C) Faster construction", "D) Better range updates"], answer: "B) Less memory and simpler code" },
    { question: "Which query type can segment tree do but basic Fenwick cannot?", options: ["A) Point update", "B) Prefix sum", "C) Range min/max query", "D) Range sum"], answer: "C) Range min/max query" },
    { question: "To query prefix sum up to index i in BIT, you?", options: ["A) Add lowest set bit repeatedly", "B) Remove lowest set bit repeatedly", "C) Traverse from root", "D) Use DFS"], answer: "B) Remove lowest set bit repeatedly" },
    { question: "Building a Fenwick tree from scratch takes?", options: ["A) O(log n)", "B) O(n)", "C) O(n log n)", "D) O(n²)"], answer: "B) O(n)" },
    { question: "Fenwick trees were invented by?", options: ["A) Donald Knuth", "B) Peter Fenwick", "C) Edsger Dijkstra", "D) Tony Hoare"], answer: "B) Peter Fenwick" },
    { question: "A Fenwick tree node at index i stores sum of how many elements?", options: ["A) i elements", "B) Elements based on lowest set bit of i", "C) All elements up to i", "D) log i elements"], answer: "B) Elements based on lowest set bit of i" },
  ],
  prims: [
    { question: "Prim's algorithm is used to find?", options: ["A) Shortest path", "B) Minimum Spanning Tree", "C) Topological sort", "D) Strongly connected components"], answer: "B) Minimum Spanning Tree" },
    { question: "Prim's algorithm starts from?", options: ["A) Node with highest degree", "B) Any arbitrary node", "C) Node with lowest weight edge", "D) Leaf node"], answer: "B) Any arbitrary node" },
    { question: "Prim's algorithm is a type of?", options: ["A) Dynamic programming", "B) Divide and conquer", "C) Greedy algorithm", "D) Backtracking"], answer: "C) Greedy algorithm" },
    { question: "Time complexity of Prim's with binary heap is?", options: ["A) O(V²)", "B) O(E log V)", "C) O(V log E)", "D) O(E + V)"], answer: "B) O(E log V)" },
    { question: "Prim's algorithm works on?", options: ["A) Only directed graphs", "B) Only undirected graphs", "C) Both directed and undirected", "D) Only DAGs"], answer: "B) Only undirected graphs" },
    { question: "At each step, Prim's algorithm adds the?", options: ["A) Edge with maximum weight", "B) Minimum weight edge connecting tree to non-tree vertex", "C) Random edge", "D) Edge forming a cycle"], answer: "B) Minimum weight edge connecting tree to non-tree vertex" },
    { question: "Which data structure makes Prim's most efficient?", options: ["A) Stack", "B) Queue", "C) Priority queue", "D) Array"], answer: "C) Priority queue" },
    { question: "Prim's with adjacency matrix has time complexity?", options: ["A) O(V log V)", "B) O(V²)", "C) O(E log V)", "D) O(VE)"], answer: "B) O(V²)" },
    { question: "How many edges does the MST produced by Prim's have?", options: ["A) V", "B) V-1", "C) E", "D) E-1"], answer: "B) V-1" },
    { question: "Prim's algorithm is similar to which shortest path algorithm?", options: ["A) Bellman-Ford", "B) Floyd-Warshall", "C) Dijkstra's", "D) BFS"], answer: "C) Dijkstra's" },
    { question: "What happens if the graph is disconnected in Prim's?", options: ["A) Still finds MST", "B) Cannot find spanning tree for all nodes", "C) Finds shortest path", "D) Runs forever"], answer: "B) Cannot find spanning tree for all nodes" },
    { question: "Prim's key value represents?", options: ["A) Distance from source", "B) Minimum edge weight to connect to MST", "C) Node degree", "D) Height in tree"], answer: "B) Minimum edge weight to connect to MST" },
    { question: "Which graph representation is better for dense graphs in Prim's?", options: ["A) Adjacency list", "B) Adjacency matrix", "C) Edge list", "D) Incidence matrix"], answer: "B) Adjacency matrix" },
    { question: "Prim's vs Kruskal's: Prim's is better for?", options: ["A) Sparse graphs", "B) Dense graphs", "C) Directed graphs", "D) Unweighted graphs"], answer: "B) Dense graphs" },
    { question: "The MST produced by Prim's algorithm is?", options: ["A) Always unique", "B) Unique only if all edge weights are distinct", "C) Never unique", "D) Depends on start node"], answer: "B) Unique only if all edge weights are distinct" },
  ],
  kruskals: [
    { question: "Kruskal's algorithm builds MST by?", options: ["A) Growing from one node", "B) Adding minimum edges without forming cycles", "C) BFS traversal", "D) DFS traversal"], answer: "B) Adding minimum edges without forming cycles" },
    { question: "Kruskal's algorithm sorts edges by?", options: ["A) Vertex degree", "B) Edge weight ascending", "C) Edge weight descending", "D) Vertex label"], answer: "B) Edge weight ascending" },
    { question: "Which data structure detects cycles in Kruskal's?", options: ["A) Stack", "B) Queue", "C) Union-Find / Disjoint Set", "D) Heap"], answer: "C) Union-Find / Disjoint Set" },
    { question: "Time complexity of Kruskal's algorithm is?", options: ["A) O(V²)", "B) O(E log E)", "C) O(V log V)", "D) O(VE)"], answer: "B) O(E log E)" },
    { question: "Kruskal's is better than Prim's for?", options: ["A) Dense graphs", "B) Sparse graphs", "C) Directed graphs", "D) Cyclic graphs"], answer: "B) Sparse graphs" },
    { question: "Kruskal's algorithm is?", options: ["A) Dynamic programming", "B) Greedy", "C) Divide and conquer", "D) Backtracking"], answer: "B) Greedy" },
    { question: "In Kruskal's, an edge is rejected when?", options: ["A) It has maximum weight", "B) It connects two nodes in same component", "C) It connects isolated nodes", "D) It is a self-loop only"], answer: "B) It connects two nodes in same component" },
    { question: "Union by rank in Kruskal's helps?", options: ["A) Sort edges faster", "B) Keep the tree balanced for near O(1) ops", "C) Detect cycles faster", "D) Reduce edge count"], answer: "B) Keep the tree balanced for near O(1) ops" },
    { question: "How many edges are in the final MST from Kruskal's?", options: ["A) E", "B) V", "C) V-1", "D) E-1"], answer: "C) V-1" },
    { question: "Path compression in Union-Find?", options: ["A) Increases tree height", "B) Flattens tree for faster future queries", "C) Sorts the edges", "D) Removes duplicate edges"], answer: "B) Flattens tree for faster future queries" },
    { question: "Kruskal's algorithm can handle?", options: ["A) Only connected graphs", "B) Disconnected graphs (finds MST forest)", "C) Only dense graphs", "D) Only directed graphs"], answer: "B) Disconnected graphs (finds MST forest)" },
    { question: "What is the first step in Kruskal's algorithm?", options: ["A) Initialize visited array", "B) Sort all edges by weight", "C) Choose starting vertex", "D) Build adjacency matrix"], answer: "B) Sort all edges by weight" },
    { question: "With path compression, Union-Find amortized complexity is?", options: ["A) O(log n)", "B) O(n)", "C) O(α(n)) — near constant", "D) O(1) exact"], answer: "C) O(α(n)) — near constant" },
    { question: "If two edges have same weight in Kruskal's, the MST?", options: ["A) Is always unique", "B) May not be unique", "C) Cannot be built", "D) Requires extra processing"], answer: "B) May not be unique" },
    { question: "Kruskal's produces a spanning tree only if the graph is?", options: ["A) Directed", "B) Connected", "C) Weighted uniquely", "D) Dense"], answer: "B) Connected" },
  ],

  // ── REACT TOPICS ─────────────────────────────────────────
  react_basics: [
    { question: "What does JSX stand for?", options: ["A) JavaScript XML", "B) JavaScript Extension", "C) Java Syntax XML", "D) JSON XML"], answer: "A) JavaScript XML" },
    { question: "Which method is used to render a React component into the DOM?", options: ["A) React.render()", "B) ReactDOM.render()", "C) Component.mount()", "D) React.mount()"], answer: "B) ReactDOM.render()" },
    { question: "What is the virtual DOM?", options: ["A) A direct copy of the real DOM", "B) A lightweight in-memory representation of the real DOM", "C) A browser API", "D) A React component"], answer: "B) A lightweight in-memory representation of the real DOM" },
    { question: "Which hook is used to manage state in a functional component?", options: ["A) useEffect", "B) useContext", "C) useState", "D) useRef"], answer: "C) useState" },
    { question: "What triggers a re-render in React?", options: ["A) Any variable change", "B) State or prop change", "C) A DOM event only", "D) A network request"], answer: "B) State or prop change" },
    { question: "What is the correct way to conditionally render in JSX?", options: ["A) if/else block inside JSX", "B) Ternary operator or &&", "C) switch statement inside JSX", "D) for loop inside JSX"], answer: "B) Ternary operator or &&" },
    { question: "Which file extension is typically used for React components?", options: ["A) .react", "B) .js or .jsx", "C) .html", "D) .ts only"], answer: "B) .js or .jsx" },
    { question: "What does React.StrictMode do?", options: ["A) Prevents all console logs", "B) Highlights potential problems in development", "C) Enforces TypeScript", "D) Disables hooks"], answer: "B) Highlights potential problems in development" },
    { question: "A React component name must start with?", options: ["A) Lowercase letter", "B) Uppercase letter", "C) An underscore", "D) The word 'React'"], answer: "B) Uppercase letter" },
    { question: "Which is the correct way to embed a JS expression in JSX?", options: ["A) {{ expression }}", "B) ${ expression }", "C) { expression }", "D) <% expression %>"], answer: "C) { expression }" },
    { question: "What does the key prop do in a list?", options: ["A) Applies CSS styling", "B) Helps React identify which items changed", "C) Sets focus on the element", "D) Encrypts the data"], answer: "B) Helps React identify which items changed" },
    { question: "Fragments in React are used to?", options: ["A) Split code into chunks", "B) Group elements without adding extra DOM nodes", "C) Create portals", "D) Lazy load components"], answer: "B) Group elements without adding extra DOM nodes" },
    { question: "What is the default export in a React component file used for?", options: ["A) To import CSS", "B) To expose the main component for import elsewhere", "C) To configure Webpack", "D) To define PropTypes"], answer: "B) To expose the main component for import elsewhere" },
    { question: "useState returns?", options: ["A) Just the state value", "B) The state value and a setter function", "C) A ref object", "D) A context object"], answer: "B) The state value and a setter function" },
    { question: "Which of these is a controlled component?", options: ["A) Input whose value is managed by the DOM", "B) Input whose value is managed by React state", "C) Input with no event handlers", "D) Input inside a portal"], answer: "B) Input whose value is managed by React state" },
  ],

  props: [
    { question: "What are props in React?", options: ["A) Internal mutable state", "B) Read-only inputs passed from parent to child", "C) Global variables", "D) CSS class names"], answer: "B) Read-only inputs passed from parent to child" },
    { question: "Can a child component modify its own props?", options: ["A) Yes, directly", "B) Yes, via setState", "C) No, props are read-only", "D) Only in class components"], answer: "C) No, props are read-only" },
    { question: "How do you pass a function as a prop?", options: ["A) props.function()", "B) <Child fn={handleClick} />", "C) <Child fn='handleClick' />", "D) <Child>{handleClick}</Child>"], answer: "B) <Child fn={handleClick} />" },
    { question: "What is the children prop?", options: ["A) An array of sibling components", "B) Content passed between a component's opening and closing tags", "C) A list of child routes", "D) The component's sub-state"], answer: "B) Content passed between a component's opening and closing tags" },
    { question: "Default props are used to?", options: ["A) Override parent props", "B) Provide fallback values when props are not passed", "C) Validate prop types", "D) Memoize props"], answer: "B) Provide fallback values when props are not passed" },
    { question: "PropTypes is used for?", options: ["A) Styling components", "B) Runtime type-checking of props", "C) Managing state", "D) Routing"], answer: "B) Runtime type-checking of props" },
    { question: "What does prop drilling mean?", options: ["A) Optimizing props with memoization", "B) Passing props through many layers of components unnecessarily", "C) Destructuring props", "D) Passing functions as props"], answer: "B) Passing props through many layers of components unnecessarily" },
    { question: "How do you destructure props in a functional component?", options: ["A) function Comp(props.name)", "B) function Comp({ name })", "C) function Comp([name])", "D) function Comp(name = props)"], answer: "B) function Comp({ name })" },
    { question: "Spread operator in props (<Comp {...obj} />) does what?", options: ["A) Clones the component", "B) Passes all object properties as individual props", "C) Merges two components", "D) Spreads children"], answer: "B) Passes all object properties as individual props" },
    { question: "What happens if a required PropType is missing?", options: ["A) App crashes", "B) A console warning is shown in development", "C) Component unmounts", "D) Default is used silently"], answer: "B) A console warning is shown in development" },
    { question: "Which hook solves prop drilling without a library?", options: ["A) useReducer", "B) useContext", "C) useMemo", "D) useCallback"], answer: "B) useContext" },
    { question: "A component that receives children and wraps them is called a?", options: ["A) HOC", "B) Provider", "C) Wrapper or container component", "D) Reducer"], answer: "C) Wrapper or container component" },
    { question: "render props pattern means?", options: ["A) Returning JSX from a state setter", "B) Passing a function as a prop that returns JSX", "C) Rendering props as text", "D) Using props in CSS"], answer: "B) Passing a function as a prop that returns JSX" },
    { question: "Props vs State: which one is owned by the component itself?", options: ["A) Props", "B) State", "C) Both", "D) Neither"], answer: "B) State" },
    { question: "To pass a numeric prop, you write?", options: ["A) <Comp count='5' />", "B) <Comp count={5} />", "C) <Comp count=5 />", "D) <Comp count=(5) />"], answer: "B) <Comp count={5} />" },
  ],

  hooks: [
    { question: "Which hook runs a side effect after every render?", options: ["A) useState", "B) useEffect with no dependency array", "C) useLayoutEffect", "D) useMemo"], answer: "B) useEffect with no dependency array" },
    { question: "An empty dependency array [] in useEffect means?", options: ["A) Runs after every render", "B) Runs only once after the first render", "C) Never runs", "D) Runs before render"], answer: "B) Runs only once after the first render" },
    { question: "useRef is primarily used to?", options: ["A) Store state that triggers re-renders", "B) Access DOM elements or persist values without re-rendering", "C) Memoize functions", "D) Fetch data"], answer: "B) Access DOM elements or persist values without re-rendering" },
    { question: "useCallback is used to?", options: ["A) Cache a computed value", "B) Memoize a function reference between renders", "C) Run side effects", "D) Manage context"], answer: "B) Memoize a function reference between renders" },
    { question: "useMemo is used to?", options: ["A) Memoize a function", "B) Cache an expensive computed value between renders", "C) Access the DOM", "D) Subscribe to context"], answer: "B) Cache an expensive computed value between renders" },
    { question: "What does useReducer offer over useState?", options: ["A) Less code", "B) Better for complex state logic with multiple sub-values", "C) Automatic API calls", "D) Built-in memoization"], answer: "B) Better for complex state logic with multiple sub-values" },
    { question: "A custom hook must start with?", options: ["A) handle", "B) use", "C) hook", "D) get"], answer: "B) use" },
    { question: "Where can hooks be called?", options: ["A) Inside loops or conditions", "B) Only at the top level of a function component or custom hook", "C) Inside class components", "D) Inside event handlers only"], answer: "B) Only at the top level of a function component or custom hook" },
    { question: "useContext(MyContext) returns?", options: ["A) The Provider component", "B) The current context value", "C) A dispatch function", "D) A ref object"], answer: "B) The current context value" },
    { question: "The cleanup function in useEffect runs?", options: ["A) Before the component mounts", "B) Before the next effect runs or when the component unmounts", "C) After every state change", "D) Only on unmount, never between renders"], answer: "B) Before the next effect runs or when the component unmounts" },
    { question: "useLayoutEffect differs from useEffect in that it fires?", options: ["A) After paint, asynchronously", "B) Synchronously after DOM mutations, before paint", "C) Only on initial render", "D) Only in class components"], answer: "B) Synchronously after DOM mutations, before paint" },
    { question: "What is the purpose of the dependency array in useEffect?", options: ["A) To list all state variables", "B) To control when the effect re-runs", "C) To import modules", "D) To set initial state"], answer: "B) To control when the effect re-runs" },
    { question: "To update state based on previous state, you should?", options: ["A) Read state and add directly", "B) Use the functional update form: setState(prev => prev + 1)", "C) Use useRef", "D) Use useReducer only"], answer: "B) Use the functional update form: setState(prev => prev + 1)" },
    { question: "React.memo wraps a component to?", options: ["A) Add routing", "B) Skip re-rendering if props haven't changed", "C) Lazy load it", "D) Add error boundaries"], answer: "B) Skip re-rendering if props haven't changed" },
    { question: "Which hook would you use to imperatively focus an input on mount?", options: ["A) useState", "B) useEffect + useRef", "C) useCallback", "D) useMemo"], answer: "B) useEffect + useRef" },
  ],

  routing: [
    { question: "Which library is most commonly used for routing in React?", options: ["A) React Router", "B) Next Router", "C) Vue Router", "D) Angular Router"], answer: "A) React Router" },
    { question: "Which component wraps the app to enable routing in React Router v6?", options: ["A) <Router>", "B) <BrowserRouter>", "C) <Switch>", "D) <HashRouter> only"], answer: "B) <BrowserRouter>" },
    { question: "In React Router v6, <Switch> is replaced by?", options: ["A) <Router>", "B) <Routes>", "C) <Outlet>", "D) <Navigate>"], answer: "B) <Routes>" },
    { question: "How do you define a route in React Router v6?", options: ["A) <Route path='/about' component={About} />", "B) <Route path='/about' element={<About />} />", "C) <Link to='/about' />", "D) <Navigate to='/about' />"], answer: "B) <Route path='/about' element={<About />} />" },
    { question: "Which hook gives you the current URL params?", options: ["A) useLocation", "B) useNavigate", "C) useParams", "D) useRoute"], answer: "C) useParams" },
    { question: "Which component is used for navigation links without page reload?", options: ["A) <a href>", "B) <Link>", "C) <button>", "D) <Navigate>"], answer: "B) <Link>" },
    { question: "useNavigate() hook is used to?", options: ["A) Read the current path", "B) Programmatically navigate to a route", "C) Define route parameters", "D) Create nested routes"], answer: "B) Programmatically navigate to a route" },
    { question: "Nested routes in React Router v6 use which component to render child routes?", options: ["A) <Switch>", "B) <Outlet>", "C) <Nested>", "D) <Fragment>"], answer: "B) <Outlet>" },
    { question: "A 404 Not Found route is defined with path?", options: ["A) path='/404'", "B) path='*'", "C) path='/not-found'", "D) path='/'"], answer: "B) path='*'" },
    { question: "useLocation() returns?", options: ["A) The current user's location", "B) An object with pathname, search, and hash", "C) A navigation function", "D) Route parameters"], answer: "B) An object with pathname, search, and hash" },
    { question: "NavLink differs from Link in that it?", options: ["A) Reloads the page", "B) Adds an active class when the route matches", "C) Works only for external links", "D) Passes route state automatically"], answer: "B) Adds an active class when the route matches" },
    { question: "To redirect a user in React Router v6, you use?", options: ["A) <Redirect to='/home' />", "B) <Navigate to='/home' />", "C) useRedirect('/home')", "D) history.push('/home')"], answer: "B) <Navigate to='/home' />" },
    { question: "Protected routes are typically implemented by?", options: ["A) React Router built-in auth prop", "B) Wrapping Route with a component that checks auth and redirects", "C) Using useParams", "D) Setting route priority"], answer: "B) Wrapping Route with a component that checks auth and redirects" },
    { question: "What does the index route mean in React Router v6?", options: ["A) The first route in the list", "B) Default child route rendered when parent path matches exactly", "C) A route at path='/'", "D) A route with no element"], answer: "B) Default child route rendered when parent path matches exactly" },
    { question: "Hash routing (#) is used when?", options: ["A) You want clean URLs", "B) The server can't handle client-side routes and you need fallback", "C) You need query parameters", "D) You use Next.js"], answer: "B) The server can't handle client-side routes and you need fallback" },
  ],

  api_fetch: [
    { question: "Which hook is typically used to fetch data on component mount?", options: ["A) useState", "B) useEffect", "C) useCallback", "D) useMemo"], answer: "B) useEffect" },
    { question: "What is the correct way to avoid memory leaks when fetching in useEffect?", options: ["A) Use async/await directly in useEffect", "B) Return a cleanup function and use an abort controller", "C) Fetch outside the component", "D) Use setTimeout"], answer: "B) Return a cleanup function and use an abort controller" },
    { question: "fetch() returns?", options: ["A) The response data directly", "B) A Promise that resolves to a Response object", "C) An Observable", "D) A callback"], answer: "B) A Promise that resolves to a Response object" },
    { question: "To parse JSON from a fetch response, you call?", options: ["A) response.text()", "B) response.json()", "C) JSON.parse(response)", "D) response.data()"], answer: "B) response.json()" },
    { question: "What should you store in state when fetching data?", options: ["A) Only the data", "B) data, loading, and error states", "C) Only the URL", "D) Only the status code"], answer: "B) data, loading, and error states" },
    { question: "Axios differs from fetch in that it?", options: ["A) Only works in Node.js", "B) Automatically parses JSON and has better error handling", "C) Cannot handle POST requests", "D) Requires no installation"], answer: "B) Automatically parses JSON and has better error handling" },
    { question: "What HTTP method is used to create a new resource?", options: ["A) GET", "B) POST", "C) PUT", "D) DELETE"], answer: "B) POST" },
    { question: "An AbortController is used in fetch to?", options: ["A) Speed up the request", "B) Cancel an in-flight request", "C) Set request headers", "D) Parse the response"], answer: "B) Cancel an in-flight request" },
    { question: "React Query (TanStack Query) is used to?", options: ["A) Replace useState entirely", "B) Manage server state, caching, and background refetching", "C) Handle form validation", "D) Style components"], answer: "B) Manage server state, caching, and background refetching" },
    { question: "Which status code indicates a successful GET request?", options: ["A) 201", "B) 200", "C) 204", "D) 301"], answer: "B) 200" },
    { question: "CORS errors in fetch occur when?", options: ["A) The JSON is malformed", "B) The server doesn't allow requests from the client's origin", "C) The network is offline", "D) The URL is incorrect"], answer: "B) The server doesn't allow requests from the client's origin" },
    { question: "async/await in useEffect requires?", options: ["A) Marking useEffect itself as async", "B) Defining an async function inside useEffect and calling it", "C) Using a library", "D) React 18 only"], answer: "B) Defining an async function inside useEffect and calling it" },
    { question: "Which header is needed to send JSON in a POST request body?", options: ["A) Accept: application/json", "B) Content-Type: application/json", "C) Authorization: Bearer", "D) X-Requested-With: XMLHttpRequest"], answer: "B) Content-Type: application/json" },
    { question: "Optimistic updates mean?", options: ["A) Waiting for the server before updating UI", "B) Updating the UI immediately before the server confirms", "C) Caching responses permanently", "D) Skipping error handling"], answer: "B) Updating the UI immediately before the server confirms" },
    { question: "SWR stands for?", options: ["A) Server Web Routing", "B) Stale-While-Revalidate", "C) State With Reducer", "D) Sync With React"], answer: "B) Stale-While-Revalidate" },
  ],

  testing: [
    { question: "Which testing library is most commonly paired with React?", options: ["A) Enzyme", "B) React Testing Library", "C) Mocha", "D) Jasmine"], answer: "B) React Testing Library" },
    { question: "What is the guiding principle of React Testing Library?", options: ["A) Test implementation details", "B) Test the way users interact with the UI", "C) Test only state changes", "D) Test only unit functions"], answer: "B) Test the way users interact with the UI" },
    { question: "Which function renders a component for testing in RTL?", options: ["A) mount()", "B) render()", "C) shallow()", "D) create()"], answer: "B) render()" },
    { question: "screen.getByText() throws if?", options: ["A) The element is hidden", "B) The element is not found in the DOM", "C) There are multiple matches", "D) Both B and C"], answer: "D) Both B and C" },
    { question: "Which query is best for accessible elements like buttons and inputs?", options: ["A) getByTestId", "B) getByRole", "C) getByClassName", "D) getByIndex"], answer: "B) getByRole" },
    { question: "Jest is used in React projects as a?", options: ["A) Component library", "B) Test runner and assertion library", "C) Bundler", "D) Linter"], answer: "B) Test runner and assertion library" },
    { question: "userEvent.click() simulates?", options: ["A) A real browser click with all pointer events", "B) Only the click event with no pointer events", "C) A keyboard press", "D) A form submit"], answer: "A) A real browser click with all pointer events" },
    { question: "What does fireEvent differ from userEvent in?", options: ["A) fireEvent is more realistic", "B) fireEvent dispatches a single event; userEvent simulates full interactions", "C) fireEvent only works with inputs", "D) They are identical"], answer: "B) fireEvent dispatches a single event; userEvent simulates full interactions" },
    { question: "Mocking a module in Jest is done with?", options: ["A) jest.spy()", "B) jest.mock('module-name')", "C) jest.replace()", "D) jest.fake()"], answer: "B) jest.mock('module-name')" },
    { question: "waitFor() in RTL is used to?", options: ["A) Delay the test by a set time", "B) Wait for async DOM changes or assertions to pass", "C) Skip flaky tests", "D) Mock timers"], answer: "B) Wait for async DOM changes or assertions to pass" },
    { question: "What is a snapshot test?", options: ["A) A screenshot comparison test", "B) A test that serializes rendered output and compares to a saved snapshot", "C) A performance benchmark", "D) A visual regression test"], answer: "B) A test that serializes rendered output and compares to a saved snapshot" },
    { question: "Which query should you prefer over getByTestId?", options: ["A) getByIndex", "B) getByRole or getByLabelText (more accessible queries)", "C) getByClassName", "D) getBySelector"], answer: "B) getByRole or getByLabelText (more accessible queries)" },
    { question: "To test a custom hook in isolation, use?", options: ["A) render() with a wrapper", "B) renderHook() from RTL", "C) jest.mock()", "D) act() only"], answer: "B) renderHook() from RTL" },
    { question: "act() is used in React tests to?", options: ["A) Mock API calls", "B) Ensure state updates and effects are processed before assertions", "C) Snapshot components", "D) Simulate network errors"], answer: "B) Ensure state updates and effects are processed before assertions" },
    { question: "End-to-end (E2E) testing in React is commonly done with?", options: ["A) Jest alone", "B) Cypress or Playwright", "C) React Testing Library", "D) Enzyme"], answer: "B) Cypress or Playwright" },
  ],
};

const TOPICS = [
  { id: 'bst',          label: 'Binary Search Tree', group: 'ds' },
  { id: 'avl',          label: 'AVL Tree',            group: 'ds' },
  { id: 'segment',      label: 'Segment Tree',        group: 'ds' },
  { id: 'fenwick',      label: 'Fenwick Tree',        group: 'ds' },
  { id: 'prims',        label: "Prim's Algorithm",    group: 'ds' },
  { id: 'kruskals',     label: "Kruskal's Algorithm", group: 'ds' },
  { id: 'react_basics', label: 'React Basics',        group: 'react' },
  { id: 'props',        label: 'Props',               group: 'react' },
  { id: 'hooks',        label: 'Hooks',               group: 'react' },
  { id: 'routing',      label: 'Routing',             group: 'react' },
  { id: 'api_fetch',    label: 'API & Fetch',         group: 'react' },
  { id: 'testing',      label: 'Testing',             group: 'react' },
];

const TOTAL_TIME = 90;

function fetchQuestions(topicId) {
  const bank = QUESTION_BANK[topicId];
  return [...bank].sort(() => Math.random() - 0.5).slice(0, 15);
}

export default function ContestArena({ onQuit }) {
  const { partner, addRewards } = useStudy();

  const [phase, setPhase] = useState('lobby');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentQ, setCurrentQ] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [startTime, setStartTime] = useState(null);

  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState([]);

  const timerRef = useRef(null);
  const rivalRef = useRef(null);

  useEffect(() => {
    if (phase !== 'active') return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { endMatch(); return 0; }
        return prev - 1;
      });
    }, 1000);

    rivalRef.current = setInterval(() => {
      setRivalScore(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(rivalRef.current);
    };
  }, [phase]);

  const endMatch = () => {
    clearInterval(timerRef.current);
    clearInterval(rivalRef.current);
    setPhase('ended');
  };

  const startContest = () => {
    if (!selectedTopic) return;
    const qs = fetchQuestions(selectedTopic.id);
    setQuestions(qs);
    setUserScore(0);
    setRivalScore(0);
    setTimeLeft(TOTAL_TIME);
    setCurrentQ(0);
    setResults([]);
    setSelected(null);
    setRevealed(false);
    setStartTime(Date.now());
    setPhase('active');
  };

  const handleSelect = (option) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);

    const correct = option === questions[currentQ].answer;
    if (correct) setUserScore(prev => prev + 10);

    setResults(prev => [...prev, {
      question: questions[currentQ].question,
      selected: option,
      answer: questions[currentQ].answer,
      correct,
    }]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) { endMatch(); return; }
    setCurrentQ(prev => prev + 1);
    setSelected(null);
    setRevealed(false);
  };

  const timerColor = timeLeft <= 20 ? '#ef4444' : timeLeft <= 45 ? '#eab308' : '#22c55e';
  const timeTaken = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
  const correctCount = results.filter(r => r.correct).length;
  const incorrectCount = results.filter(r => !r.correct).length;
  const pct = results.length ? Math.round((correctCount / results.length) * 100) : 0;

  const dsTopics    = TOPICS.filter(t => t.group === 'ds');
  const reactTopics = TOPICS.filter(t => t.group === 'react');

  // ── LOBBY ────────────────────────────────────────────────
  if (phase === 'lobby') return (
    <div className="max-w-2xl animate-fade-in" style={{ padding: '0 1rem', margin: '0 auto' }}>
      <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Contest Arena</h2>
      <p className="text-muted text-sm" style={{ marginBottom: '1.5rem' }}>
        Select a topic — 15 questions, 90 seconds, compete against {partner?.name || 'a rival'}.
      </p>

      <p className="ca-group-label">Data Structures & Algorithms</p>
      <div className="ca-topic-grid" style={{ marginBottom: '1.25rem' }}>
        {dsTopics.map(t => (
          <button
            key={t.id}
            className={`ca-topic-btn ${selectedTopic?.id === t.id ? 'ca-topic-btn--active' : ''}`}
            onClick={() => setSelectedTopic(t)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="ca-group-label">React</p>
      <div className="ca-topic-grid" style={{ marginBottom: '1.5rem' }}>
        {reactTopics.map(t => (
          <button
            key={t.id}
            className={`ca-topic-btn ca-topic-btn--react ${selectedTopic?.id === t.id ? 'ca-topic-btn--active' : ''}`}
            onClick={() => setSelectedTopic(t)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <button
        className="btn-primary w-full"
        style={{ padding: '0.9rem', opacity: selectedTopic ? 1 : 0.5 }}
        onClick={startContest}
        disabled={!selectedTopic}
      >
        Start Contest →
      </button>
    </div>
  );

  // ── ACTIVE ───────────────────────────────────────────────
  if (phase === 'active') {
    const q = questions[currentQ];
    return (
      <div className="max-w-2xl animate-fade-in" style={{ padding: '0 1rem', margin: '0 auto' }}>

        <div className="ca-header">
          <div className="ca-score-pill ca-score-pill--user">You: {userScore}pts</div>
          <div className="ca-timer" style={{ color: timerColor, borderColor: timerColor }}>
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          <div className="ca-score-pill ca-score-pill--rival">Rival: {rivalScore}pts</div>
        </div>

        <div className="progress-bar-container" style={{ margin: '0.75rem 0' }}>
          <div className="progress-bar-fill" style={{ width: `${(currentQ / questions.length) * 100}%` }} />
        </div>
        <p className="text-muted text-xs" style={{ textAlign: 'right', marginBottom: '1rem' }}>
          Q{currentQ + 1} / {questions.length} · {selectedTopic.label}
        </p>

        <div className="ca-question-box">
          <p className="ca-question-text">{q.question}</p>
        </div>

        <div className="ca-options-grid">
          {q.options.map((opt, i) => {
            let cls = 'ca-option';
            if (revealed) {
              if (opt === q.answer)       cls += ' ca-option--correct';
              else if (opt === selected)  cls += ' ca-option--wrong';
              else                        cls += ' ca-option--dim';
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={revealed}>
                {opt}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
            {selected === q.answer
              ? <div className="ca-feedback ca-feedback--correct">✓ Correct! +10 points</div>
              : <div className="ca-feedback ca-feedback--wrong">
                  ✗ Wrong. Correct answer: <strong>{q.answer}</strong>
                </div>
            }
            <button className="btn-primary w-full" style={{ marginTop: '0.75rem' }} onClick={handleNext}>
              {currentQ + 1 < questions.length ? 'Next Question →' : 'Finish & See Results'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────
  if (phase === 'ended') {
    const won = userScore > rivalScore;
    const perfClass = pct === 100 ? 'qe-perf--perfect' : pct >= 75 ? 'qe-perf--good' : pct >= 50 ? 'qe-perf--average' : 'qe-perf--low';

    return (
      <div className="max-w-2xl animate-fade-in" style={{ padding: '0 1rem', margin: '0 auto' }}>

        <div className={`qe-score-banner ${won ? 'qe-perf--perfect' : 'qe-perf--low'}`} style={{ marginBottom: '1rem' }}>
          <h2 className="qe-score-title">{won ? '🏆 Victory!' : '💀 Defeated'}</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {won ? `You outscored ${partner?.name || 'the rival'}!` : `${partner?.name || 'The rival'} won this round.`}
          </p>
          <div className="ca-final-scores">
            <span className="ca-final-score ca-final-score--user">You: {userScore}</span>
            <span style={{ color: '#475569' }}>vs</span>
            <span className="ca-final-score ca-final-score--rival">Rival: {rivalScore}</span>
          </div>
        </div>

        <div className="ca-stats-row">
          <div className="ca-stat-box">
            <span className="ca-stat-value" style={{ color: '#22c55e' }}>{correctCount}</span>
            <span className="ca-stat-label">Correct</span>
          </div>
          <div className="ca-stat-box">
            <span className="ca-stat-value" style={{ color: '#ef4444' }}>{incorrectCount}</span>
            <span className="ca-stat-label">Wrong</span>
          </div>
          <div className="ca-stat-box">
            <span className="ca-stat-value" style={{ color: '#6366f1' }}>{pct}%</span>
            <span className="ca-stat-label">Accuracy</span>
          </div>
          <div className="ca-stat-box">
            <span className="ca-stat-value" style={{ color: '#f59e0b' }}>{timeTaken}s</span>
            <span className="ca-stat-label">Time Taken</span>
          </div>
        </div>

        <div className="qe-tip-box" style={{ margin: '1.25rem 0' }}>
          <span className="qe-tip-icon">💡</span>
          <p>
            {pct === 100 && 'Flawless! Try a harder topic next time.'}
            {pct >= 75 && pct < 100 && 'Strong performance! Review the missed questions below to close the gaps.'}
            {pct >= 50 && pct < 75 && 'Halfway there. Focus on the incorrect answers and revisit the topic concepts.'}
            {pct < 50 && `Revisit ${selectedTopic.label} fundamentals before the next contest.`}
          </p>
        </div>

        <h3 className="qe-section-heading">Question Breakdown</h3>
        <div className="qe-breakdown-list" style={{ marginBottom: '1.5rem' }}>
          {results.map((r, i) => (
            <div key={i} className={`qe-breakdown-item ${r.correct ? 'qe-breakdown--correct' : 'qe-breakdown--wrong'}`}>
              <div className="qe-breakdown-header">
                <span className="qe-breakdown-keyword" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                  Q{i + 1}. {r.question}
                </span>
                <span className={`qe-breakdown-badge ${r.correct ? 'badge--correct' : 'badge--wrong'}`}>
                  {r.correct ? '✓' : '✗'}
                </span>
              </div>
              {!r.correct && (
                <div className="qe-breakdown-answers" style={{ marginTop: '0.4rem' }}>
                  <div className="qe-answer-row">
                    <span className="qe-answer-label">Your answer:</span>
                    <span className="qe-answer-text qe-answer--wrong">{r.selected}</span>
                  </div>
                  <div className="qe-answer-row">
                    <span className="qe-answer-label">Correct answer:</span>
                    <span className="qe-answer-text qe-answer--correct">{r.answer}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-primary w-full" onClick={() => { setPhase('lobby'); setSelectedTopic(null); }}>
            Try Another Topic
          </button>
          <button
            className="btn-primary w-full"
            style={{ background: 'transparent', border: '1px solid #334155', color: '#94a3b8' }}
            onClick={onQuit}
          >
            Exit Arena
          </button>
        </div>
      </div>
    );
  }
}