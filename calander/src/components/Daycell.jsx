// import React from 'react';
// import { format } from 'date-fns';

// const DayCell = ({ day, event, isStart, isEnd, inRange, onClick }) => {
//   // Logic for dynamic coloring
//   const getEventStyles = () => {
//     if (isStart || isEnd) return 'bg-indigo-600 text-white shadow-xl scale-110 z-10';
//     if (inRange) return 'bg-indigo-50 text-indigo-600 rounded-none';
    
    
//     if (event) {
//       if (event.type === 'birthday') return 'bg-pink-100 text-pink-700 hover:bg-pink-200';
//       if (event.type === 'holiday') return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
//     }
    
//     return 'hover:bg-slate-100 text-slate-700';
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={`
//     relative aspect-square flex flex-col items-center justify-center rounded-2xl 
//     transition-all duration-300 ease-out
//     hover:scale-105 active:scale-95 hover:rotate-1
//     ${getEventStyles()}
//   `}
//     >
//       <span className="text-sm font-bold">{format(day, 'd')}</span>
      
//       {event && (
//         <div className="absolute top-2 right-2 text-[10px]">
//           {event.type === 'birthday' ? '🎂' : '⭐'}
//         </div>
//       )}

//       {event && (
//         <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-50">
//           {event.name}
//         </div>
//       )}
//     </button>
//   );
// };

// export default DayCell;
import React from 'react';
import { format } from 'date-fns';

const DayCell = ({ day, event, isStart, isEnd, inRange, onClick }) => {

  const getEventStyles = () => {
    if (isStart || isEnd) return 'bg-indigo-600 text-white shadow-xl scale-110 z-10 animate-pop';
    if (inRange) return 'bg-indigo-50 text-indigo-600 rounded-none';
    
    if (event) {
      if (event.type === 'birthday') return 'bg-pink-100 text-pink-700 hover:bg-pink-200';
      if (event.type === 'holiday') return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    }
    
    return 'hover:bg-slate-100 text-slate-700';
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative aspect-square flex flex-col items-center justify-center rounded-2xl 
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95 hover:rotate-1
        animate-fade-in
        ${getEventStyles()}
      `}
    >
      <span className="text-sm font-bold">{format(day, 'd')}</span>
      
      {event && (
        <div className="absolute top-2 right-2 text-[10px] animate-bounce">
          {event.type === 'birthday' ? '🎂' : '⭐'}
        </div>
      )}

      {event && (
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-50 animate-fade-in">
          {event.name}
        </div>
      )}
    </button>
  );
};

export default DayCell;