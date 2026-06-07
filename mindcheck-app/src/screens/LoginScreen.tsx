import { useState } from 'react'
import { signUp, logIn } from '../api'
import type { User } from '../App'

interface Props {
  onLogin: (user: User) => void
}

export default function LoginScreen({ onLogin }: Props) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [btnHover, setBtnHover] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [passFocus, setPassFocus] = useState(false)
  const [confirmFocus, setConfirmFocus] = useState(false)
  const [nameFocus, setNameFocus] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (isSignUp) {
      if (!name.trim()) { setError('Please enter your name.'); return }
      if (!email.trim()) { setError('Please enter your email.'); return }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
      if (password !== confirmPassword) { setError('Passwords do not match.'); return }
      try {
        const user: User = await signUp(name, email, password)
        onLogin(user)
      } catch (e: any) {
        setError(e.message || 'Signup failed')
      }
    } else {
      try {
        const user: User = await logIn(email, password)
        onLogin(user)
      } catch (e: any) {
        setError(e.message || 'Login failed')
      }
    }
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setPassword('')
    setConfirmPassword('')
  }

  const inputStyle = (focused: boolean) => ({
    width: '100%', padding: '14px 16px',
    background: focused ? '#FAFAFA' : '#F5F5F5',
    border: focused ? '2px solid #6C63FF' : '2px solid transparent',
    borderRadius: '12px', fontSize: '15px', color: '#1A1A2E',
    outline: 'none', transition: 'all 0.2s ease',
    boxSizing: 'border-box' as const
  })

  const labelStyle = {
    display: 'block', fontSize: '13px',
    fontWeight: '600' as const, color: '#1A1A2E', marginBottom: '8px'
  }

  return (
    <div style={{
      background: 'white', borderRadius: '28px', overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(108,99,255,0.18), 0 8px 24px rgba(0,0,0,0.08)',
      width: '100%'
    }}>

      {/* Navy hero top */}
      <div style={{
        background: 'linear-gradient(160deg, #1A1A2E 0%, #2D2D5E 100%)',
        padding: '44px 32px 52px', textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-30px', right: '-30px',
          width: '130px', height: '130px', borderRadius: '50%',
          background: 'rgba(108,99,255,0.15)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-20px', left: '-20px',
          width: '90px', height: '90px', borderRadius: '50%',
          background: 'rgba(236,64,122,0.12)', pointerEvents: 'none'
        }} />
        <div style={{
          fontSize: '48px', marginBottom: '14px',
          filter: 'drop-shadow(0 4px 16px rgba(236,64,122,0.5))'
        }}>💜</div>
        <h1 style={{
          fontSize: '34px', fontWeight: '700', color: 'white',
          letterSpacing: '-0.8px', marginBottom: '8px'
        }}>MindCheck</h1>
        <p style={{ fontSize: '14px', color: '#B0AEFF', fontStyle: 'italic' }}>
          Your daily wellness ritual
        </p>
      </div>

      {/* Form section */}
      <div style={{ padding: '32px 32px 36px' }}>

        <h2 style={{
          fontSize: '22px', fontWeight: '700', color: '#1A1A2E',
          marginBottom: '6px', letterSpacing: '-0.3px'
        }}>
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>
        <p style={{ fontSize: '14px', color: '#9E9E9E', marginBottom: '24px' }}>
          {isSignUp ? 'Start your wellness journey today' : 'Sign in to continue your journey'}
        </p>

        {/* Name field — sign up only */}
        {isSignUp && (
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              style={inputStyle(nameFocus)}
            />
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            style={inputStyle(emailFocus)}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: isSignUp ? '16px' : '28px' }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder={isSignUp ? 'At least 6 characters' : 'Enter your password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
            style={inputStyle(passFocus)}
          />
        </div>

        {/* Confirm Password — sign up only */}
        {isSignUp && (
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmFocus(true)}
              onBlur={() => setConfirmFocus(false)}
              style={inputStyle(confirmFocus)}
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div style={{
            background: '#FFEBEE', border: '1px solid #F44336',
            borderRadius: '10px', padding: '10px 14px',
            marginBottom: '16px', fontSize: '13px', color: '#C62828'
          }}>
            {error}
          </div>
        )}

        {/* Primary button */}
        <button
          onClick={handleSubmit}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            width: '100%', padding: '15px',
            background: btnHover ? '#4B44CC' : 'linear-gradient(135deg, #6C63FF 0%, #8B5CF6 100%)',
            color: 'white', border: 'none', borderRadius: '14px',
            fontSize: '16px', fontWeight: '600', cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: btnHover
              ? '0 8px 28px rgba(108,99,255,0.55)'
              : '0 4px 16px rgba(108,99,255,0.38)',
            transform: btnHover ? 'translateY(-2px)' : 'translateY(0)',
            marginBottom: '20px'
          }}
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </button>

        {/* Switch mode link */}
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#9E9E9E' }}>
          {isSignUp ? 'Already have an account? ' : 'New here? '}
          <span
            onClick={switchMode}
            style={{ color: '#6C63FF', fontWeight: '600', cursor: 'pointer' }}
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </span>
        </p>
      </div>
    </div>
  )
}

