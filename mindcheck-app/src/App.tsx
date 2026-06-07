import { useState } from 'react'
import LoginScreen from './screens/LoginScreen'
import CheckInScreen from './screens/CheckInScreen'
import NudgeScreen from './screens/NudgeScreen'
import ScaffScreen from './screens/ScaffScreen'

type Screen = 'login' | 'checkin' | 'nudge' | 'scaff'

export interface CheckInData {
  moodIndex: number
  stressScore: number
  intention: string
}

export interface User {
  id: string
  name: string
  email: string
}

function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [user, setUser] = useState<User | null>(null)
  const [checkInData, setCheckInData] = useState<CheckInData>({
    moodIndex: -1,
    stressScore: 5,
    intention: '',
  })
  const [streak, setStreak] = useState(1)

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    setScreen('checkin')
  }

  const handleCheckInComplete = (data: CheckInData, newStreak: number) => {
    setCheckInData(data)
    setStreak(newStreak)
    setScreen('nudge')
  }

  const handleDone = () => {
    setCheckInData({ moodIndex: -1, stressScore: 5, intention: '' })
    setScreen('checkin')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F7F5F2 0%, #EEF0FF 50%, #F7F5F2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {screen !== 'scaff' && (
        <button
          onClick={() => setScreen('scaff')}
          title="View S.C.A.F.F. Prompt Framework"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A1A2E, #2D2D5E)',
            border: '2px solid #6C63FF',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(108,99,255,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          🧠
        </button>
      )}

      <div
        key={screen}
        style={{
          animation: 'fadeIn 0.35s ease forwards',
          width: '100%',
          maxWidth: '420px',
        }}
      >
        {screen === 'login' && <LoginScreen onLogin={handleLogin} />}
        {screen === 'checkin' && user && (
          <CheckInScreen user_id={user.id} onComplete={handleCheckInComplete} />
        )}
        {screen === 'nudge' && (
          <NudgeScreen
            data={checkInData}
            streak={streak}
            onDone={handleDone}
          />
        )}
        {screen === 'scaff' && (
          <ScaffScreen onBack={() => setScreen('login')} />
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        input[type='range'] {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 6px; border-radius: 3px;
          background: #E0E0E0; outline: none; cursor: pointer;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 22px; height: 22px; border-radius: 50%;
          background: #6C63FF; cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(108,99,255,0.4);
          transition: transform 0.15s ease;
        }
        input[type='range']::-webkit-slider-thumb:hover { transform: scale(1.2); }
        button { font-family: inherit; }
        textarea { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E0E0E0; border-radius: 2px; }
      `}</style>
    </div>
  )
}

export default App