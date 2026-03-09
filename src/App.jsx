import { useState, useRef, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  const prev = prevCountRef.current;

  return (
    <div style={styles.root}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.badge}>useRef + useEffect</div>
        <h1 style={styles.title}>Track Previous State</h1>
        <p style={styles.subtitle}>useRef remembers the last value <br/> without causing re-render</p>

        {/* Count Display */}
        <div style={styles.countBox}>
          <div style={styles.countItem}>
            <span style={styles.countLabel}>Previous</span>
            <span style={{ ...styles.countValue, color: "#94a3b8" }}>
              {prev ?? "—"}
            </span>
          </div>
          <div style={styles.divider} />
          <div style={styles.countItem}>
            <span style={styles.countLabel}>Current</span>
            <span style={{ ...styles.countValue, color: "#6366f1" }}>
              {count}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button style={styles.btnDanger} onClick={() => setCount(x => x - 1)}>
            − Decrease
          </button>
          <button style={styles.btnReset} onClick={() => setCount(0)}>
            Reset
          </button>
          <button style={styles.btnSuccess} onClick={() => setCount(x => x + 1)}>
            + Increase
          </button>
        </div>

        {/* How it works */}
        <div style={styles.codeBox}>
          <p style={styles.codeLine}>
            <span style={styles.codeKey}>prevCountRef.current </span>
            <span style={styles.codeEq}>=</span>
            <span style={styles.codeVal}> {prev ?? "undefined"}</span>
          </p>
          <p style={styles.codeLine}>
            <span style={styles.codeKey}>count </span>
            <span style={styles.codeEq}>=</span>
            <span style={styles.codeVal}> {count}</span>
          </p>
        </div>

        <p style={styles.note}>
          💡 <strong>useRef</strong> stores previous value without triggering re-render!
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
    width: "360px",
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
  countBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "1.2rem",
    marginBottom: "1.8rem",
  },
  countItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },
  countLabel: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#94a3b8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  countValue: {
    fontSize: "2.8rem",
    fontWeight: 800,
    lineHeight: 1,
  },
  divider: {
    width: "1px",
    height: "60px",
    background: "#e2e8f0",
  },
  btnRow: {
    display: "flex",
    gap: "0.6rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  btnDanger: {
    background: "#fee2e2",
    color: "#ef4444",
    border: "none",
    borderRadius: "10px",
    padding: "0.6rem 1rem",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  btnReset: {
    background: "#f1f5f9",
    color: "#64748b",
    border: "none",
    borderRadius: "10px",
    padding: "0.6rem 1rem",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  btnSuccess: {
    background: "#dcfce7",
    color: "#16a34a",
    border: "none",
    borderRadius: "10px",
    padding: "0.6rem 1rem",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.85rem",
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
  note: {
    fontSize: "0.8rem",
    color: "#64748b",
    margin: 0,
    lineHeight: 1.6,
  },
};