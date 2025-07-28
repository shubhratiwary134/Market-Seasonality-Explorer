import { useCallback } from "react";
import { addDays, isSameMonth } from "date-fns";

interface UseKeyboardNavigationProps {
  date: Date;
  setDate: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
}

export const useKeyboardNavigation = ({
  date,
  setDate,
  setCurrentMonth,
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      let newDate: Date | null = null;

      switch (e.key) {
        case "ArrowRight":
          newDate = addDays(date, 1);
          break;
        case "ArrowLeft":
          newDate = addDays(date, -1);
          break;
        case "ArrowUp":
          newDate = addDays(date, -7);
          break;
        case "ArrowDown":
          newDate = addDays(date, 7);
          break;
        default:
          return;
      }

      if (newDate) {
        if (!isSameMonth(newDate, date)) {
          setCurrentMonth(newDate);
        }
        setDate(newDate);
      }
    },
    [date, setDate, setCurrentMonth]
  );

  return { handleKeyDown };
};
