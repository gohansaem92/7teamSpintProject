import { useState, useEffect } from "react";

// 제네릭 타입 T를 사용하여 사용자가 입력하는 데이터의 타입에 따라 동적으로 타입을 결정
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
