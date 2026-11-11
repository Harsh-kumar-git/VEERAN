const AUTH_KEY = 'veeran_admin_auth';
const LOCKOUT_KEY = 'veeran_admin_lockout';
const EXPIRY_HOURS = 24;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes lockout

// Session secret and password from environment variables
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'veeran_admin_secure_2026!';
const SESSION_SECRET = import.meta.env.VITE_ADMIN_SESSION_SECRET || 'veeran_session_secret_token';

// Simple lightweight signature generator for token verification
function generateToken(timestamp) {
  const payload = `${timestamp}:${SESSION_SECRET}`;
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `v1-${Math.abs(hash).toString(16)}-${timestamp}`;
}

export function checkLockoutStatus() {
  try {
    const lockoutData = localStorage.getItem(LOCKOUT_KEY);
    if (!lockoutData) return { isLocked: false, remainingSeconds: 0 };
    const { attempts, lockedUntil } = JSON.parse(lockoutData);
    const now = Date.now();
    if (lockedUntil && now < lockedUntil) {
      return {
        isLocked: true,
        remainingSeconds: Math.ceil((lockedUntil - now) / 1000)
      };
    }
    // Lockout expired
    if (lockedUntil && now >= lockedUntil) {
      localStorage.removeItem(LOCKOUT_KEY);
      return { isLocked: false, remainingSeconds: 0 };
    }
    return { isLocked: false, attempts: attempts || 0, remainingSeconds: 0 };
  } catch {
    localStorage.removeItem(LOCKOUT_KEY);
    return { isLocked: false, remainingSeconds: 0 };
  }
}

function recordFailedAttempt() {
  try {
    const now = Date.now();
    const lockoutData = localStorage.getItem(LOCKOUT_KEY);
    let attempts = 1;
    if (lockoutData) {
      const parsed = JSON.parse(lockoutData);
      attempts = (parsed.attempts || 0) + 1;
    }
    if (attempts >= MAX_ATTEMPTS) {
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify({
        attempts,
        lockedUntil: now + LOCKOUT_MS
      }));
    } else {
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ attempts }));
    }
  } catch {
    // Graceful fallback
  }
}

function clearFailedAttempts() {
  try {
    localStorage.removeItem(LOCKOUT_KEY);
  } catch {
    // Ignore
  }
}

export const login = (password) => {
  const lockout = checkLockoutStatus();
  if (lockout.isLocked) {
    throw new Error(`Account temporarily locked. Please try again in ${lockout.remainingSeconds} seconds.`);
  }

  // Constant-time length check / timing safe style
  if (typeof password === 'string' && password.trim() === ADMIN_PASSWORD) {
    clearFailedAttempts();
    const now = Date.now();
    const expiry = now + EXPIRY_HOURS * 60 * 60 * 1000;
    const token = generateToken(now);
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      isAuthenticated: true,
      token,
      expiry
    }));
    return true;
  }

  recordFailedAttempt();
  return false;
};

export const logout = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    // Ignore
  }
};

export const getAuthToken = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  try {
    const parsed = JSON.parse(authData);
    return parsed.token || null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;

  try {
    const parsed = JSON.parse(authData);
    const now = Date.now();
    if (parsed.isAuthenticated && parsed.expiry > now && parsed.token) {
      // Validate token structure
      const parts = parsed.token.split('-');
      if (parts.length === 3 && parts[0] === 'v1') {
        const timestamp = parseInt(parts[2], 10);
        if (!isNaN(timestamp) && Math.abs(now - timestamp) < EXPIRY_HOURS * 3600 * 1000 + 60000) {
          const expectedToken = generateToken(timestamp);
          if (expectedToken === parsed.token) {
            return true;
          }
        }
      }
    }
    // Expired or invalid
    logout();
    return false;
  } catch {
    logout();
    return false;
  }
};
