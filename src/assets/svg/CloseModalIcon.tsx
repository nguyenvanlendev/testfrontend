const CloseModalIcon = ({
  width = '36px',
  height = width,
  className,
  onClick,
}: {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      className={className ? className : ''}
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g filter="url(#filter0_d_396_32035)">
        <rect x="4" width="36" height="36" rx="18" fill="url(#paint0_linear_396_32035)" />
        <rect x="4" width="36" height="36" rx="18" fill="url(#paint1_linear_396_32035)" />
        <rect x="4" width="36" height="36" rx="18" fill="url(#paint2_linear_396_32035)" />
        <rect x="4" width="36" height="36" rx="18" fill="url(#paint3_linear_396_32035)" />
      </g>
      <path
        d="M27.3999 23.3977L16.5999 12.5977M27.3999 12.5977L16.5999 23.3977"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
      <defs>
        <filter
          id="filter0_d_396_32035"
          x="0"
          y="0"
          width="44"
          height="44"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_396_32035" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_396_32035" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_396_32035" x1="22" y1="0" x2="22" y2="36" gradientUnits="userSpaceOnUse">
          <stop stop-color="#58C2FE" />
          <stop offset="1" stop-color="#5058FE" />
        </linearGradient>
        <linearGradient id="paint1_linear_396_32035" x1="22" y1="0" x2="22" y2="36" gradientUnits="userSpaceOnUse">
          <stop stop-color="#70D0C9" />
          <stop offset="1" stop-color="#5DA9D6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_396_32035"
          x1="4"
          y1="-3"
          x2="40.3179"
          y2="-2.66694"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FEA23D" />
          <stop offset="1" stop-color="#FF3B4E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_396_32035"
          x1="38.2"
          y1="0.725978"
          x2="34.747"
          y2="31.2507"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FEA897" />
          <stop offset="1" stop-color="#F5775F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CloseModalIcon;
