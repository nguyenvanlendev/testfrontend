import React from 'react';

export const SvgFilter: React.FC<ISvg> = ({width, height, color}) => {
  return (
    <svg width={width ? width : 20} height={height ? height : 13} viewBox="0 0 20 13" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 10.6306H19.2H0ZM0 2.69727H19.2H0Z" fill="white" />
      <path d="M0 2.69727H19.2M0 10.6306H19.2H0Z" stroke="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.0016 4.4C15.9957 4.4 16.8016 3.63888 16.8016 2.7C16.8016 1.76112 15.9957 1 15.0016 1C14.0074 1 13.2016 1.76112 13.2016 2.7C13.2016 3.63888 14.0074 4.4 15.0016 4.4ZM5.40156 12.3333C6.39567 12.3333 7.20156 11.5722 7.20156 10.6333C7.20156 9.69445 6.39567 8.93333 5.40156 8.93333C4.40745 8.93333 3.60156 9.69445 3.60156 10.6333C3.60156 11.5722 4.40745 12.3333 5.40156 12.3333Z" fill="white" stroke="white" />
    </svg>
  );
};
