import  { useState } from 'react';


function Login() {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (rollNumber === 'student' && password === 'password') {
      localStorage.setItem('studentSession', 'true');
      window.location.href = '/student/dashboard';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="text-2xl font-bold text-center">Student Register</div>
        <div className="text-center">Access the student dashboard</div>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="rollNumber">Roll Number</label>
              <input
                id="rollNumber"
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-4">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;