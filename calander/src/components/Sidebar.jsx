
// import React from 'react';
// import { format } from 'date-fns';

// const Sidebar = ({ viewDate, setViewDate, events, subMonths, addMonths }) => (
//   <div className="lg:w-[320px] bg-[#0f172a] text-white flex flex-col relative shrink-0">
//     <div className="h-[280px] lg:h-[320px] relative overflow-hidden">
//       <img 
//         src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" 
//        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
//         alt="Hero" 
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" /> 
    
//       <div className="absolute bottom-4 left-4">
//         <div className=" px-5 py-4 shadow-xl">
//           <h1 className="text-3xl font-medium tracking-tight uppercase leading-none text-white  transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
//             {format(viewDate, 'MMM')}
//           </h1>
//           <p className="text-indigo-400 font-bold tracking-[0.3em] uppercase text-[12px] mt-1">
//             {format(viewDate, 'yyyy')}
//           </p>
//         </div>
//       </div>
//     </div>
    
//     <div className="p-6 space-y-6 flex-grow overflow-y-auto custom-scrollbar">
//       <div className="flex gap-2">
//         <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="flex-1 py-3 bg-slate-800/60 rounded-xl hover:bg-indigo-600 transition-all text-sm">←</button>
//         <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="flex-1 py-3 bg-slate-800/60 rounded-xl hover:bg-indigo-600 transition-all text-sm">→</button>
//       </div>

//       <div>
//         <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Upcoming Events</h3>
//         <div className="space-y-3">
//           {Object.entries(events).filter(([date]) => date.startsWith(format(viewDate, 'yyyy-MM'))).map(([date, e]) => (
//             <div key={date} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
//               <div className={`w-2 h-2 rounded-full ${e.type === 'birthday' ? 'bg-pink-500' : 'bg-yellow-400'}`} />
//               <div className="text-xs">
//                 <span className="text-slate-500 font-black mr-2">{format(new Date(date), 'dd')}</span>
//                 <span className="font-bold text-slate-200">{e.name}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Sidebar;

import React from 'react';
import { format } from 'date-fns';

const Sidebar = ({ viewDate, setViewDate, events, subMonths, addMonths }) => (
  <div className="lg:w-[320px] bg-[#0f172a] text-white flex flex-col relative shrink-0 animate-slide-left">
    
    <div className="h-[280px] lg:h-[320px] relative overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" 
        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
        alt="Hero" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" /> 
    
      <div className="absolute bottom-4 left-4 animate-fade-in">
        <div className="px-5 py-4 shadow-xl">
          <h1 className="text-3xl font-medium tracking-tight uppercase leading-none text-white animate-slide-up">
            {format(viewDate, 'MMM')}
          </h1>
          <p className="text-indigo-400 font-bold tracking-[0.3em] uppercase text-[12px] mt-1 animate-slide-up delay-100">
            {format(viewDate, 'yyyy')}
          </p>
        </div>
      </div>
    </div>
    
    <div className="p-6 space-y-6 flex-grow overflow-y-auto custom-scrollbar">
      
      <div className="flex gap-2">
        <button 
          onClick={() => setViewDate(subMonths(viewDate, 1))} 
          className="flex-1 py-3 bg-slate-800/60 rounded-xl hover:bg-indigo-600 transition-all duration-300 text-sm hover:scale-105 active:scale-95"
        >
          ←
        </button>
        <button 
          onClick={() => setViewDate(addMonths(viewDate, 1))} 
          className="flex-1 py-3 bg-slate-800/60 rounded-xl hover:bg-indigo-600 transition-all duration-300 text-sm hover:scale-105 active:scale-95"
        >
          →
        </button>
      </div>

      <div>
        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 animate-fade-in">
          Upcoming Events
        </h3>

        <div className="space-y-3">
          {Object.entries(events)
            .filter(([date]) => date.startsWith(format(viewDate, 'yyyy-MM')))
            .map(([date, e], i) => (
              <div 
                key={date} 
                style={{ animationDelay: `${i * 80}ms` }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 animate-slide-up hover:scale-[1.02] transition-all"
              >
                <div className={`w-2 h-2 rounded-full ${e.type === 'birthday' ? 'bg-pink-500' : 'bg-yellow-400'} animate-pulse`} />
                <div className="text-xs">
                  <span className="text-slate-500 font-black mr-2">
                    {format(new Date(date), 'dd')}
                  </span>
                  <span className="font-bold text-slate-200">{e.name}</span>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;