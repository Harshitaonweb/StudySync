import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexDirection: 'column', gap: 16,
          background: '#0a0005', color: '#ff8080', fontFamily: 'monospace',
          padding: 40,
        }}>
          <div style={{ fontSize: 40 }}>💥</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', color: '#ffd700' }}>A spell went wrong</h2>
          <pre style={{
            background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)',
            padding: 20, borderRadius: 8, maxWidth: 700, overflow: 'auto',
            fontSize: 13, color: '#ff8080', whiteSpace: 'pre-wrap',
          }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            onClick={() => { localStorage.removeItem('ss_house'); window.location.reload(); }}
            style={{ padding: '10px 24px', background: '#ffd700', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Cinzel, serif', fontWeight: 700 }}
          >
            Reset & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
