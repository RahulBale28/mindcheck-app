import { useState } from 'react'
import { saveCheckIn } from '../api'
import type { CheckInData } from '../App'

interface Props {
  user_id: string
  onComplete: (data: CheckInData, newStreak: number) => void
}

const EMOJIS       = ['😞', '😕', '😐', '🙂', '😄']
const EMOJI_COLORS = ['#F44336', '#FF9800', '#9E9E9E', '#26A69A', '#4CAF50']
const EMOJI_BG     = ['#FFEBEE', '#FFF3E0', '#F5F5F5', '#E0F2F1', '#E8F5E9']
const MOOD_LABELS  = ['Feeling rough', 'A bit down', 'Feeling okay', 'Pretty good', 'Feeling great!']

export default function CheckInScreen({ user_id, onComplete }: Props) {
  const [moodIndex,    setMoodIndex]    = useState(-1)
  const [stressScore,  setStressScore]  = useState(5)
  const [intention,    setIntention]    = useState('')
  const [hoveredEmoji, setHoveredEmoji] = useState(-1)
  const [btnHover,     setBtnHover]     = useState(false)
  const [textFocus,    setTextFocus]    = useState(false)

  const isValid = moodIndex >= 0 && intention.trim().length > 0

  const getStressColor = () => {
    if (stressScore <= 3) return '#4CAF50'
    if (stressScore <= 6) return '#FF9800'
    return '#F44336'
  }

  return (
    <div style={{
      background: 'white', borderRadius: '28px', overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(108,99,255,0.18), 0 8px 24px rgba(0,0,0,0.08)',
      width: '100%'
    }}>

      {/* Top bar + progress */}
      <div style={{ background: '#F8F8FF', padding: '18px 24px 0', borderBottom: '1px solid #EFEFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#6C63FF' }}>Step 1 of 2</span>
          <span style={{ fontSize: '13px', color: '#9E9E9E' }}>Today's Check-In</span>
        </div>
        <div style={{ height: '4px', background: '#E8E8FF', borderRadius: '2px' }}>
          <div style={{
            height: '100%', width: '50%',
            background: 'linear-gradient(90deg, #6C63FF, #EC407A)', borderRadius: '2px'
          }} />
        </div>
        <div style={{ height: '14px' }} />
      </div>

      <div style={{ padding: '28px 28px 32px' }}>

        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1A1A2E',
          textAlign: 'center', marginBottom: '4px', letterSpacing: '-0.3px' }}>
          How are you feeling today?
        </h2>
        <p style={{ fontSize: '13px', color: '#9E9E9E', textAlign: 'center', marginBottom: '24px' }}>
          Tap to select your mood
        </p>

        {/* Emoji row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
          {EMOJIS.map((emoji, i) => (
            <button key={i} onClick={() => setMoodIndex(i)}
              onMouseEnter={() => setHoveredEmoji(i)}
              onMouseLeave={() => setHoveredEmoji(-1)}
              style={{
                flex: 1, aspectRatio: '1', fontSize: '22px',
                background: moodIndex === i ? EMOJI_BG[i] : '#F5F5F5',
                border: moodIndex === i ? `2.5px solid ${EMOJI_COLORS[i]}` : '2.5px solid transparent',
                borderRadius: '16px', cursor: 'pointer', transition: 'all 0.18s ease',
                transform: (hoveredEmoji === i || moodIndex === i) ? 'scale(1.12)' : 'scale(1)',
                boxShadow: moodIndex === i ? `0 4px 14px ${EMOJI_COLORS[i]}40` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '54px', outline: 'none'
              }}>
              {emoji}
            </button>
          ))}
        </div>

        {/* Mood label */}
        <div style={{ height: '28px', marginBottom: '20px', textAlign: 'center' }}>
          {moodIndex >= 0 && (
            <span style={{
              fontSize: '12px', fontWeight: '700', color: EMOJI_COLORS[moodIndex],
              background: EMOJI_BG[moodIndex], padding: '4px 14px', borderRadius: '20px'
            }}>{MOOD_LABELS[moodIndex]}</span>
          )}
        </div>

        {/* Stress slider */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A2E' }}>Stress Level</label>
            <span style={{
              fontSize: '17px', fontWeight: '700', color: getStressColor(),
              background: `${getStressColor()}18`, padding: '3px 12px',
              borderRadius: '20px', transition: 'all 0.2s ease', minWidth: '60px', textAlign: 'center'
            }}>{stressScore} / 10</span>
          </div>
          <input type="range" min={1} max={10} value={stressScore}
            onChange={e => setStressScore(Number(e.target.value))}
            style={{ width: '100%', accentColor: getStressColor() }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: '#9E9E9E' }}>😌 Low</span>
            <span style={{ fontSize: '11px', color: '#9E9E9E' }}>😰 High</span>
          </div>
        </div>

        {/* Intention field */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600',
            color: '#1A1A2E', marginBottom: '10px' }}>One intention for today</label>
          <textarea placeholder="e.g. Take a 10 minute walk outside today..."
            value={intention} onChange={e => setIntention(e.target.value)}
            onFocus={() => setTextFocus(true)} onBlur={() => setTextFocus(false)}
            rows={3}
            style={{
              width: '100%', padding: '14px 16px',
              background: textFocus ? '#FAFAFA' : '#F8F8FF',
              border: textFocus ? '2px solid #6C63FF' : '2px solid #EEF0FF',
              borderRadius: '14px', fontSize: '14px', color: '#1A1A2E',
              outline: 'none', resize: 'none', lineHeight: '1.6',
              transition: 'all 0.2s ease', boxSizing: 'border-box'
            }} />
        </div>

        {/* CTA button */}
        <button
          onClick={async () => {
              if (!isValid) return
              await saveCheckIn(user_id, moodIndex, stressScore, intention)
              onComplete({ moodIndex, stressScore, intention }, 1)
            }}
          onMouseEnter={() => isValid && setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          disabled={!isValid}
          style={{
            width: '100%', padding: '15px',
            background: isValid
              ? (btnHover ? '#4B44CC' : 'linear-gradient(135deg, #6C63FF 0%, #8B5CF6 100%)')
              : '#E8E8E8',
            color: isValid ? 'white' : '#AAAAAA',
            border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '600',
            cursor: isValid ? 'pointer' : 'not-allowed', transition: 'all 0.2s ease',
            boxShadow: isValid && btnHover ? '0 8px 28px rgba(108,99,255,0.5)'
              : isValid ? '0 4px 16px rgba(108,99,255,0.32)' : 'none',
            transform: isValid && btnHover ? 'translateY(-2px)' : 'none',
            marginBottom: '12px'
          }}>See My Nudge →</button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#BBBBBB', fontStyle: 'italic' }}>
          Takes less than 60 seconds ✨
        </p>
      </div>
    </div>
  )
}
