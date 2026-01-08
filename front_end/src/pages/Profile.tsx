
import { Link } from 'react-router-dom';
import { Sparkles, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Stars from '@/components/Stars';
import heroBg from '@/assets/hero-bg.jpg';
import { useEffect, useState } from 'react';

const navItems = ['Career', 'Resources', 'Performance', 'Profile'];

const Profile = () => {
  const [user, setUser] = useState<{ email: string; username: string; role: string; first_name: string; last_name: string; } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Redirect to login or home page
    window.location.href = '/login';
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-background/70" />
      <Stars />

      <div className="relative z-10 min-h-screen px-4 py-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-display text-xl font-bold tracking-wider text-accent">
              PATHFINDER
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                to={item === 'Profile' ? '/profile' : `/${item.toLowerCase()}`}
                key={item}
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              >
                {item}
              </Link>
            ))}
            {user && <span className="text-foreground/70">{user.first_name} {user.last_name}</span>}
          </nav>
        </div>

        {/* Profile Card */}
        <div className="glass-card p-6 mb-6 animate-fade-in-up">
          <h2 className="font-display text-lg font-semibold mb-4">Profile</h2>
          {user ? (
            <div>
              <p className="text-foreground/80 mb-2">Name: {user.first_name} {user.last_name}</p>
              {user.username && <p className="text-foreground/80 mb-2">Username: {user.username}</p>}
              <p className="text-foreground/80 mb-4">Email: {user.email}</p>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <p className="text-foreground/80">No user data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
