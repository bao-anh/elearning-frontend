import React, { useEffect, useState } from 'react';

import { convertSecondToMinute } from '../../utils';

const Timer: React.FC<{
  duration: any;
  isOpen: any;
  isSubmit: any;
  setIsSubmit: any;
  setIsFetchApiSuccess: any;
}> = React.memo(
  ({ duration, isOpen, isSubmit, setIsSubmit, setIsFetchApiSuccess }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
      const myTimeOut = setTimeout(() => {
        if (isOpen === true && !isSubmit) {
          setTimeLeft(timeLeft - 1);
          if (timeLeft <= 0) {
            setIsSubmit(true);
            setIsFetchApiSuccess(true);
          }
        } else {
          setTimeLeft(duration);
        }
      }, 1000);

      return () => {
        clearTimeout(myTimeOut);
      };
    });

    return <div>{convertSecondToMinute(timeLeft)}</div>;
  }
);

export default Timer;
