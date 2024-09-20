import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      // console.log(key, JSON.parse(value));
      // console.log(key, JSON.stringify(value));

      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}