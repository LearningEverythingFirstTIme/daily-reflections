import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Calendar, BookOpen, Heart, Share2, ChevronLeft, ChevronRight, Sparkles, ArrowLeft, Trash2, Palette } from 'lucide-react';
import { reflections } from './data/reflections';
import { themes, defaultTheme, type Theme } from './data/themes';

type View = 'daily' | 'saved';

function App() {
  const [view, setView] = useState<View>('daily');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('aa-theme');
    return saved ? themes.find(t => t.id === saved) || defaultTheme : defaultTheme;
  });
  
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
  const themeRef = useRef<HTMLDivElement>(null);
  const reflection = reflections[currentIndex];

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('aa-theme', theme.id);
  }, [theme]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setShowThemePicker(false);
      }
    };
    
    if (showCalendar || showThemePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, showThemePicker]);

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
  }, [currentIndex, view, theme]);

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
        // Animate the new content in
        gsap.fromTo(contentRef.current, 
          { x: direction === 'next' ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
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
          // Animate the new content in
          gsap.fromTo(contentRef.current, 
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
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

  const removeFavorite = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.filter(i => i !== index));
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

  // Generate dynamic styles based on theme
  const dynamicStyles = {
    bg: { backgroundColor: theme.colors.bg },
    card: { 
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      borderColor: theme.colors.border,
      boxShadow: `${theme.shadowStyle} ${theme.colors.shadow}`,
    },
    header: {
      backgroundColor: theme.colors.headerBg,
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      borderColor: theme.colors.border,
    },
    buttonPrimary: {
      backgroundColor: theme.colors.buttonPrimary,
      color: '#FFFFFF',
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      borderColor: theme.id === 'neobrutalist' ? theme.colors.border : 'transparent',
      boxShadow: theme.id === 'neobrutalist' ? `2px 2px 0px 0px ${theme.colors.shadow}` : 'none',
    },
    buttonSecondary: {
      backgroundColor: theme.colors.buttonSecondary,
      color: '#FFFFFF',
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      borderColor: theme.id === 'neobrutalist' ? theme.colors.border : 'transparent',
      boxShadow: theme.id === 'neobrutalist' ? `2px 2px 0px 0px ${theme.colors.shadow}` : 'none',
    },
    accent: { backgroundColor: theme.colors.accent },
    accent2: { backgroundColor: theme.colors.accent2 },
    accent3: { backgroundColor: theme.colors.accent3 },
    accent4: { backgroundColor: theme.colors.accent4 },
    text: { color: theme.colors.text },
    textMuted: { color: theme.colors.textMuted },
  };

  // Saved Entries View
  if (view === 'saved') {
    return (
      <div ref={containerRef} className="min-h-screen p-4 md:p-8 transition-colors duration-300" style={dynamicStyles.bg}>
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-8">
          <div className="p-6 md:p-8" style={dynamicStyles.header}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3" style={{ backgroundColor: theme.colors.card, borderRadius: theme.borderRadius, borderWidth: theme.borderWidth, borderColor: theme.colors.border }}>
                  <Heart className="w-8 h-8" style={{ color: theme.colors.accent }} fill={theme.colors.accent} />
                </div>
                <div>
                  <h1 className={`font-bold text-2xl md:text-3xl text-white ${theme.fonts.heading}`}>
                    Saved Entries
                  </h1>
                  <p className={`text-white/80 text-sm ${theme.fonts.body}`}>
                    {favorites.length} reflection{favorites.length !== 1 ? 's' : ''} saved
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative" ref={themeRef}>
                  <button 
                    className="font-bold py-2 px-4 transition-all hover:opacity-90"
                    style={dynamicStyles.buttonSecondary}
                    onClick={() => setShowThemePicker(!showThemePicker)}
                  >
                    <Palette className="w-4 h-4 inline mr-2" />
                    Theme
                  </button>
                  
                  {showThemePicker && (
                    <div className="absolute right-0 top-full mt-2 p-4 z-50 w-72" style={{ ...dynamicStyles.card, backgroundColor: theme.colors.card }}>
                      <h3 className={`font-bold text-lg mb-3 ${theme.fonts.heading}`} style={dynamicStyles.text}>Select Theme</h3>
                      {themes.map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setTheme(t); setShowThemePicker(false); }}
                          className={`w-full text-left p-3 mb-2 rounded transition-all ${theme.id === t.id ? 'ring-2' : ''}`}
                          style={{ 
                            backgroundColor: theme.id === t.id ? theme.colors.accent + '20' : theme.colors.bg,
                            borderRadius: theme.borderRadius,
                            borderWidth: theme.borderWidth,
                            borderColor: theme.colors.border,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded flex-shrink-0" style={{ backgroundColor: t.colors.accent, borderRadius: t.borderRadius }} />
                            <div>
                              <p className={`font-bold text-sm ${theme.fonts.heading}`} style={dynamicStyles.text}>{t.name}</p>
                              <p className={`text-xs ${theme.fonts.body}`} style={dynamicStyles.textMuted}>{t.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  className="font-bold py-2 px-4 transition-all hover:opacity-90"
                  style={dynamicStyles.buttonPrimary}
                  onClick={() => setView('daily')}
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Back to Daily
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Saved Entries List */}
        <main className="max-w-4xl mx-auto px-2 sm:px-0">
          {favorites.length === 0 ? (
            <div className="p-8 text-center" style={dynamicStyles.card}>
              <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: theme.colors.textMuted }} />
              <h2 className={`font-bold text-xl mb-2 ${theme.fonts.heading}`} style={dynamicStyles.text}>
                No Saved Entries Yet
              </h2>
              <p className={`mb-6 ${theme.fonts.body}`} style={dynamicStyles.textMuted}>
                Click the heart button on any reflection to save it here.
              </p>
              <button 
                className="font-bold py-3 px-6 transition-all hover:opacity-90"
                style={dynamicStyles.buttonPrimary}
                onClick={() => setView('daily')}
              >
                Browse Reflections
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {favorites.sort((a, b) => a - b).map(index => {
                const fav = reflections[index];
                return (
                  <div
                    key={index}
                    className="p-6 transition-shadow hover:shadow-lg"
                    style={dynamicStyles.card}
                  >
                    <div className="flex items-start gap-4">
                      <div className="font-bold px-3 py-2 text-sm flex-shrink-0 text-white" 
                        style={{ backgroundColor: theme.colors.accent2, borderRadius: theme.borderRadius, borderWidth: theme.borderWidth, borderColor: theme.colors.border }}>
                        {fav.date}
                      </div>
                      <div className="flex-1 min-w-0">
                        <blockquote className={`text-lg font-medium mb-2 ${theme.fonts.heading}`} style={dynamicStyles.text}>
                          "{fav.quote}"
                        </blockquote>
                        <p className={`text-sm mb-3 ${theme.fonts.body}`} style={dynamicStyles.textMuted}>
                          {fav.source}
                        </p>
                        <p className={`text-sm line-clamp-2 ${theme.fonts.body}`} style={dynamicStyles.textMuted}>
                          {fav.text}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2 mt-4 pt-4" style={{ borderTopWidth: theme.borderWidth, borderColor: theme.colors.border }}>
                      <button
                        className="font-bold px-4 py-2 text-sm transition-all hover:opacity-90"
                        style={dynamicStyles.buttonPrimary}
                        onClick={() => {
                          setCurrentIndex(index);
                          setView('daily');
                        }}
                      >
                        View Full
                      </button>
                      <button
                        className="font-bold px-3 py-2 transition-all hover:opacity-90"
                        style={{ ...dynamicStyles.buttonSecondary, backgroundColor: theme.colors.accent4 }}
                        onClick={(e) => removeFavorite(index, e)}
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto mt-12 text-center">
          <p className={`text-sm ${theme.fonts.body}`} style={dynamicStyles.textMuted}>
            AA Daily Reflections · One Day at a Time
          </p>
        </footer>
      </div>
    );
  }

  // Daily View
  return (
    <div ref={containerRef} className="min-h-screen p-4 md:p-8 transition-colors duration-300" style={dynamicStyles.bg}>
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <div className="p-6 md:p-8" style={dynamicStyles.header}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3" style={{ backgroundColor: theme.colors.card, borderRadius: theme.borderRadius, borderWidth: theme.borderWidth, borderColor: theme.colors.border }}>
                <BookOpen className="w-8 h-8" style={{ color: theme.colors.accent }} />
              </div>
              <div>
                <h1 className={`font-bold text-2xl md:text-3xl text-white ${theme.fonts.heading}`}>
                  Daily Reflections
                </h1>
                <p className={`text-white/80 text-sm ${theme.fonts.body}`}>
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
              <div className="relative" ref={themeRef}>
                <button 
                  className="font-bold py-2 px-4 transition-all hover:opacity-90"
                  style={dynamicStyles.buttonSecondary}
                  onClick={() => setShowThemePicker(!showThemePicker)}
                >
                  <Palette className="w-4 h-4 inline mr-2" />
                  Theme
                </button>
                
                {showThemePicker && (
                  <div className="absolute right-0 top-full mt-2 p-4 z-50 w-72" style={{ ...dynamicStyles.card, backgroundColor: theme.colors.card }}>
                    <h3 className={`font-bold text-lg mb-3 ${theme.fonts.heading}`} style={dynamicStyles.text}>Select Theme</h3>
                    {themes.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t); setShowThemePicker(false); }}
                        className={`w-full text-left p-3 mb-2 rounded transition-all ${theme.id === t.id ? 'ring-2' : ''}`}
                        style={{ 
                          backgroundColor: theme.id === t.id ? theme.colors.accent + '20' : theme.colors.bg,
                          borderRadius: theme.borderRadius,
                          borderWidth: theme.borderWidth,
                          borderColor: theme.colors.border,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded flex-shrink-0" style={{ backgroundColor: t.colors.accent, borderRadius: t.borderRadius }} />
                          <div>
                            <p className={`font-bold text-sm ${theme.fonts.heading}`} style={dynamicStyles.text}>{t.name}</p>
                            <p className={`text-xs ${theme.fonts.body}`} style={dynamicStyles.textMuted}>{t.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative" ref={calendarRef}>
                <button 
                  className="font-bold py-2 px-4 transition-all hover:opacity-90"
                  style={dynamicStyles.buttonSecondary}
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Date
                </button>
                
                {showCalendar && (
                  <div className="absolute right-0 top-full mt-2 p-4 z-50 w-64" style={{ ...dynamicStyles.card, backgroundColor: theme.colors.card }}>
                    <div className="mb-3">
                      <label className={`font-bold text-sm block mb-2 ${theme.fonts.heading}`} style={dynamicStyles.text}>Month</label>
                      <select 
                        className={`w-full p-2 text-sm focus:outline-none focus:ring-2 ${theme.fonts.body}`}
                        style={{ 
                          borderRadius: theme.borderRadius, 
                          borderWidth: theme.borderWidth, 
                          borderColor: theme.colors.border,
                          backgroundColor: theme.colors.card,
                          color: theme.colors.text,
                        }}
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                      >
                        {availableMonths.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className={`font-bold text-sm block mb-2 ${theme.fonts.heading}`} style={dynamicStyles.text}>Day</label>
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
                              className={`aspect-square flex items-center justify-center text-sm font-body border-2`}
                              style={{
                                borderRadius: theme.borderRadius,
                                borderWidth: theme.borderWidth,
                                backgroundColor: isCurrent ? theme.colors.accent : hasReflection ? theme.colors.card : theme.colors.bg,
                                color: isCurrent ? '#FFFFFF' : hasReflection ? theme.colors.text : theme.colors.textMuted,
                                borderColor: isCurrent ? theme.colors.border : hasReflection ? theme.colors.border : 'transparent',
                                opacity: hasReflection ? 1 : 0.3,
                              }}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 flex justify-between" style={{ borderTopWidth: theme.borderWidth, borderColor: theme.colors.border }}>
                      <button 
                        className={`text-xs hover:opacity-70 ${theme.fonts.body}`}
                        style={dynamicStyles.textMuted}
                        onClick={() => setShowCalendar(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="font-bold text-xs py-1 px-3 transition-all hover:opacity-90"
                        style={dynamicStyles.buttonSecondary}
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
        <div className="overflow-hidden p-6 md:p-8" style={dynamicStyles.card} ref={contentRef}>
          {/* Date Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="font-bold px-3 py-2 text-sm sm:text-base text-white" 
              style={{ backgroundColor: theme.colors.accent2, borderRadius: theme.borderRadius, borderWidth: theme.borderWidth, borderColor: theme.colors.border }}>
              {reflection.date}
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-sm ${theme.fonts.body}`} style={dynamicStyles.textMuted}>
                {currentIndex + 1} / {reflections.length}
              </span>
            </div>
          </div>

          {/* Quote */}
          <div className="mb-8">
            <div className="flex gap-4">
              <Sparkles className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: theme.colors.accent3 }} />
              <blockquote className={`text-xl md:text-2xl font-medium leading-relaxed ${theme.fonts.heading}`} style={dynamicStyles.text}>
                "{reflection.quote}"
              </blockquote>
            </div>
          </div>

          {/* Source */}
          <div className="p-4 mb-8" style={{ backgroundColor: theme.colors.bg, borderRadius: theme.borderRadius, borderWidth: theme.borderWidth, borderColor: theme.colors.border }}>
            <p className={`text-sm mb-1 ${theme.fonts.body}`} style={dynamicStyles.textMuted}>Source:</p>
            <p className={`font-semibold ${theme.fonts.heading}`} style={{ color: theme.colors.accent2 }}>{reflection.source}</p>
          </div>

          {/* Reflection Text */}
          <div className="mb-8">
            <p className={`text-base leading-relaxed whitespace-pre-line ${theme.fonts.body}`} style={dynamicStyles.text}>
              {reflection.text}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTopWidth: theme.borderWidth, borderColor: theme.colors.border }}>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button 
                className={`font-bold px-3 py-2 text-sm flex items-center gap-1 transition-all hover:opacity-90 ${isFavorite ? '' : ''}`}
                style={{ 
                  ...dynamicStyles.buttonPrimary, 
                  backgroundColor: isFavorite ? theme.colors.accent4 : theme.colors.buttonPrimary 
                }}
                onClick={toggleFavorite}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              
              <button 
                className="font-bold px-3 py-2 text-sm flex items-center gap-1 transition-all hover:opacity-90"
                style={dynamicStyles.buttonSecondary}
                onClick={shareReflection}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                className="font-bold py-2 px-3 transition-all hover:opacity-90"
                style={dynamicStyles.buttonSecondary}
                onClick={() => handleNavigation('prev')}
                disabled={isAnimating}
                aria-label="Previous reflection"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                className="font-bold py-2 px-3 transition-all hover:opacity-90"
                style={dynamicStyles.buttonPrimary}
                onClick={() => handleNavigation('next')}
                disabled={isAnimating}
                aria-label="Next reflection"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Saved Entries Button */}
        <div className="mt-8 text-center">
          <button 
            className="font-bold inline-flex items-center gap-2 py-3 px-6 transition-all hover:opacity-90"
            style={dynamicStyles.buttonPrimary}
            onClick={() => setView('saved')}
          >
            <Heart className="w-5 h-5" />
            Saved Entries
            {favorites.length > 0 && (
              <span className="font-bold px-2 py-0.5 text-sm" 
                style={{ backgroundColor: theme.colors.card, color: theme.colors.accent, borderRadius: theme.borderRadius }}>
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-12 text-center">
        <p className={`text-sm ${theme.fonts.body}`} style={dynamicStyles.textMuted}>
          AA Daily Reflections · One Day at a Time
        </p>
      </footer>
    </div>
  );
}

export default App;
