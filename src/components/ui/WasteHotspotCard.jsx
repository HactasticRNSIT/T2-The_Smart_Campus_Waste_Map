import React from 'react'

export default function WasteHotspotCard({ name, level }) {
  const pct = typeof level === 'number' ? Math.round(level) : null
  let color = '#9ca3af' // gray
  if (pct !== null) {
    if (pct < 50) color = '#16a34a' // green
    else if (pct <= 80) color = '#f59e0b' // yellow
    else color = '#dc2626' // red
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          border: `8px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700 }}>{pct !== null ? `${pct}%` : '—'}</div>
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{name}</div>
      </div>
    </div>
  )
}
