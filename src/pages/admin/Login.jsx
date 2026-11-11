import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../services/authService';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (login(password)) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Login error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 border border-stone-100 shadow-sm rounded-sm">
        <div>
          <h2 className="text-center text-3xl font-light text-stone-900">Admin Login</h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Enter your master password to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 text-sm border border-red-100 rounded-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-stone-900 focus:border-stone-900 focus:z-10 sm:text-sm transition-colors rounded-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors rounded-sm"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
