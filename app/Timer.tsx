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
              timeout={200}
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
              timeout={200}
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
          className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          onClick={handleStartStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="cursor-pointer rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;