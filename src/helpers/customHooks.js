import { useEffect, useCallback, useRef, useState } from 'react';

// Debounce Hook
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

// Use localstorage Hook
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// =======================================================

// make API calls and pass the returned data via dispatch
// export const useFetch = (data, dispatch) => {
//   useEffect(() => {
//     getPropertyList(data.page);
//   }, [dispatch, data.page]);
// };

// // infinite scrolling with intersection observer
// export const useInfiniteScroll = (scrollRef, dispatch) => {
//   const scrollObserver = useCallback(
//     (node) => {
//       new IntersectionObserver((entries) => {
//         entries.forEach((en) => {
//           if (en.intersectionRatio > 0) {
//             dispatch({ type: 'ADVANCE_PAGE' });
//           }
//         });
//       }).observe(node);
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollObserver(scrollRef.current);
//     }
//   }, [scrollObserver, scrollRef]);
// };

// lazy load images with intersection observer
// export const useLazyLoading = (imgSelector, items) => {
//   const imgObserver = useCallback((node) => {
//     const intObs = new IntersectionObserver((entries) => {
//       entries.forEach((en) => {
//         if (en.intersectionRatio > 0) {
//           const currentImg = en.target;
//           const newImgSrc = currentImg.dataset.src;

//           // only swap out the image source if the new url exists
//           if (!newImgSrc) {
//             console.error('Image source is invalid');
//           } else {
//             currentImg.src = newImgSrc;
//           }
//           intObs.unobserve(node);
//         }
//       });
//     });
//     intObs.observe(node);
//   }, []);

//   const imagesRef = useRef(null);

//   useEffect(() => {
//     imagesRef.current = document.querySelectorAll(imgSelector);

//     if (imagesRef.current) {
//       imagesRef.current.forEach((img) => imgObserver(img));
//     }
//   }, [imgObserver, imagesRef, imgSelector, items]);
// };
