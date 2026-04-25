import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const analyzeText = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/analyze", {
      text: text,
    });

    setResult(res.data);
    setText("");
  };

  const getHistory = async () => {
    const res = await axios.get("http://localhost:5000/api/history");
    setHistory(res.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>CodeMix Sentiment Analyzer</h1>
        <p style={styles.subtitle}>
          Analyze Hinglish / code-mixed text using Sentiment and CMR.
        </p>

        <textarea
          style={styles.textarea}
          placeholder="Example: ye movie mast thi but ending boring thi"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div style={styles.buttonBox}>
          <button style={styles.button} onClick={analyzeText}>
            Analyze
          </button>

          <button style={styles.secondButton} onClick={getHistory}>
            Show History
          </button>
        </div>

        {result && (
          <div style={styles.resultBox}>
            <h2>Result</h2>
            <p><b>Text:</b> {result.text}</p>
            <p><b>Sentiment:</b> {result.sentiment}</p>
            <p><b>CMR:</b> {result.cmr}</p>
            <p><b>CMR Level:</b> {result.cmrLevel}</p>
          </div>
        )}

        {history.length > 0 && (
          <div style={styles.historyBox}>
            <h2>Analysis History</h2>

            {history.map((item) => (
              <div key={item._id} style={styles.historyItem}>
                <p><b>Text:</b> {item.text}</p>
                <p><b>Sentiment:</b> {item.sentiment}</p>
                <p><b>CMR:</b> {item.cmr}</p>
                <p><b>Level:</b> {item.cmrLevel}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    maxWidth: "850px",
    margin: "auto",
    background: "white",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "30px",
  },
  textarea: {
    width: "100%",
    height: "130px",
    padding: "15px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    resize: "none",
  },
  buttonBox: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  button: {
    padding: "12px 25px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  secondButton: {
    padding: "12px 25px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  resultBox: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "12px",
    background: "#eef6ff",
    border: "1px solid #bfdbfe",
  },
  historyBox: {
    marginTop: "30px",
  },
  historyItem: {
    background: "#f9fafb",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },
};

export default App;