import { useState, useEffect, useCallback } from 'react';

const PADDING = 101;

const calcHeight = () => {
  const body = document.getElementById('MainBodyWrapper').offsetHeight;

  let taken = 0;
  document.querySelectorAll('.height-place-taker').forEach((element) => {
    taken += element.offsetHeight;
  });

  return body - taken - PADDING;
};

export const useResize = () => {
  const [elemHeight, setElemHeight] = useState(500);

  const resizeThrottler = useCallback(() => {
    setTimeout(() => {
      setElemHeight(calcHeight());
    }, 66);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeThrottler, false);
    resizeThrottler();
  }, [resizeThrottler]);

  return elemHeight;
};
