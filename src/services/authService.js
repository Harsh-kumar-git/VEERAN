const AUTH_KEY = 'veeran_admin_auth';
const EXPIRY_HOURS = 24;

export const login = (password) => {
  if (password === 'admin123') {
    const expiry = new Date().getTime() + EXPIRY_HOURS * 60 * 60 * 1000;
    localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, expiry }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;

  try {
    const parsed = JSON.parse(authData);
    if (parsed.isAuthenticated && parsed.expiry > new Date().getTime()) {
      return true;
    }
    // Expired or invalid
    logout();
    return false;
  } catch (error) {
    logout();
    return false;
  }
};
