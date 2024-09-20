import { useEffect, useRef } from 'react';

export function useOutsideClick(handlerFn, listenCapturingEvent = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // if ref (modal exist) && if clicked element doesn't include ref class
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log('clicked outside', ref.current);

        handlerFn();
      }
    }

    document.addEventListener('click', handleClick, listenCapturingEvent);

    // clean-up function
    return () => {
      document.removeEventListener('click', handleClick, listenCapturingEvent);
    };
  }, [handlerFn, listenCapturingEvent]);

  return ref;
}
