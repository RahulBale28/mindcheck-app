import { useState } from 'react'
import type { CheckInData } from '../App'

interface Props {
  data: CheckInData
  streak: number
  onDone: () => void
}

const MOOD_LABELS = ['rough', 'a bit down', 'okay', 'pretty good', 'great']
const MOOD_EMOJIS = ['😞', '😕', '😐', '🙂', '😄']

function getNudgeMessage(stressScore: number, moodIndex: number): string {
  const mood      = moodIndex >= 0 ? MOOD_LABELS[moodIndex] : 'okay'
  const moodEmoji = moodIndex >= 0 ? MOOD_EMOJIS[moodIndex] : '😐'

  if (stressScore <= 3) {
    return `You're feeling ${mood} ${moodEmoji} and your stress is low at ${stressScore}/10 — that's worth celebrating! Keep protecting your energy today. You're doing really well. 🌟`
  } else if (stressScore <= 6) {
    return `You rated stress at ${stressScore}/10 and you're feeling ${mood} ${moodEmoji} — that's manageable! Try a quick 5-minute breathing break: inhale for 4, hold for 4, exhale for 6. Your mind will thank you. 💨`
  } else {
    return `Stress at ${stressScore}/10 is significant, and feeling ${mood} ${moodEmoji} tells us you need some care today. Be gentle with yourself — consider reducing one commitment. You cannot pour from an empty cup. 🫶`
  }
}

export default function NudgeScreen({ data, streak, onDone }: Props) {
  const [btnHover, setBtnHover] = useState(false)
  const nudgeMessage = getNudgeMessage(data.stressScore, data.moodIndex)

  return (
    <div style={{
      background: 'white', borderRadius: '28px', overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(108,99,255,0.18), 0 8px 24px rgba(0,0,0,0.08)',
      width: '100%'
    }}>

      {/* Navy top */}
      <div style={{
        background: 'linear-gradient(160deg, #1A1A2E 0%, #2D2D5E 100%)',
        padding: '40px 32px 50px', textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px',
          width: '110px', height: '110px', borderRadius: '50%',
          background: 'rgba(108,99,255,0.18)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '10px',
          width: '85px', height: '85px', borderRadius: '50%',
          background: 'rgba(236,64,122,0.12)', pointerEvents: 'none' }} />

        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', boxShadow: '0 8px 28px rgba(76,175,80,0.45)',
          fontSize: '30px', color: 'white', fontWeight: '700'
        }}>✓</div>

        <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'white',
          marginBottom: '6px', letterSpacing: '-0.3px' }}>Here's your nudge 💜</h2>
        <p style={{ fontSize: '13px', color: '#B0AEFF' }}>Personalised just for you</p>
      </div>

      <div style={{ padding: '28px 28px 32px' }}>

        {/* AI Nudge card */}
        <div style={{
          background: '#F0EEFF', borderLeft: '4px solid #6C63FF',
          borderRadius: '0 14px 14px 0', padding: '18px 18px 18px 20px', marginBottom: '16px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#6C63FF',
            letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>
            AI Nudge
          </div>
          <p style={{ fontSize: '15px', color: '#1A1A2E', lineHeight: '1.7', fontStyle: 'italic' }}>
            {nudgeMessage}
          </p>
        </div>

        {/* Intention recap */}
        <div style={{ background: '#F8F8F8', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: '#9E9E9E',
            marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Your intention today
          </p>
          <p style={{ fontSize: '15px', color: '#1A1A2E', fontWeight: '600', lineHeight: '1.4' }}>
            {data.intention || 'No intention set'}
          </p>
        </div>

        {/* Streak badge */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{
            display: 'inline-block', background: '#FFF8E1',
            border: '1.5px solid #FF9800', color: '#E65100',
            padding: '8px 22px', borderRadius: '24px', fontSize: '13px', fontWeight: '700'
          }}>🔥 3-day streak — keep it up!</span>
        </div>

        {/* Done button */}
        <button onClick={onDone}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            width: '100%', padding: '14px',
            background: btnHover ? '#F0EEFF' : 'white',
            color: '#6C63FF', border: '2px solid #6C63FF', borderRadius: '14px',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            transition: 'all 0.2s ease', marginBottom: '16px',
            boxShadow: btnHover ? '0 4px 14px rgba(108,99,255,0.2)' : 'none'
          }}>Done for today ✓</button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6C63FF',
          cursor: 'pointer', fontWeight: '500' }}>View my history →</p>
      </div>
    </div>
  )
}
