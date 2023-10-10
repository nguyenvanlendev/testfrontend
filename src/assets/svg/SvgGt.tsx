import React from 'react';

type Props = {
  className?: string;
};

export const SvgGt: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className || ''}
      width="7"
      height="10"
      viewBox="0 0 7 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.335678 8.95925C-0.0450773 9.25138 -0.137048 9.62858 0.243707 9.9207C0.360254 9.99401 0.641326 10.0722 0.912654 9.87743L6.58943 5.52894C6.77981 5.38288 6.875 5.19144 6.875 5C6.875 4.80856 6.77981 4.61712 6.58943 4.47106L0.912655 0.122572C0.641327 -0.072167 0.360255 0.00598851 0.243708 0.0792955C-0.137047 0.371419 -0.0450765 0.748622 0.335678 1.04075L5.49616 5L0.335678 8.95925Z"
        fill="white"
      />
    </svg>
  );
};
