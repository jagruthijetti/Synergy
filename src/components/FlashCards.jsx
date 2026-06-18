import React, { useState } from 'react';

const conceptData = {
  bst: {
    label: 'Binary Search Tree',
    color: 'card-primary',
    accent: 'text-primary',
    border: 'border-primary',
    points: [
      { title: 'BST Property', body: 'Left subtree contains nodes with keys less than the root; right subtree contains nodes with keys greater than the root. This holds recursively for every subtree.' },
      { title: 'Search – O(h)', body: 'Compare target with current node. Go left if smaller, right if larger. Average O(log n); degrades to O(n) for a skewed tree.' },
      { title: 'Insertion – O(h)', body: 'Follow search path until a null slot is found. Insert the new node there. Does not rebalance.' },
      { title: 'Deletion – O(h)', body: 'Three cases: leaf (remove directly), one child (bypass node), two children (replace with in-order successor or predecessor then delete that node).' },
      { title: 'In-order Traversal', body: 'Visits nodes in ascending sorted order. Useful to verify BST correctness or extract sorted output in O(n).' },
      { title: 'Height & Balance', body: 'Height h = log₂n for a balanced tree. An unbalanced BST built from sorted input degenerates into a linked list with O(n) operations.' },
      { title: 'Predecessor / Successor', body: 'In-order predecessor: rightmost node of left subtree. In-order successor: leftmost node of right subtree.' },
      { title: 'Space Complexity', body: 'O(n) space for n nodes. Recursive calls use O(h) stack space — O(log n) balanced, O(n) worst case.' },
      { title: 'Floor & Ceiling', body: 'Floor(k): largest key ≤ k. Ceiling(k): smallest key ≥ k. Both solvable in O(h) using BST property.' },
      { title: 'Common Pitfall', body: 'Repeated insertion of sorted data creates a skewed tree. Use AVL or Red-Black trees when balance is required.' },
      { title: 'Rank & Select', body: 'Rank(k): count of nodes with key < k. Select(r): node with rank r. Both O(h) if each node stores its subtree size.' },
      { title: 'Pre/Post-order Uses', body: 'Pre-order serializes the tree for reconstruction. Post-order is used to delete a tree safely (children before parent).' },
    ],
  },
  avl: {
    label: 'AVL Tree',
    color: 'card-yellow',
    accent: 'text-yellow',
    border: 'border-yellow',
    points: [
      { title: 'Balance Factor', body: 'BF = height(left) − height(right). An AVL node is balanced when BF ∈ {−1, 0, 1}. Any other value triggers a rotation.' },
      { title: 'Height Guarantee', body: 'AVL trees maintain O(log n) height strictly. For n nodes, height ≤ 1.44 log₂(n+2) − 0.328.' },
      { title: 'Right Rotation (LL Case)', body: 'Applied when the left child is left-heavy. The left child becomes the new root; original root becomes its right child.' },
      { title: 'Left Rotation (RR Case)', body: 'Applied when the right child is right-heavy. The right child becomes the new root; original root becomes its left child.' },
      { title: 'Left-Right Rotation (LR Case)', body: 'Left rotate the left child first, then right rotate the unbalanced node. Fixes left child that is right-heavy.' },
      { title: 'Right-Left Rotation (RL Case)', body: 'Right rotate the right child first, then left rotate the unbalanced node. Fixes right child that is left-heavy.' },
      { title: 'Insertion – O(log n)', body: 'Insert like a BST, then walk up updating heights and balance factors. At most one rotation (single or double) is needed.' },
      { title: 'Deletion – O(log n)', body: 'Delete like a BST, then rebalance upward. Deletion may require O(log n) rotations propagating up to the root.' },
      { title: 'Height Update', body: 'After any structural change, update height: h(node) = 1 + max(h(left), h(right)). Always update bottom-up.' },
      { title: 'vs Red-Black Tree', body: 'AVL trees are more strictly balanced (faster lookups); Red-Black trees allow looser balance (fewer rotations on insert/delete, better for write-heavy workloads).' },
      { title: 'Minimum Nodes', body: 'N(h) = N(h−1) + N(h−2) + 1. The minimum node count at height h follows a Fibonacci-like recurrence.' },
      { title: 'Applications', body: 'Used in databases and memory allocators where lookup speed is critical and insertions/deletions are less frequent than searches.' },
    ],
  },
  segment: {
    label: 'Segment Tree',
    color: 'card-orange',
    accent: 'text-orange',
    border: 'border-orange',
    points: [
      { title: 'Core Idea', body: 'A binary tree where each node stores an aggregate (sum, min, max, GCD, etc.) over a contiguous array range. Root covers the entire array.' },
      { title: 'Build – O(n)', body: 'Recursively split the range in half. Leaf nodes hold individual elements. Internal nodes merge children using the chosen operation.' },
      { title: 'Point Query – O(log n)', body: 'Navigate to the leaf covering the target index. Return its stored value. All ancestors are traversed.' },
      { title: 'Range Query – O(log n)', body: 'Decompose the query range into O(log n) disjoint segments stored in the tree. Combine their results bottom-up.' },
      { title: 'Point Update – O(log n)', body: 'Update the leaf and recompute all ancestors on the path to root. Only O(log n) nodes are touched.' },
      { title: 'Lazy Propagation', body: 'Defer range updates using a lazy tag. Push the tag down only when a node\'s children must be accessed. Enables range updates in O(log n).' },
      { title: 'Memory', body: 'Standard segment tree needs 4n nodes of storage. Index the tree in a 1-based array; node i has children 2i and 2i+1.' },
      { title: 'Persistent Segment Tree', body: 'Create a new version root on each update, sharing unmodified branches. Supports historical queries in O(log n) with O(n log n) total space.' },
      { title: 'Merge Sort Tree', body: 'Each segment tree node stores a sorted list of its range. Enables kth smallest in range queries in O(log² n) time.' },
      { title: 'Applications', body: 'Range sum/min/max, count of elements in range, range GCD/LCM, range XOR, 2D segment trees for matrix queries.' },
      { title: 'Iterative Segment Tree', body: 'Bottom-up iterative implementation avoids recursion overhead. Build in O(n), query/update in O(log n) with smaller constants.' },
      { title: 'Segment Tree Beats', body: 'Supports "break if" and "tag if" conditions to handle complex range operations like range chmin/chmax in amortized O(n log² n).' },
    ],
  },
  fenwick: {
    label: 'Fenwick Tree',
    color: 'card-cyan',
    accent: 'text-cyan',
    border: 'border-cyan',
    points: [
      { title: 'Also Called BIT', body: 'Binary Indexed Tree (BIT). Uses an implicit tree structure encoded in a flat array using binary representations of indices.' },
      { title: 'lowbit Trick', body: 'lowbit(i) = i & (−i) extracts the lowest set bit of i. This defines how far each index "reaches" in the implicit tree.' },
      { title: 'Prefix Sum Query – O(log n)', body: 'Sum from 1 to i: start at i, add BIT[i], then move to i − lowbit(i). Repeat until i = 0. Touches O(log n) nodes.' },
      { title: 'Point Update – O(log n)', body: 'Add delta at index i: update BIT[i], then move to i + lowbit(i). Propagates up the implicit tree.' },
      { title: 'Range Query', body: 'Range sum [l, r] = prefix(r) − prefix(l−1). Two prefix queries, O(log n) total.' },
      { title: 'Range Update + Point Query', body: 'Maintain difference array in BIT. Add delta to range [l, r] via update(l, +delta) and update(r+1, −delta).' },
      { title: 'Range Update + Range Query', body: 'Use two BITs simultaneously (B1 and B2) to support both operations in O(log n) using the identity expansion of prefix sums.' },
      { title: 'Build – O(n)', body: 'Naive build via n updates is O(n log n). Optimal O(n) build: for each i, propagate directly to i + lowbit(i).' },
      { title: 'Space & Simplicity', body: 'O(n) space, minimal code (≈10 lines per operation). Much lower constant than segment tree. Preferred for 1D prefix-sum problems.' },
      { title: 'Limitations', body: 'Supports only invertible operations (sum, XOR). Cannot do range min/max efficiently. For those, use a segment tree with lazy propagation.' },
      { title: '2D Fenwick Tree', body: 'Extend to 2D by nesting BIT updates: update(x, y) and query(x, y) both run in O(log n · log m) for an n×m grid.' },
      { title: 'Order Statistics', body: 'A BIT over value-indexed array enables finding kth smallest element in O(log² n) using binary lifting on the BIT.' },
    ],
  },
  prims: {
    label: "Prim's Algorithm",
    color: 'card-success',
    accent: 'text-success',
    border: 'border-success',
    points: [
      { title: 'Goal', body: 'Finds the Minimum Spanning Tree (MST) of a weighted undirected connected graph — a spanning subgraph with minimum total edge weight and no cycles.' },
      { title: 'Core Strategy', body: "Greedy, vertex-based. Grow the MST one vertex at a time by always adding the cheapest edge that connects a visited vertex to an unvisited one." },
      { title: 'Min-Heap Complexity', body: 'O((V + E) log V) with a binary min-heap (or priority queue). Use adjacency list representation.' },
      { title: 'Dense Graph Variant', body: 'O(V²) with simple array-based key tracking and no heap. Preferred when E ≈ V² (dense graphs).' },
      { title: 'Key Array', body: 'key[v] = minimum edge weight to connect v to the current MST. Updated as new vertices are added.' },
      { title: 'Parent Array', body: 'parent[v] tracks which MST vertex v is connected through. Reconstruct the MST edges from this array at the end.' },
      { title: 'In MST Set', body: 'A boolean inMST[] marks vertices already added. Extract the vertex with minimum key not yet in MST at each step.' },
      { title: 'Correctness', body: "Follows from the Cut Property: at any cut of the graph, the minimum crossing edge is safe to add to the MST. Prim's always picks such an edge." },
      { title: 'vs Kruskal\'s', body: "Prim's is better for dense graphs; Kruskal's is better for sparse graphs. Both produce a valid MST but traverse the graph differently." },
      { title: 'Disconnected Graphs', body: "Prim's only works on connected graphs. Run it from each unvisited vertex to build a Minimum Spanning Forest for disconnected graphs." },
      { title: 'Fibonacci Heap Variant', body: "Using a Fibonacci heap, Prim's runs in O(E + V log V) — optimal for dense graphs but complex to implement in practice." },
      { title: 'MST Uniqueness', body: 'The MST is unique if all edge weights are distinct. If weights can repeat, multiple valid MSTs may exist but all have the same total weight.' },
    ],
  },
  kruskals: {
    label: "Kruskal's Algorithm",
    color: 'card-purple',
    accent: 'text-purple',
    border: 'border-purple',
    points: [
      { title: 'Goal', body: 'Finds the MST by greedily selecting the globally cheapest edge that does not form a cycle, until V−1 edges are chosen.' },
      { title: 'Time Complexity', body: 'O(E log E) dominated by sorting edges. Union-Find operations are nearly O(E α(V)) which is effectively O(E).' },
      { title: 'Edge-Based Approach', body: 'Sort all E edges by weight. Process them in order — add an edge if its endpoints belong to different components.' },
      { title: 'Union-Find (DSU)', body: 'Disjoint Set Union detects cycles in O(α(n)) per operation using path compression and union by rank/size. α(n) is the inverse Ackermann function.' },
      { title: 'Path Compression', body: 'During find(), make every node on the path point directly to the root. Flattens the tree for future queries.' },
      { title: 'Union by Rank', body: 'Attach the shorter tree under the taller one during union(). Prevents the DSU tree from becoming a long chain.' },
      { title: 'Cycle Detection', body: 'An edge (u, v) forms a cycle if and only if find(u) == find(v) — both endpoints are already in the same component.' },
      { title: 'Correctness', body: "Follows from the Cycle Property: the maximum weight edge in any cycle is never in the MST. Kruskal's never picks such an edge." },
      { title: 'Disconnected Graphs', body: "Kruskal's naturally handles disconnected graphs — it produces a Minimum Spanning Forest, one MST per connected component." },
      { title: 'vs Prim\'s', body: "Kruskal's sorts globally and is better for sparse graphs. Prim's grows locally from a vertex and is better for dense graphs with adjacency matrix representation." },
      { title: 'Borůvka Comparison', body: "Borůvka's algorithm is a parallelizable MST alternative. It finds the cheapest edge from each component simultaneously, running in O(E log V)." },
      { title: 'Maximum Spanning Tree', body: 'To find the Maximum Spanning Tree, sort edges in descending order and apply the same Kruskal logic. Useful in network reliability problems.' },
    ],
  },
  react_basics: {
    label: 'React Basics',
    color: 'card-cyan',
    accent: 'text-cyan',
    border: 'border-cyan',
    points: [
      { title: 'What is React?', body: 'A JavaScript library for building user interfaces using a component-based architecture. React manages the UI layer only — routing, state management, and data fetching are handled by external libraries.' },
      { title: 'JSX', body: 'JavaScript XML — a syntax extension that lets you write HTML-like markup inside JavaScript. JSX compiles to React.createElement() calls. Expressions go inside {}.' },
      { title: 'Virtual DOM', body: 'React maintains a lightweight in-memory copy of the real DOM. On state change, it diffs the new virtual DOM with the previous one and applies only the minimum required changes to the real DOM.' },
      { title: 'Functional Components', body: 'Plain JavaScript functions that return JSX. They are the standard way to write React components since hooks were introduced in React 16.8.' },
      { title: 'Class Components', body: 'ES6 classes extending React.Component. They have lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount). Largely replaced by functional components + hooks.' },
      { title: 'Rendering', body: 'React renders components by calling ReactDOM.createRoot(container).render(<App />). Re-renders happen when state or props change. React batches multiple state updates for performance.' },
      { title: 'Keys in Lists', body: 'Keys help React identify which items in a list changed. Use stable unique IDs, not array indices. Wrong keys cause subtle rendering bugs.' },
      { title: 'Conditional Rendering', body: 'Use &&, ternary operators, or if/else outside JSX. Example: {isLoggedIn && <Dashboard />} renders Dashboard only when isLoggedIn is true.' },
      { title: 'Fragments', body: 'React.Fragment (or shorthand <>) lets you return multiple elements without adding an extra DOM node. Avoids unnecessary wrapper divs.' },
      { title: 'StrictMode', body: '<React.StrictMode> intentionally double-invokes render functions and effects in development to surface side effects. Has no effect in production builds.' },
      { title: 'Event Handling', body: 'React uses camelCase event names (onClick, onChange). Pass a function reference, not a call: onClick={handleClick}, not onClick={handleClick()}.' },
      { title: 'Reconciliation', body: "React's diffing algorithm compares element type first. If types differ, the whole subtree is torn down and rebuilt. Same type updates only changed attributes." },
    ],
  },
  react_props: {
    label: 'Props & State',
    color: 'card-primary',
    accent: 'text-primary',
    border: 'border-primary',
    points: [
      { title: 'Props', body: 'Short for properties. Read-only data passed from parent to child. A child component must never modify its own props — they flow one way, top-down.' },
      { title: 'State', body: 'Local mutable data managed inside a component via useState. When state changes, React re-renders the component and its children.' },
      { title: 'useState Hook', body: 'const [value, setValue] = useState(initialValue). setValue triggers a re-render. Pass a function to setValue for updates based on previous state: setValue(prev => prev + 1).' },
      { title: 'Props vs State', body: 'Props come from outside (parent-controlled). State lives inside (component-controlled). A piece of data should live in state only if it changes over time and affects rendering.' },
      { title: 'Lifting State Up', body: 'When two sibling components share data, move state to their closest common ancestor and pass it down as props. This is the standard React data-sharing pattern.' },
      { title: 'Prop Drilling', body: 'Passing props through many intermediate components that do not use them. Solved with Context API or state management libraries like Redux or Zustand.' },
      { title: 'Default Props', body: 'Provide fallback values: function Button({ label = "Click" }) {}. Prevents undefined errors when a prop is not passed by the parent.' },
      { title: 'Children Prop', body: 'props.children contains whatever is placed between a component\'s opening and closing tags. Enables wrapper/layout components like <Card><p>content</p></Card>.' },
      { title: 'Controlled Components', body: 'Form elements whose value is driven by React state. onChange updates state; state drives the input value. Gives React full control over form data.' },
      { title: 'Uncontrolled Components', body: 'Form elements that store their own state in the DOM. Access values via refs (useRef). Useful for file inputs or integrating with non-React libraries.' },
      { title: 'Derived State', body: 'Values computed from existing state or props on every render. Do not store them in state — just compute them inline. Avoids stale or redundant state.' },
      { title: 'Immutability', body: 'Never mutate state directly (e.g., arr.push()). Always create new objects/arrays: setItems([...items, newItem]). React uses reference equality to detect changes.' },
    ],
  },
  react_hooks: {
    label: 'Hooks',
    color: 'card-yellow',
    accent: 'text-yellow',
    border: 'border-yellow',
    points: [
      { title: 'Rules of Hooks', body: 'Only call hooks at the top level — never inside loops, conditions, or nested functions. Only call hooks from React functional components or custom hooks.' },
      { title: 'useEffect', body: 'Runs side effects after render. Accepts a callback and a dependency array. Runs after every render if no deps, once on mount if deps=[], or when listed deps change.' },
      { title: 'Cleanup in useEffect', body: 'Return a function from useEffect to clean up: clear timers, cancel subscriptions, abort fetch. React calls the cleanup before the next effect and on unmount.' },
      { title: 'useRef', body: 'Returns a mutable object {current: value} that persists across renders without triggering re-renders. Used for DOM access and storing mutable values like timers.' },
      { title: 'useContext', body: 'Subscribes a component to a React context. Returns the current context value. Re-renders when context value changes. Avoids prop drilling.' },
      { title: 'useReducer', body: 'Alternative to useState for complex state logic. Accepts (state, action) => newState reducer. Dispatch actions to trigger transitions. Inspired by Redux.' },
      { title: 'useMemo', body: 'Memoizes an expensive computed value. Recomputes only when dependencies change. Use when a calculation is slow and called on every render.' },
      { title: 'useCallback', body: 'Memoizes a function reference. Prevents child components from re-rendering unnecessarily when a callback prop is stable across renders.' },
      { title: 'useLayoutEffect', body: 'Like useEffect but fires synchronously after DOM mutations and before the browser paints. Use for measuring DOM elements or synchronous DOM updates.' },
      { title: 'Custom Hooks', body: 'Functions starting with "use" that call other hooks. Encapsulate and reuse stateful logic across components without changing component hierarchy.' },
      { title: 'useId', body: 'Generates a stable, unique ID per component instance. Use for linking form labels to inputs accessibly. Do not use for list keys — IDs are not tied to data.' },
      { title: 'useTransition', body: 'Marks a state update as non-urgent. const [isPending, startTransition] = useTransition(). Wrap slow updates in startTransition() to keep the UI responsive during heavy re-renders.' },
    ],
  },
  react_routing: {
    label: 'Routing',
    color: 'card-orange',
    accent: 'text-orange',
    border: 'border-orange',
    points: [
      { title: 'React Router', body: 'The standard routing library for React. v6 uses <BrowserRouter>, <Routes>, and <Route> components. Declarative — routes are just components in your JSX tree.' },
      { title: 'BrowserRouter vs HashRouter', body: 'BrowserRouter uses the HTML5 History API (clean URLs like /about). HashRouter uses the URL hash (#/about) and works without server configuration.' },
      { title: 'Route Definition', body: '<Route path="/about" element={<About />} /> maps a URL path to a component. Wrap multiple routes in <Routes> — only the first matching route renders.' },
      { title: 'useNavigate', body: 'Programmatic navigation hook. const navigate = useNavigate(). Call navigate("/path") to redirect. Pass -1 to go back. Replaces the old useHistory hook.' },
      { title: 'useParams', body: 'Extracts dynamic route parameters. For route path="/user/:id", useParams() returns { id: "42" }. Use for detail pages driven by URL segments.' },
      { title: 'useLocation', body: 'Returns the current location object with pathname, search, hash, and state. Useful for reading query strings or tracking page changes for analytics.' },
      { title: 'Link vs NavLink', body: '<Link to="/path"> prevents full page reload. <NavLink> adds an active class/style when the route matches. Use NavLink for navigation menus.' },
      { title: 'Nested Routes', body: 'Define child <Route> elements inside a parent route. Use <Outlet /> in the parent component to render the matched child. Enables shared layouts.' },
      { title: 'Index Routes', body: '<Route index element={<Home />} /> renders when the parent route matches exactly, with no child segment. Acts as the default child of a nested route.' },
      { title: 'Protected Routes', body: 'Wrap private routes in a component that checks auth state. Redirect to /login using <Navigate to="/login" /> if unauthenticated. Standard pattern for auth flows.' },
      { title: 'Lazy Loading Routes', body: 'Use React.lazy() and <Suspense> to code-split routes. Each route bundle loads only when first visited, reducing initial bundle size.' },
      { title: 'Search Params', body: 'useSearchParams() reads and sets query string parameters (?sort=asc). Returns [searchParams, setSearchParams] — similar API to useState.' },
    ],
  },
  react_fetch: {
    label: 'API & Data Fetching',
    color: 'card-success',
    accent: 'text-success',
    border: 'border-success',
    points: [
      { title: 'Fetching in useEffect', body: 'Call fetch() inside useEffect with an empty dependency array to run once on mount. Update state with the response. Always handle loading and error states.' },
      { title: 'Cleanup & Abort', body: 'Use AbortController to cancel in-flight requests on unmount. Pass signal to fetch(url, { signal }). Call controller.abort() in the useEffect cleanup function.' },
      { title: 'Loading & Error States', body: 'Always track three states: loading (show spinner), error (show message), and data (show content). Initialize: const [data, setData] = useState(null).' },
      { title: 'Async/Await Pattern', body: 'Define an async function inside useEffect and call it immediately. Do not make the useEffect callback itself async — it must return a cleanup function or nothing.' },
      { title: 'Axios vs Fetch', body: 'Axios automatically parses JSON, handles errors for non-2xx status codes, and supports interceptors. Fetch requires manual .json() parsing and does not throw on 4xx/5xx.' },
      { title: 'Custom useFetch Hook', body: 'Extract fetch logic into a reusable hook returning { data, loading, error }. Accepts a URL and re-fetches when the URL changes via dependency array.' },
      { title: 'React Query', body: 'TanStack Query manages server state: caching, background refetching, pagination, and mutations. Replaces manual useEffect fetch patterns with useQuery and useMutation.' },
      { title: 'SWR', body: 'Vercel\'s data fetching library using stale-while-revalidate strategy. Returns cached data immediately, then revalidates in background. Simpler API than React Query.' },
      { title: 'Optimistic Updates', body: 'Update UI immediately before the server confirms. On error, roll back. Makes apps feel instant. Supported natively in React Query\'s useMutation.' },
      { title: 'Pagination & Infinite Scroll', body: 'Track current page in state. Fetch next page on button click or scroll event. React Query\'s useInfiniteQuery simplifies cursor-based pagination.' },
      { title: 'Environment Variables', body: 'Store API base URLs in .env as REACT_APP_API_URL (CRA) or VITE_API_URL (Vite). Never commit secrets — use server-side proxies for sensitive keys.' },
      { title: 'CORS', body: 'Cross-Origin Resource Sharing errors occur when the API server does not allow your frontend origin. Fix server-side with Access-Control-Allow-Origin headers or proxy in dev via vite.config.js.' },
    ],
  },
  react_testing: {
    label: 'Testing',
    color: 'card-purple',
    accent: 'text-purple',
    border: 'border-purple',
    points: [
      { title: 'Testing Library', body: 'React Testing Library (RTL) renders components into a real DOM (via jsdom) and queries elements the way users do — by text, role, label. Avoids testing implementation details.' },
      { title: 'Jest', body: 'The default test runner for React apps. Provides test(), expect(), describe(), beforeEach(), and mocking utilities. Runs in Node.js with jsdom simulating the browser.' },
      { title: 'render()', body: 'RTL\'s render(<Component />) mounts the component into a virtual DOM. Returns queries like getByText, getByRole, queryByTestId to find elements.' },
      { title: 'Queries Priority', body: 'RTL query priority: getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId. Role-based queries best reflect accessibility and user experience.' },
      { title: 'get vs query vs find', body: 'getBy throws if not found (synchronous). queryBy returns null if not found — use for asserting absence. findBy returns a promise — use for async elements.' },
      { title: 'userEvent', body: '@testing-library/user-event simulates real user interactions (type, click, tab). Preferred over fireEvent which directly dispatches DOM events without browser-like behavior.' },
      { title: 'Mocking Modules', body: 'jest.mock("./module") replaces a module with an auto-mock. jest.fn() creates mock functions. mockReturnValue() and mockResolvedValue() control return values.' },
      { title: 'Mocking fetch', body: 'Use jest.spyOn(global, "fetch").mockResolvedValue({ json: () => Promise.resolve(data) }) or libraries like msw (Mock Service Worker) for realistic API mocking.' },
      { title: 'waitFor & async tests', body: 'Wrap assertions in waitFor(() => expect(...)) when testing async state changes. RTL re-runs the callback until it passes or times out.' },
      { title: 'act()', body: 'Wrap code that causes state updates in act() to ensure React processes updates before assertions. RTL\'s render and userEvent wrap act() automatically in most cases.' },
      { title: 'Snapshot Testing', body: 'toMatchSnapshot() serializes rendered output to a file. Useful for detecting unintended UI changes. Overused snapshots become brittle — prefer behavioral assertions.' },
      { title: 'Coverage', body: 'Run jest --coverage to generate a report showing statements, branches, functions, and lines covered. Aim for meaningful coverage, not 100% — focus on critical paths.' },
    ],
  },
};

const conceptMeta = [
  { key: 'bst', icon: '🌲' },
  { key: 'avl', icon: '⚖️' },
  { key: 'segment', icon: '📊' },
  { key: 'fenwick', icon: '🔢' },
  { key: 'prims', icon: '🕸️' },
  { key: 'kruskals', icon: '🔗' },
  { key: 'react_basics',  icon: '⚛️' },
  { key: 'react_props',   icon: '🔄' },
  { key: 'react_hooks',   icon: '🪝' },
  { key: 'react_routing', icon: '🗺️' },
  { key: 'react_fetch',   icon: '🌐' },
  { key: 'react_testing', icon: '🧪' },
];

function FlipCard({ point, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flashcard-flip-container ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setFlipped(f => !f)}
      aria-label={`Card ${index + 1}: ${point.title}`}
    >
      <div className="flashcard-inner">
        {/* Front */}
        <div className="flashcard-face flashcard-front">
          <span className="flashcard-index">#{String(index + 1).padStart(2, '0')}</span>
          <p className="flashcard-term">{point.title}</p>
          <span className="flashcard-hint">tap to reveal</span>
        </div>
        {/* Back */}
        <div className="flashcard-face flashcard-back">
          <p className="flashcard-body">{point.body}</p>
        </div>
      </div>
    </div>
  );
}

export default function FlashCards() {
  const [selected, setSelected] = useState(null);

  const concept = selected ? conceptData[selected] : null;

  return (
    <div className="flashcards-root animate-fade-in">
      {/* Header */}
      <div className="flashcards-header">
        {selected && (
          <button
            className="flashcards-back-btn"
            onClick={() => setSelected(null)}
          >
            ← Back
          </button>
        )}
        <div>
          <h1 className="dashboard-title">
            {selected ? conceptData[selected].label : 'Flash Cards'}
          </h1>
          <p className="text-muted">
            {selected
              ? `${conceptData[selected].points.length} key concepts · tap a card to flip`
              : 'Select a concept to study its key points.'}
          </p>
        </div>
      </div>

      {/* Concept Picker Grid */}
      {!selected && (
        <div className="concepts-grid">
          {conceptMeta.map(({ key, icon }) => {
            const c = conceptData[key];
            return (
              <button
                key={key}
                className={`concept-tile ${c.border}`}
                onClick={() => setSelected(key)}
              >
                <span className="concept-tile-icon">{icon}</span>
                <span className={`concept-tile-label ${c.accent}`}>{c.label}</span>
                <span className="concept-tile-count">{c.points.length} cards</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Flash Card Grid */}
      {selected && concept && (
        <div className="flashcards-grid">
          {concept.points.map((point, i) => (
            <FlipCard key={i} point={point} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}