import { useState, useTransition } from "react";

export default function App() {
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0); // Tracks how many times the load button was clicked

  const loadItems = () => {
    setCount(prev => prev + 1);
    
    // Mark this expensive update as non-urgent
    startTransition(() => {
      // Simulate expensive data loading operation
      const newList = Array.from({ length: 5000 }, (_, i) => ({
        id: i,
        text: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
      }));
      
      setList(newList);
    });
  };

  return (
    <div style={styles.root}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.badge}>useTransition</div>
        <h1 style={styles.title}>Load Items on Click</h1>
        <p style={styles.subtitle}>
          Button stays responsive during <br/> expensive data loading
        </p>

        {/* Load Button */}
        <button 
          onClick={loadItems}
          disabled={isPending}
          style={{
            ...styles.loadBtn,
            opacity: isPending ? 0.6 : 1,
            cursor: isPending ? "not-allowed" : "pointer"
          }}
        >
          {isPending ? "⏳ Loading..." : "📦 Load 5,000 Items"}
        </button>

        {/* Stats */}
        <div style={styles.statsBox}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Loaded</span>
            <span style={styles.statValue}>{list.length}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Clicks</span>
            <span style={styles.statValue}>{count}</span>
          </div>
        </div>

        {/* Status */}
        <div style={styles.statusBox}>
          <span style={styles.statusLabel}>Status:</span>
          <span style={{
            ...styles.statusValue,
            color: isPending ? "#f59e0b" : "#10b981"
          }}>
            {isPending ? "⏳ Loading..." : list.length > 0 ? "✓ Loaded" : "⚪ Ready"}
          </span>
        </div>

        {/* Results */}
        <div style={styles.resultsBox}>
          <div style={styles.resultsHeader}>
            Items Preview ({list.length} total)
          </div>
          <div style={styles.listContainer}>
            {list.length === 0 ? (
              <p style={styles.emptyState}>Click the button to load items</p>
            ) : (
              list.slice(0, 30).map(item => (
                <div key={item.id} style={styles.listItem}>
                  <div style={styles.itemText}>{item.text}</div>
                  <div style={styles.itemDesc}>{item.description}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Explanation */}
        <div style={styles.codeBox}>
          <p style={styles.codeLine}>
            <span style={styles.codeKey}>isPending</span>
            <span style={styles.codeEq}> = </span>
            <span style={styles.codeVal}>{isPending.toString()}</span>
          </p>
          <p style={styles.codeLine}>
            <span style={styles.codeComment}>// Button stays clickable!</span>
          </p>
        </div>

        <p style={styles.note}>
          💡 <strong>useTransition</strong> keeps UI responsive while loading heavy data!
        </p>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdf4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "2rem",
  },
  card: {
    background: "#fff",
    borderRadius: "24px",
    padding: "2.5rem 2rem",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(99,102,241,0.15)",
  },
  badge: {
    display: "inline-block",
    background: "#eef2ff",
    color: "#6366f1",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "4px 14px",
    borderRadius: "999px",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.7rem",
    fontWeight: 800,
    color: "#1e1b4b",
    margin: "0 0 0.4rem",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    marginBottom: "1.8rem",
  },
  loadBtn: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    marginBottom: "1.5rem",
    transition: "transform 0.2s, opacity 0.2s",
  },
  statsBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "1rem",
    marginBottom: "1rem",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  statLabel: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  statValue: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#6366f1",
  },
  divider: {
    width: "1px",
    height: "40px",
    background: "#e2e8f0",
  },
  statusBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.8rem",
    background: "#f8fafc",
    borderRadius: "10px",
    marginBottom: "1.5rem",
  },
  statusLabel: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#64748b",
  },
  statusValue: {
    fontSize: "0.85rem",
    fontWeight: 700,
  },
  resultsBox: {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "1rem",
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  resultsHeader: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#6366f1",
    marginBottom: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  listContainer: {
    maxHeight: "220px",
    overflowY: "auto",
    background: "#fff",
    borderRadius: "10px",
    padding: "0.5rem",
  },
  listItem: {
    padding: "0.7rem 0.8rem",
    borderBottom: "1px solid #f1f5f9",
  },
  itemText: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#334155",
    marginBottom: "2px",
  },
  itemDesc: {
    fontSize: "0.75rem",
    color: "#94a3b8",
  },
  emptyState: {
    padding: "2rem 1rem",
    color: "#94a3b8",
    fontSize: "0.85rem",
    textAlign: "center",
    margin: 0,
  },
  codeBox: {
    background: "#0f172a",
    borderRadius: "12px",
    padding: "1rem 1.2rem",
    textAlign: "left",
    marginBottom: "1.2rem",
  },
  codeLine: {
    margin: "4px 0",
    fontSize: "0.82rem",
    fontFamily: "monospace",
  },
  codeKey: { color: "#7dd3fc" },
  codeEq: { color: "#f8fafc" },
  codeVal: { color: "#86efac" },
  codeComment: { color: "#64748b" },
  note: {
    fontSize: "0.8rem",
    color: "#64748b",
    margin: 0,
    lineHeight: 1.6,
  },
};