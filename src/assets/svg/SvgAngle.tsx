import React from 'react';

interface ISvg {
  className?: string;
}

export const SvgAngle: React.FC<ISvg> = ({ className }) => {
  return (
    <svg
      className={className || ''}
      width='21'
      height='16'
      viewBox='0 0 21 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.0497 14.1302C18.6163 14.9359 19.348 15.1305 19.9146 14.3248C20.0568 14.0782 20.2084 13.4835 19.8306 12.9093L11.3961 0.897341C11.1128 0.494505 10.7414 0.293088 10.3701 0.293088C9.9988 0.293088 9.62747 0.494505 9.34416 0.897341L0.909595 12.9093C0.531867 13.4835 0.683463 14.0782 0.825652 14.3248C1.39227 15.1305 2.12392 14.9359 2.69054 14.1302L10.3701 3.21069L18.0497 14.1302Z'
        fill='white'
      />
      <path
        d='M19.9146 14.3248L20.119 14.4686L20.1255 14.4594L20.1311 14.4497L19.9146 14.3248ZM18.0497 14.1302L17.8452 14.274L18.0497 14.1302ZM19.8306 12.9093L20.0396 12.7719L20.0352 12.7657L19.8306 12.9093ZM11.396 0.897344L11.6006 0.75368L11.6005 0.753527L11.396 0.897344ZM9.34412 0.897344L9.13963 0.753527L9.13953 0.75368L9.34412 0.897344ZM0.909557 12.9093L0.704864 12.7656L0.700704 12.7719L0.909557 12.9093ZM0.825614 14.3248L0.609035 14.4497L0.614652 14.4594L0.621122 14.4686L0.825614 14.3248ZM2.6905 14.1302L2.48601 13.9864L2.6905 14.1302ZM10.3701 3.21069L10.5746 3.06687L10.3701 2.77611L10.1656 3.06687L10.3701 3.21069ZM19.7101 14.181C19.4623 14.5333 19.2216 14.6149 19.0192 14.5845C18.7924 14.5505 18.52 14.3645 18.2542 13.9864L17.8452 14.274C18.1459 14.7016 18.5227 15.0157 18.9451 15.079C19.3918 15.146 19.8002 14.9221 20.119 14.4686L19.7101 14.181ZM19.6218 13.0467C19.9347 13.5224 19.8059 14.0127 19.698 14.2L20.1311 14.4497C20.3076 14.1437 20.482 13.4446 20.0395 12.7719L19.6218 13.0467ZM11.1914 1.04101L19.626 13.053L20.0352 12.7657L11.6006 0.75368L11.1914 1.04101ZM10.3701 0.54309C10.6442 0.54309 10.9451 0.690774 11.1916 1.04116L11.6005 0.753527C11.2803 0.298242 10.8386 0.0430904 10.3701 0.0430904L10.3701 0.54309ZM10.3701 0.0430904C9.90152 0.0430904 9.45983 0.298242 9.13963 0.753527L9.54862 1.04116C9.79504 0.690774 10.096 0.54309 10.3701 0.54309L10.3701 0.0430904ZM9.13953 0.75368L0.704957 12.7657L1.11415 13.053L9.54872 1.04101L9.13953 0.75368ZM0.700704 12.7719C0.258165 13.4446 0.432611 14.1437 0.609035 14.4497L1.04219 14.2C0.93424 14.0127 0.805494 13.5224 1.11841 13.0467L0.700704 12.7719ZM0.621122 14.4686C0.940011 14.9221 1.3484 15.146 1.79512 15.079C2.21743 15.0157 2.59426 14.7016 2.89499 14.274L2.48601 13.9864C2.22012 14.3645 1.94781 14.5505 1.72099 14.5845C1.51858 14.6149 1.27784 14.5333 1.0301 14.181L0.621122 14.4686ZM2.89499 14.274L10.5746 3.35451L10.1656 3.06687L2.48601 13.9864L2.89499 14.274ZM18.2542 13.9864L10.5746 3.06687L10.1656 3.35451L17.8452 14.274L18.2542 13.9864Z'
        fill='white'
      />
    </svg>
  );
};
