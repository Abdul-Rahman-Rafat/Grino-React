import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/localStorage";

const initialTimer = { hours: 1, minutes: 1, seconds: 10 };

function normalizeTimer(savedTimer) {
  if (!savedTimer || typeof savedTimer !== "object") {
    return initialTimer;
  }
  return {
    hours: Number(savedTimer.hours ?? savedTimer.h ?? initialTimer.hours),
    minutes: Number(savedTimer.minutes ?? savedTimer.m ?? initialTimer.minutes),
    seconds: Number(savedTimer.seconds ?? savedTimer.s ?? initialTimer.seconds),
  };
}

export function useTimer() {
  const [timer, setTimer] = useState(() =>
    normalizeTimer(getFromStorage("timer", initialTimer)),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((current) => {
        if (current.hours === 0 && current.minutes === 0 && current.seconds === 0) {
          localStorage.removeItem("timer");
          return current;
        }

        const totalSeconds =
          current.hours * 3600 + current.minutes * 60 + current.seconds - 1;
        const nextTimer = {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
        saveToStorage("timer", nextTimer);
        return nextTimer;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    ...timer,
    isFinished: timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0,
  };
}
