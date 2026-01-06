import { Link } from 'react-router-dom';
import { Sparkles, Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Stars from '@/components/Stars';
import heroBg from '@/assets/hero-bg.jpg';
import { useEffect, useState } from 'react';

const navItems = ['Career', 'Resources', 'Performance', 'Profile'];

// Mock data for display
const subjectScores = [
  { name: 'SUB1', score: 60, color: '#94a3b8' },
  { name: 'SUB2', score: 85, color: '#94a3b8' },
  { name: 'SUB3', score: 30, color: '#94a3b8' },
  { name: 'SUB4', score: 55, color: '#94a3b8' },
  { name: 'SUB5', score: 65, color: '#94a3b8' },
  { name: 'SUB6', score: 40, color: '#94a3b8' },
];

const roadmapPoints = [
  { x: 10, y: 60, color: '#22d3ee' },
  { x: 25, y: 30, color: '#f472b6' },
  { x: 40, y: 50, color: '#4ade80' },
  { x: 50, y: 50, color: '#facc15' },
  { x: 65, y: 30, color: '#94a3b8' },
  { x: 78, y: 60, color: '#94a3b8' },
  { x: 90, y: 70, color: '#64748b' },
];

const Dashboard = () => {
  const [user, setUser] = useState<{ email: string; username: string; role: string; first_name: string; last_name: string; } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

        {/* Roadmap Progress */}
        <div className="glass-card p-6 mb-6 animate-fade-in-up">
          <h2 className="font-display text-lg font-semibold mb-4">RoadMap Progress</h2>
          <div className="h-40 relative">
            {/* Custom SVG Chart */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Connection lines */}
              <path
                d={`M ${roadmapPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke="url(#roadmapGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="30%" stopColor="#f472b6" />
                  <stop offset="50%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>
              {/* Points */}
              {roadmapPoints.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={point.color}
                  className="drop-shadow-lg"
                />
              ))}
            </svg>
          </div>
          <div className="text-right">
            <button className="text-accent text-sm hover:underline">View Full</button>
          </div>
        </div>

        {/* Subject-wise Score & CGPA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bar Chart */}
          <div className="glass-card p-6 animate-fade-in-up animation-delay-200">
            <h2 className="font-display text-lg font-semibold mb-4">Subject-wise Score</h2>
          <div className="h-40 flex items-end gap-3 pt-4">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-full text-xs text-muted-foreground pr-2">
                <span>O</span>
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
                <span>E</span>
                <span>F</span>
              </div>
              {/* Bars */}
              <div className="flex items-end justify-around flex-1 h-full gap-2">
                {subjectScores.map((subject) => (
                  <div key={subject.name} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full flex items-end justify-center h-full">
                      <div 
                        className="w-6 bg-muted-foreground/60 rounded-t-sm transition-all duration-500 hover:bg-accent/70"
                        style={{ height: `${subject.score}%`, minHeight: '8px' }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{subject.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CGPA Line Chart */}
          <div className="glass-card p-6 animate-fade-in-up animation-delay-400">
            <h2 className="font-display text-lg font-semibold mb-4">CGPA</h2>
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 10,70 L 30,55 L 50,45 L 70,50 L 90,35"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                {[
                  { x: 10, y: 70 },
                  { x: 30, y: 55 },
                  { x: 50, y: 45 },
                  { x: 70, y: 50 },
                  { x: 90, y: 35 },
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#f8fafc"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Task Progress */}
        <div className="glass-card p-6 mb-6 animate-fade-in-up animation-delay-600">
          <h2 className="font-display text-lg font-semibold mb-4">Task Progress</h2>
          <div className="flex flex-col items-center gap-4">
            {/* Circular Progress */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray={`${70 * 2.51} ${100 * 2.51}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">70%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="mb-6 animate-fade-in-up animation-delay-800">
          <p className="text-foreground/80 text-sm flex items-start gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-0.5" />
            You're strong in Algorithms but need improvement in Databases.
          </p>
        </div>

        {/* Download Button */}
        <Button variant="accent" size="sm" className="animate-fade-in-up animation-delay-800">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;