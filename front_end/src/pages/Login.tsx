import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles } from 'lucide-react';
import Stars from '@/components/Stars';
import heroBg from '@/assets/hero-bg.jpg';
import api from '@/lib/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login/', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Save the token and user data to localStorage
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        role: response.data.role,
        email: email,
        first_name: response.data.first_name,
        last_name: response.data.last_name
      }));
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Failed to login. Please check your credentials.');
      } else {
        setError('Failed to login. Please check your credentials.');
      }
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <Stars />
        <div className="absolute inset-0 bg-background/20" />
        
        <div className="relative z-10 flex flex-col items-start justify-center px-16">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider">
              PathFinders
            </span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="gradient-text">Discover Your</span>
            <br />
            <span className="gradient-text">path to success</span>
          </h1>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background relative">
        <Stars />
        
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="font-display text-xl font-bold">PathFinders</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mb-8 border-b border-border/30">
            <Link
              to="/login"
              className="pb-3 text-foreground font-medium border-b-2 border-foreground"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="pb-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <div className="glass-card-strong p-8">
            <h2 className="font-display text-3xl font-bold mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Login to your PathFinder account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
{error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-muted-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    disabled={loading}
                  />
                  <label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-muted-foreground hover:text-accent transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-foreground font-semibold hover:text-accent transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
