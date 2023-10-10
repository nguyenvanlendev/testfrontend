import React from 'react';

type Props = {
  color?: string;
};

export const SvgPreMonth: React.FC<Props> = ({ color }) => {
  return (
    <svg width="48px" height="48px" viewBox="0 0 48 48">
      <g
        transform="translate(-1455 -596) translate(1442 384) translate(20 40) translate(0 60) matrix(-1 0 0 1 34 119)"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <use fill="#000" filter="url(#filter-2)" xlinkHref="#path-1" />
        <use fill="#FFF" xlinkHref="#path-1" />
        <path
          stroke={color || '#488DFF'}
          strokeWidth={2}
          strokeLinecap="square"
          d="M15 12L20 17 15 22"
        />
      </g>
    </svg>
  );
};
