"use client";
import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./Timer.css";

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const minutesRef = useRef<HTMLSpanElement | null>(null);
  const secondsRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return { minutes, seconds };
  };

  const { minutes, seconds } = formatTime(time);

  const handleStartStop = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <div className="relative h-10 w-32 overflow-hidden text-2xl">
        <div className="flex justify-between w-full">
          <SwitchTransition>
            <CSSTransition
              key={minutes}
              timeout={300}
              classNames="fade"
              nodeRef={minutesRef} // 👈 required for React 18+
            >
              <span ref={minutesRef} className="absolute inset-0">
                {String(minutes).padStart(2, "0")}
              </span>
            </CSSTransition>
          </SwitchTransition>
          <span className="text-xl pl-8">:</span>
          <SwitchTransition>
            <CSSTransition
              key={seconds}
              timeout={300}
              classNames="fade"
              nodeRef={secondsRef} // 👈 required for React 18+
            >
              <span ref={secondsRef} className="absolute pl-10 inset-0">
                {String(seconds).padStart(2, "0")}
              </span>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>

      <div className="py-4 flex gap-4 items-center flex-col sm:flex-row">
        <button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          onClick={handleStartStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;


// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
// import "./Timer.css";

// const Timer: React.FC = () => {
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const nodeRef = useRef<HTMLSpanElement | null>(null); // this is the key

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setTime((prev) => prev + 1000);
//       }, 1000);
//     } else {
//       clearInterval(intervalRef.current!);
//     }

//     return () => clearInterval(intervalRef.current!);
//   }, [isRunning]);

//   const formatTime = (ms: number): string => {
//     const minutes = Math.floor(ms / 60000);
//     const seconds = Math.floor((ms % 60000) / 1000);
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleStartStop = () => setIsRunning((prev) => !prev);
//   const handleReset = () => {
//     setTime(0);
//     setIsRunning(false);
//   };

//   return (
//     <div>
//       <div className="relative h-10 w-32 overflow-hidden text-2xl">
//         <SwitchTransition>
//           <CSSTransition
//             key={formatTime(time)}
//             timeout={300}
//             classNames="fade"
//             nodeRef={nodeRef} // 👈 required for React 18+
//           >
//             <span ref={nodeRef} className="absolute inset-0">
//               {formatTime(time)}
//             </span>
//           </CSSTransition>
//         </SwitchTransition>
//       </div>

//       <div className="py-4 flex gap-4 items-center flex-col sm:flex-row">
//         <button
//           className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto md:w-[158px]"
//           onClick={handleStartStop}
//         >
//           {isRunning ? "Stop" : "Start"}
//         </button>
//         <button
//           className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//           onClick={handleReset}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Timer;




// "use client";
// import React, { useState, useEffect, useRef } from 'react';

// const Timer: React.FC = () => {
//   const [time, setTime] = useState<number>(0);
//   const [isRunning, setIsRunning] = useState<boolean>(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setTime((prevTime) => prevTime + 10);
//       }, 10);
//     } else if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isRunning]);

//   const handleStartStop = (): void => {
//     setIsRunning((prev) => !prev);
//   };

//   const handleReset = (): void => {
//     setTime(0);
//     setIsRunning(false);
//   };

//   const formatTime = (ms: number): string => {
//     const minutes = Math.floor(ms / 60000);
//     const seconds = Math.floor((ms % 60000) / 1000);
//     const milliseconds = Math.floor((ms % 1000) / 10);
//     // return `${minutes.toString().padStart(2, '0')}:${seconds
//     //   .toString()
//     //   .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div>
//       <p className='text-2xl '>{formatTime(time)}</p>
      
//       <div className="py-4 flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto md:w-[158px]"
//             onClick={handleStartStop}>
//                 {isRunning ? 'Stop' : 'Start'}
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             onClick={handleReset}>
//                 Reset
//           </a>
//         </div>


//     </div>
//   );
// };

// export default Timer;