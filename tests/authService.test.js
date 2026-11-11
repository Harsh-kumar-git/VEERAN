import { describe, it, expect, beforeEach } from 'vitest';
import {
  login,
  logout,
  isAuthenticated,
  checkLockoutStatus
} from '../src/services/authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('rejects invalid password and increments failed attempts', () => {
    const success = login('wrong-pass');
    expect(success).toBe(false);
    expect(isAuthenticated()).toBe(false);

    const status = checkLockoutStatus();
    expect(status.isLocked).toBe(false);
    expect(status.attempts).toBe(1);
  });

  it('authenticates with correct credentials and stores valid session', () => {
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'veeran_admin_secure_2026!';
    const success = login(correctPassword);
    expect(success).toBe(true);
    expect(isAuthenticated()).toBe(true);
  });

  it('logs out and clears authentication state', () => {
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'veeran_admin_secure_2026!';
    login(correctPassword);
    expect(isAuthenticated()).toBe(true);

    logout();
    expect(isAuthenticated()).toBe(false);
  });

  it('triggers brute-force lockout after 5 consecutive failed attempts', () => {
    for (let i = 0; i < 4; i++) {
      expect(login('incorrect')).toBe(false);
    }
    // 5th attempt
    expect(login('incorrect')).toBe(false);

    const status = checkLockoutStatus();
    expect(status.isLocked).toBe(true);
    expect(status.remainingSeconds).toBeGreaterThan(0);

    // 6th attempt should throw lockout exception
    expect(() => login('any_attempt')).toThrow(/locked/i);
  });
});
