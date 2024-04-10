import { useEffect, useState } from "react";

// Define the interface for the TimerHook
interface TimerHook {
  formatedValue: string;
  isActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

// Define the custom hook
export const useTimer = (initialTime = 0): TimerHook => {
  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Function to start the timer
  const startTimer = () => {
    setIsActive(true);
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsActive(false);
    if (timerId) {
      clearInterval(timerId);
    }
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTime(initialTime);
    setIsActive(false);
    if (timerId) {
      clearInterval(timerId);
    }
  };

  // Effect to handle the timer
  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            stopTimer();
            resetTimer();
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      setTimerId(id);
      return () => clearInterval(id);
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    }
  }, [isActive]);

  const formatedValue =
    Math.floor(time / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (time % 60).toString().padStart(2, "0");

  return {
    formatedValue,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
