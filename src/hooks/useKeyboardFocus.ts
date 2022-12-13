import { useCallback, useState, useEffect } from "react";

const useKeyboardFocus = (listSize: number) => {
  const [currentFocus, setCurrentFocus] = useState(0);

  const handleKeyDown = useCallback(
    (e: { keyCode: number; preventDefault: () => void }) => {
      if (e.keyCode === 40) {
        e.preventDefault();
        // Down arrow
        setCurrentFocus(currentFocus === listSize - 1 ? 0 : currentFocus + 1);
      } else if (e.keyCode === 38) {
        e.preventDefault();
        // Up arrow
        setCurrentFocus(currentFocus === 0 ? listSize - 1 : currentFocus - 1);
      }
    },
    [listSize, currentFocus, setCurrentFocus]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return { currentFocus, setCurrentFocus };
};

export default useKeyboardFocus;
