import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Calendar, BookOpen, Heart, Share2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { reflections } from './data/reflections';

function App() {
  const getTodayIndex = () => {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[today.getMonth()];
    const day = today.getDate();
    const dateString = `${monthName} ${day}`;
    
    const index = reflections.findIndex(r => r.date === dateString);
    return index !== -1 ? index : 0;
  };

  const [currentIndex, setCurrentIndex] = useState(getTodayIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('aa-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const reflection = reflections[currentIndex];

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  useEffect(() => {
    localStorage.setItem('aa-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.brutal-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1
      });
      
      // Only animate the card buttons, not the header buttons
      gsap.from('.action-btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out(2)',
        stagger: 0.05,
        delay: 0.3
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [currentIndex]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(prev => {
          if (direction === 'next') {
            return (prev + 1) % reflections.length;
          }
          return prev === 0 ? reflections.length - 1 : prev - 1;
        });
        setIsAnimating(false);
      }
    });
    
    tl.to(contentRef.current, {
      x: direction === 'next' ? -50 : 50,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    });
  };

  const jumpToDate = (month: string, day: number) => {
    const dateString = `${month} ${day}`;
    const index = reflections.findIndex(r => r.date === dateString);
    if (index !== -1) {
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(index);
          setIsAnimating(false);
          setShowCalendar(false);
        }
      });
      tl.to(contentRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  };

  const toggleFavorite = () => {
    setFavorites(prev => {
      if (prev.includes(currentIndex)) {
        return prev.filter(i => i !== currentIndex);
      }
      return [...prev, currentIndex];
    });
    
    gsap.to('.favorite-btn', {
      scale: 1.2,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
  };

  const shareReflection = () => {
    const text = `"${reflection.quote}" - ${reflection.source}`;
    navigator.clipboard.writeText(text);
    
    gsap.to('.share-btn', {
      rotation: 360,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const isFavorite = favorites.includes(currentIndex);

  // Get available months from reflections data
  const availableMonths = [...new Set(reflections.map(r => r.date.split(' ')[0]))];
  
  // Get days for selected month
  const daysInMonth = reflections
    .filter(r => r.date.startsWith(selectedMonth))
    .map(r => parseInt(r.date.split(' ')[1]));
  const maxDay = Math.max(...daysInMonth);

  return (
    <div ref={containerRef} className="min-h-screen bg-brutal-bg p-4 md:p-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <div className="brutal-panel bg-brutal-accent p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 border-2 border-brutal-dark">
                <BookOpen className="w-8 h-8 text-brutal-accent" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">
                  Daily Reflections
                </h1>
                <p className="font-body text-white/80 text-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative" ref={calendarRef}>
                <button 
                  className="brutal-btn-secondary text-sm py-2 px-4"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Date
                </button>
                
                {showCalendar && (
                  <div className="absolute right-0 top-full mt-2 bg-white border-2 border-brutal-dark shadow-brutal p-4 z-50 w-64">
                    <div className="mb-3">
                      <label className="font-heading font-bold text-sm block mb-2">Month</label>
                      <select 
                        className="w-full border-2 border-brutal-dark p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brutal-accent"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                      >
                        {availableMonths.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="font-heading font-bold text-sm block mb-2">Day</label>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: maxDay }, (_, i) => i + 1).map(day => {
                          const dateString = `${selectedMonth} ${day}`;
                          const hasReflection = reflections.some(r => r.date === dateString);
                          const isCurrent = reflection.date === dateString;
                          
                          return (
                            <button
                              key={day}
                              onClick={() => hasReflection && jumpToDate(selectedMonth, day)}
                              disabled={!hasReflection}
                              className={`
                                aspect-square flex items-center justify-center text-sm font-body border-2
                                ${isCurrent 
                                  ? 'bg-brutal-accent text-white border-brutal-dark' 
                                  : hasReflection 
                                    ? 'bg-white hover:bg-brutal-bg border-brutal-dark/30' 
                                    : 'bg-brutal-bg/50 text-brutal-text/30 border-transparent cursor-not-allowed'
                                }
                              `}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-brutal-dark/10 flex justify-between">
                      <button 
                        className="text-xs font-body text-brutal-text/60 hover:text-brutal-accent"
                        onClick={() => setShowCalendar(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="brutal-btn-secondary text-xs py-1 px-3"
                        onClick={() => {
                          setCurrentIndex(getTodayIndex());
                          setShowCalendar(false);
                        }}
                      >
                        Go to Today
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-2 sm:px-0">
        <div className="brutal-card bg-white overflow-hidden" ref={contentRef}>
          {/* Date Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-brutal-accent2 text-white font-heading font-bold px-3 py-2 border-2 border-brutal-dark text-sm sm:text-base">
              {reflection.date}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-brutal-text/60">
                {currentIndex + 1} / {reflections.length}
              </span>
            </div>
          </div>

          {/* Quote */}
          <div className="mb-8">
            <div className="flex gap-4">
              <Sparkles className="w-8 h-8 text-brutal-accent3 flex-shrink-0 mt-1" />
              <blockquote className="font-heading text-xl md:text-2xl font-medium leading-relaxed text-brutal-dark">
                "{reflection.quote}"
              </blockquote>
            </div>
          </div>

          {/* Source */}
          <div className="bg-brutal-bg border-2 border-brutal-dark p-4 mb-8">
            <p className="font-body text-sm text-brutal-text/70 mb-1">Source:</p>
            <p className="font-heading font-semibold text-brutal-accent2">{reflection.source}</p>
          </div>

          {/* Reflection Text */}
          <div className="mb-8">
            <p className="font-body text-base leading-relaxed text-brutal-text/90 whitespace-pre-line">
              {reflection.text}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t-2 border-brutal-dark/10">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button 
                className={`action-btn bg-brutal-accent text-white font-heading font-bold px-3 py-2 border-2 border-brutal-dark shadow-brutal text-sm flex items-center gap-1 ${isFavorite ? '!bg-brutal-accent4' : ''}`}
                onClick={toggleFavorite}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              
              <button 
                className="action-btn bg-brutal-accent2 text-white font-heading font-bold px-3 py-2 border-2 border-brutal-dark shadow-brutal text-sm flex items-center gap-1"
                onClick={shareReflection}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                className="action-btn bg-brutal-accent2 text-white font-heading font-bold py-2 px-3 border-2 border-brutal-dark shadow-brutal"
                onClick={() => handleNavigation('prev')}
                disabled={isAnimating}
                aria-label="Previous reflection"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                className="action-btn bg-brutal-accent text-white font-heading font-bold py-2 px-3 border-2 border-brutal-dark shadow-brutal"
                onClick={() => handleNavigation('next')}
                disabled={isAnimating}
                aria-label="Next reflection"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-8 brutal-card bg-brutal-accent3">
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-brutal-dark" />
              Saved Reflections ({favorites.length})
            </h3>
            
            <div className="grid gap-3">
              {favorites.map(index => {
                const fav = reflections[index];
                return (
                  <button
                    key={index}
                    className="text-left bg-white border-2 border-brutal-dark p-3 hover:bg-brutal-bg transition-colors"
                    onClick={() => setCurrentIndex(index)}
                  >
                    <p className="font-heading font-medium text-sm truncate">"{fav.quote}"</p>
                    <p className="font-body text-xs text-brutal-text/60 mt-1">{fav.date}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-12 text-center">
        <p className="font-body text-sm text-brutal-text/50">
          AA Daily Reflections · One Day at a Time
        </p>
      </footer>
    </div>
  );
}

export default App;
