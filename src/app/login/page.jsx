// src/app/login/page.jsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const defaultUsername = 'admin';
const defaultPassword = 'password123';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (username === defaultUsername && password === defaultPassword) {
      // Store credentials (for demo purposes)
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      // Redirect to admin page
      router.push('../admin');
    } else {
      // Show error
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
