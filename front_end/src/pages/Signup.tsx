import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles } from 'lucide-react';
import Stars from '@/components/Stars';
import heroBg from '@/assets/hero-bg.jpg';
import api from '@/lib/api';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register/', {
        first_name: firstName,
        last_name: lastName,
        email,  
        password,
        password2: confirmPassword,
        role: 'student',
      });
      navigate('/login');
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.email) {
          setError(`Email: ${errorData.email[0]}`);
        } else if (errorData.password) {
          setError(`Password: ${errorData.password[0]}`);
        } else if (errorData.first_name) {
          setError(`First Name: ${errorData.first_name[0]}`);
        } else if (errorData.last_name) {
          setError(`Last Name: ${errorData.last_name[0]}`);
        } else {
          setError('Failed to sign up. Please try again.');
        }
      } else {
        setError('Failed to sign up. Please try again.');
      }
      console.error('Signup failed:', err);
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
            <span className="gradient-text">Embark on your</span>
            <br />
            <span className="gradient-text">Journey today</span>
          </h1>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
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
              className="pb-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="pb-3 text-foreground font-medium border-b-2 border-foreground"
            >
              Sign Up
            </Link>
          </div>

          <div className="glass-card-strong p-8">
            <h2 className="font-display text-3xl font-bold mb-2 text-center">
              Get Started
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              SignUp to your new PathFinder account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
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
              
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="border-muted-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-muted-foreground text-sm cursor-pointer">
                  I Agree to the Terms & Conditions
                </label>
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading || !agreeTerms}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-foreground font-semibold hover:text-accent transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
