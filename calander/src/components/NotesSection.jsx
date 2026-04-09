// import React, { useState } from 'react';
// import { format } from 'date-fns';

// const NotesSection = ({ viewDate, globalNotes, setGlobalNotes }) => {
//   const monthKey = format(viewDate, 'yyyy-MM');
//   const [inputText, setInputText] = useState('');
  
//   const rawData = globalNotes[monthKey];
//   const currentMemos = Array.isArray(rawData) ? rawData : [];

//   const addMemo = () => {
//     if (!inputText.trim()) return;
//     const newMemo = {
//       id: Date.now(),
//       text: inputText,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     const updated = { ...globalNotes, [monthKey]: [...currentMemos, newMemo] };
//     setGlobalNotes(updated);
//     localStorage.setItem('calendar-app-notes', JSON.stringify(updated));
//     setInputText('');
//   };

//   const deleteMemo = (id) => {
//     const updated = { ...globalNotes, [monthKey]: currentMemos.filter(m => m.id !== id) };
//     setGlobalNotes(updated);
//     localStorage.setItem('calendar-app-notes', JSON.stringify(updated));
//   };

//   return (
//     <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 flex flex-col h-full transition-colors border border-transparent dark:border-slate-800">
//       <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4">
//         Monthly Memos ({currentMemos.length})
//       </h3>
      
//       <div className="flex-grow space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//         {currentMemos.length === 0 ? (
//           <p className="text-xs text-slate-400 dark:text-slate-500 italic">No memos for this month yet.</p>
//         ) : (
//           currentMemos.map((memo) => (
//             <div key={memo.id} className="group bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-start transition-all animate-memo bg-white dark:bg-slate-800">
//               <div>
//                 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{memo.text}</p>
//                 <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">{memo.timestamp}</span>
//               </div>
//               <button 
//                 onClick={() => deleteMemo(memo.id)}
//                 className="text-slate-300 hover:text-red-500 transition-colors"
//               >
//                 X
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="mt-auto space-y-2">
//         <textarea 
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Type a new memo..."
//           className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 resize-none h-20 transition-colors"
//         />
//         <button 
//           onClick={addMemo}
//           className="w-full bg-slate-900 dark:bg-indigo-600 text-white text-[10px] font-bold py-3 rounded-xl hover:opacity-90 transition-all uppercase tracking-widest"
//         >
//           Add Memo
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotesSection;

import React, { useState } from 'react';
import { format } from 'date-fns';

const NotesSection = ({ viewDate, globalNotes, setGlobalNotes }) => {
  const monthKey = format(viewDate, 'yyyy-MM');
  const [inputText, setInputText] = useState('');
  
  const rawData = globalNotes[monthKey];
  const currentMemos = Array.isArray(rawData) ? rawData : [];

  const addMemo = () => {
    if (!inputText.trim()) return;
    const newMemo = {
      id: Date.now(),
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = { ...globalNotes, [monthKey]: [...currentMemos, newMemo] };
    setGlobalNotes(updated);
    localStorage.setItem('calendar-app-notes', JSON.stringify(updated));
    setInputText('');
  };

  const deleteMemo = (id) => {
    const updated = { ...globalNotes, [monthKey]: currentMemos.filter(m => m.id !== id) };
    setGlobalNotes(updated);
    localStorage.setItem('calendar-app-notes', JSON.stringify(updated));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 flex flex-col h-full transition-all duration-500 animate-fade-in border border-transparent dark:border-slate-800">
      <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4 animate-slide-down">
        Monthly Memos ({currentMemos.length})
      </h3>
      
      <div className="flex-grow space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {currentMemos.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic animate-fade-in">
            No memos for this month yet.
          </p>
        ) : (
          currentMemos.map((memo, i) => (
            <div 
              key={memo.id} 
              style={{ animationDelay: `${i * 80}ms` }}
              className="group bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-start transition-all duration-300 animate-slide-up hover:scale-[1.02] hover:shadow-md"
            >
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {memo.text}
                </p>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                  {memo.timestamp}
                </span>
              </div>
              <button 
                onClick={() => deleteMemo(memo.id)}
                className="text-slate-300 hover:text-red-500 transition-all duration-200 hover:scale-125 active:scale-90"
              >
                X
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-auto space-y-2 animate-slide-up">
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a new memo..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 resize-none h-20 transition-all duration-300 focus:scale-[1.02]"
        />
        <button 
          onClick={addMemo}
          className="w-full bg-slate-900 dark:bg-indigo-600 text-white text-[10px] font-bold py-3 rounded-xl hover:opacity-90 transition-all duration-300 uppercase tracking-widest hover:scale-[1.02] active:scale-95"
        >
          Add Memo
        </button>
      </div>
    </div>
  );
};

export default NotesSection;