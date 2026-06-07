import { useState } from 'react'

interface Props {
  onBack: () => void
}

const SCAFF_DATA = [
  {
    letter: 'S', word: 'Situation', color: '#6C63FF', bg: '#EEF0FF',
    what: 'What is happening now?',
    content: 'I am a university student building a mental wellness MVP called MindCheck. I have already completed low-fidelity Figma mockups of three screens — a Login/Sign Up screen, a Daily Check-In form, and an AI Nudge confirmation screen. I now need to build a working web application in React + TypeScript + TailwindCSS that mirrors these mockups.',
  },
  {
    letter: 'C', word: 'Challenge', color: '#EC407A', bg: '#FCE4EC',
    what: 'What problem does this cause?',
    content: 'Because I am starting from an empty folder, I need a clean well-structured React project from the beginning. I want to avoid: inconsistent styling across screens, state being lost when moving between screens, over-engineering with unnecessary backend calls, and errors showing before the user has interacted with any field.',
  },
  {
    letter: 'A', word: 'Aspiration', color: '#26A69A', bg: '#E0F2F1',
    what: 'What do we want instead?',
    content: 'Create a working 3-screen wellness application: Screen 1 (Login) with MindCheck branding, email/password fields, and a primary Sign In button. Screen 2 (Check-In) with mood emoji selector, stress slider (1–10), and intention text area. Screen 3 (AI Nudge) with a personalised message based on stress score, intention recap, and a streak badge.',
  },
  {
    letter: 'F', word: 'Format', color: '#FF9800', bg: '#FFF3E0',
    what: 'What output is required?',
    content: 'Generate a complete React + TypeScript + TailwindCSS project using Vite: src/App.tsx managing active screen with useState, src/screens/LoginScreen.tsx, CheckInScreen.tsx, NudgeScreen.tsx, and standard config files. Navigation between screens uses React useState only — no React Router needed.',
  },
  {
    letter: 'F', word: 'Filters', color: '#F44336', bg: '#FFEBEE',
    what: 'What rules must be followed?',
    content: 'Do NOT use React Router — useState screen switching only. Do NOT add any backend API calls. Nudge message must be dynamic based on stress score: 1–3 = encouraging, 4–6 = suggest breathing break, 7–10 = acknowledge difficulty. TailwindCSS classes only. All components responsive. "See My Nudge" button disabled until all fields are filled.',
  },
]

const FOLLOWUPS = [
  {
    number: '01', color: '#6C63FF', bg: '#EEF0FF',
    title: 'Fixing the Emoji Mood Selector',
    prompt: 'The emoji mood selector on Screen 2 is not showing any visual feedback when I click on an emoji. The selected emoji should have a coloured circular border around it matching its sentiment colour (red for sad, amber for neutral, green for happy). Also add a hover scale animation. Please update CheckInScreen.tsx only using TailwindCSS transition classes. Do not change any other screen.',
    addressed: 'After the first build, clicking an emoji produced no visual change — the interaction felt broken. This follow-up fixed the selected state with a coloured ring and scale animation, making the mood selector feel responsive and clear to the user.',
  },
  {
    number: '02', color: '#26A69A', bg: '#E0F2F1',
    title: 'Dynamic AI Nudge Message',
    prompt: 'The nudge message on Screen 3 is currently static and does not reference the user\'s actual inputs from Screen 2. Please update NudgeScreen.tsx and App.tsx so the nudge message dynamically changes based on stress score: stress 1–3 = encouraging and light; stress 4–6 = suggest a 5-minute breathing break; stress 7–10 = acknowledge difficulty and suggest reducing commitments. Pass stressScore and moodIndex as props from App.tsx. Do not change Screen 1 or Screen 2.',
    addressed: 'The core value of MindCheck is a personalised response to user input. The first generation showed a generic message regardless of input. This prompt added conditional logic that makes the nudge feel genuinely responsive — directly fixing the biggest gap in the MVP.',
  },
  {
    number: '03', color: '#FF9800', bg: '#FFF3E0',
    title: 'Mobile Responsiveness & Polish',
    prompt: 'When viewing on a mobile screen (375px), the emoji row overflows horizontally and the stress slider thumb is too small to tap accurately. Fix CheckInScreen.tsx so the emoji row wraps on small screens using TailwindCSS responsive prefixes. Increase slider thumb size for touch targets. Add a smooth 300ms fade transition between screens in App.tsx using opacity and useState. Do not change Screen 3.',
    addressed: 'Testing on mobile revealed two serious usability problems for our 18–30 target user who primarily uses their phone. The overflow emoji row and tiny slider would cause users to abandon the check-in. The screen fade transition was also added to make the app feel polished rather than abrupt.',
  },
  {
    number: '04', color: '#EC407A', bg: '#FCE4EC',
    title: 'Adding a Sign Up Screen',
    prompt: 'The login screen has a "Create an account" link but clicking it does nothing. Please update LoginScreen.tsx to add a sign up state that toggles when the link is clicked. The sign up form should include a Full Name field, Email field, Password field, and a Confirm Password field. Add basic validation: name must not be empty, password must be at least 6 characters, and both passwords must match. If validation fails show a clear error message in a red box above the button. The button label should change to "Create Account" in sign up mode and back to "Sign In" when switching back. The heading should also change between "Welcome back" and "Create your account". Keep everything inside LoginScreen.tsx using useState to toggle between the two modes. Do not create a new file.',
    addressed: 'The initial build only had a login form with no working sign up flow. Clicking "Create an account" did nothing, which made the app feel incomplete. This prompt added a toggled sign up state inside LoginScreen.tsx with name, email, password, and confirm password fields, plus basic validation and a visible error message.',
  },
]

export default function ScaffScreen({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'scaff' | 'prompt' | 'followups'>('scaff')
  const [expandedFollowup, setExpandedFollowup] = useState<number | null>(null)

  return (
    <div style={{
      background: 'white', borderRadius: '28px', overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(108,99,255,0.18), 0 8px 24px rgba(0,0,0,0.08)',
      width: '100%', maxHeight: '88vh', display: 'flex', flexDirection: 'column'
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1A1A2E 0%, #2D2D5E 100%)',
        padding: '24px 24px 20px', flexShrink: 0
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
          color: '#B0AEFF', borderRadius: '10px', padding: '6px 14px',
          fontSize: '13px', cursor: 'pointer', marginBottom: '14px',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}>← Back</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(108,99,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
          }}>🧠</div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'white', letterSpacing: '-0.3px' }}>
              S.C.A.F.F. Prompt Framework
            </h2>
            <p style={{ fontSize: '12px', color: '#B0AEFF' }}>
              BUS4012 — How MindCheck was built with Cline
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
          {([
            { key: 'scaff',     label: 'S.C.A.F.F.' },
            { key: 'prompt',    label: 'Full Prompt' },
            { key: 'followups', label: 'Follow-Ups'  },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, padding: '8px 4px',
              background: activeTab === tab.key ? '#6C63FF' : 'rgba(255,255,255,0.1)',
              color: activeTab === tab.key ? 'white' : '#B0AEFF',
              border: 'none', borderRadius: '10px', fontSize: '12px',
              fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease'
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '20px' }}>

        {/* TAB: SCAFF */}
        {activeTab === 'scaff' && (
          <div>
            <p style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '18px', lineHeight: '1.6' }}>
              The S.C.A.F.F. framework was used to give Cline a complete picture before any code was written.
            </p>
            {SCAFF_DATA.map((item, i) => (
              <div key={i} style={{
                borderLeft: `4px solid ${item.color}`,
                borderRadius: '0 14px 14px 0',
                background: item.bg,
                padding: '16px 16px 16px 18px',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '8px',
                    background: item.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: '800', color: 'white', flexShrink: 0
                  }}>{item.letter}</div>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: item.color }}>
                      {item.word}
                    </span>
                    <span style={{ fontSize: '11px', color: '#9E9E9E', marginLeft: '8px', fontStyle: 'italic' }}>
                      {item.what}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#1A1A2E', lineHeight: '1.65', paddingLeft: '40px' }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Full Prompt */}
        {activeTab === 'prompt' && (
          <div>
            <div style={{
              background: '#F8F8FF', borderRadius: '14px', padding: '16px',
              marginBottom: '16px', border: '1.5px solid #EEF0FF'
            }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#6C63FF',
                textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Starting Prompt — Submitted to Cline in Plan Mode
              </p>
              <p style={{ fontSize: '13px', color: '#9E9E9E', lineHeight: '1.6' }}>
                This is the complete S.C.A.F.F.-structured prompt used to initialise the MindCheck
                MVP in Cline. Submitted in Plan Mode so Cline generated a blueprint before writing any code.
              </p>
            </div>
            {SCAFF_DATA.map((item, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px', background: item.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '800', color: 'white', flexShrink: 0
                  }}>{item.letter}</div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A2E' }}>
                    {item.letter} — {item.word} ({item.what})
                  </span>
                </div>
                <div style={{
                  background: '#F5F5F5', borderRadius: '10px',
                  padding: '14px 16px', borderLeft: `3px solid ${item.color}`
                }}>
                  <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.7' }}>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Follow-ups */}
        {activeTab === 'followups' && (
          <div>
            <p style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '18px', lineHeight: '1.6' }}>
              After the initial build, these follow-up prompts were submitted one at a time to refine the application.
            </p>

            {FOLLOWUPS.map((fu, i) => (
              <div key={i} style={{
                border: `1.5px solid ${fu.color}30`,
                borderTop: `4px solid ${fu.color}`,
                borderRadius: '14px', background: 'white',
                marginBottom: '14px', overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
              }}>
                {/* Header row */}
                <button
                  onClick={() => setExpandedFollowup(expandedFollowup === i ? null : i)}
                  style={{
                    width: '100%', padding: '16px 18px',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '10px',
                      background: fu.bg, border: `2px solid ${fu.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: '800', color: fu.color, flexShrink: 0
                    }}>{fu.number}</div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A2E' }}>
                      {fu.title}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '16px', color: fu.color,
                    transform: expandedFollowup === i ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease', display: 'inline-block'
                  }}>▾</span>
                </button>

                {/* Expanded content */}
                {expandedFollowup === i && (
                  <div style={{ padding: '0 18px 18px' }}>
                    <div style={{
                      background: '#F5F5F5', borderRadius: '10px',
                      padding: '14px 16px', marginBottom: '12px',
                      borderLeft: `3px solid ${fu.color}`
                    }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: fu.color,
                        textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
                        Prompt submitted to Cline
                      </p>
                      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.7', fontStyle: 'italic' }}>
                        {fu.prompt}
                      </p>
                    </div>
                    <div style={{ background: fu.bg, borderRadius: '10px', padding: '14px 16px' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: fu.color,
                        textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
                        Problem this addressed
                      </p>
                      <p style={{ fontSize: '13px', color: '#1A1A2E', lineHeight: '1.65' }}>
                        {fu.addressed}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Plan vs Act note */}
            <div style={{ background: '#1A1A2E', borderRadius: '14px', padding: '16px 18px', marginTop: '8px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#B0AEFF',
                textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
                Plan Mode vs Act Mode
              </p>
              <p style={{ fontSize: '13px', color: '#E0E0E0', lineHeight: '1.65' }}>
                <strong style={{ color: '#6C63FF' }}>Plan Mode</strong> — Cline reads the prompt
                and generates a step-by-step blueprint without writing any code. Review and approve
                before proceeding.{' '}
                <strong style={{ color: '#EC407A' }}>Act Mode</strong> — Cline implements each
                step one by one, creating files and running commands. Approve key actions as they happen.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
