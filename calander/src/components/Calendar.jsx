import React, { useState, useEffect } from 'react';
import { 
  format, startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameDay, isAfter, isBefore, getDay, addMonths, subMonths 
} from 'date-fns';
import DayCell from './Daycell';
import Sidebar from './Sidebar';
import NotesSection from './NotesSection';
import EventForm from './EventForm';

const Calendar = () => {
  // navigation and range selection
  const [viewDate, setViewDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // Theme state - toggles dark class
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Data persistence states
  const [globalNotes, setGlobalNotes] = useState({});
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendar-app-events');
    return saved ? JSON.parse(saved) : {
      "2026-01-26": { name: "Republic Day", type: "holiday" },
      "2026-08-15": { name: "Independence Day", type: "holiday" },
      "2026-04-15": { name: "Mom's Birthday", type: "birthday" }
    };
  });

  // Load existing memos on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('calendar-app-notes') || '{}');
    setGlobalNotes(saved);
  }, []);

  // Update localStorage when events change [cite: 48]
  const handleAddEvent = (dateStr, name, type) => {
    const updated = { ...events, [dateStr]: { name, type } };
    setEvents(updated);
    localStorage.setItem('calendar-app-events', JSON.stringify(updated));
  };

  // Logic for day range selection 
  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (isBefore(day, startDate)) {
        setEndDate(startDate);
        setStartDate(day);
      } else if (!isSameDay(day, startDate)) {
        setEndDate(day);
      }
    }
  };

  // Calendar Grid Calculations
  const monthStart = startOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: endOfMonth(viewDate) });
  const prefixDays = getDay(monthStart);

  return (
    /* Dark Mode Toggle Wrapper */
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 lg:p-8 flex flex-col items-center transition-colors duration-500 animate-fade-in">
        
        {/*Theme Toggle Button  */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="mb-6 px-6 py-2 bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-200 transition-all active:scale-95 hover:scale-105"
        >
          {isDarkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
        </button>

        {/* Main Physical Calendar Card*/}
        <div className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white dark:border-slate-800 max-h-[90vh] animate-slide-up">
          
          <Sidebar 
            viewDate={viewDate} 
            setViewDate={setViewDate} 
            events={events} 
            subMonths={subMonths} 
            addMonths={addMonths} 
          />

          <div className="flex-1 flex flex-col p-6 lg:p-10 space-y-10 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 transition-colors">
            
            {/* Calendar Grid Section */}
            <section>
              <div className="grid grid-cols-7 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest animate-fade-in">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: prefixDays }).map((_, i) => <div key={i} />)}
                {days.map(day => (
                  <DayCell 
                    key={day.toString()} 
                    day={day} 
                    event={events[format(day, 'yyyy-MM-dd')]}
                    isStart={startDate && isSameDay(day, startDate)}
                    isEnd={endDate && isSameDay(day, endDate)}
                    inRange={startDate && endDate && isAfter(day, startDate) && isBefore(day, endDate)}
                    onClick={() => handleDateClick(day)}
                  />
                ))}
              </div>
            </section>

            {/* Forms Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <NotesSection 
                viewDate={viewDate} 
                globalNotes={globalNotes} 
                setGlobalNotes={setGlobalNotes} 
              />
              <EventForm onAddEvent={handleAddEvent} />
            </div>

            {/* Global Memo Archive  */}
            <section className="pt-8 border-t border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 text-center italic underline decoration-indigo-500/30 underline-offset-8 animate-fade-in">Memory Archive</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(globalNotes).flatMap(([monthKey, memoArray]) => 
                  Array.isArray(memoArray) ? memoArray.map(m => ({ ...m, monthKey })) : []
                ).sort((a, b) => b.id - a.id).slice(0, 6).map((memo) => (
                  <div key={memo.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-transparent dark:border-slate-800 shadow-sm hover:scale-[1.02] transition-transform animate-fade-in">
                    <p className="text-[9px] font-black text-indigo-500 dark:text-indigo-400 mb-2 uppercase tracking-tighter">{memo.monthKey}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed line-clamp-2 font-medium">"{memo.text}"</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;