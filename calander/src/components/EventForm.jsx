import React, { useState } from 'react';

const EventForm = ({ onAddEvent }) => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('birthday');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && name) {
      onAddEvent(date, name, type);
      setDate('');
      setName('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
      <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4">
        Add New Event
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 ml-1">Date</label>
          <input 
            type="date" 
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-slate-200 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 ml-1">Event Name</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Rahul's Birthday"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-slate-200 transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 ml-1">Category</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-slate-200 transition-all"
          >
            <option value="birthday">Birthday 🎂</option>
            <option value="holiday">Important Event ⭐</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-indigo-100 dark:shadow-none"
        >
          Add to Calendar
        </button>
      </form>
    </div>
  );
};

export default EventForm;