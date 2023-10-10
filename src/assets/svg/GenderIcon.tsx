const GenderIcon = ({ width = '12', height = '16' }: { width?: string; height?: string }) => {
  return (
    <svg width={12} height={16} viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5001 1C7.3675 1 7.24032 0.947322 7.14655 0.853553C7.05278 0.759785 7.0001 0.632608 7.0001 0.5C7.0001 0.367392 7.05278 0.240215 7.14655 0.146447C7.24032 0.0526784 7.3675 0 7.5001 0L11.5001 0C11.6327 0 11.7599 0.0526784 11.8537 0.146447C11.9474 0.240215 12.0001 0.367392 12.0001 0.5V4.5C12.0001 4.63261 11.9474 4.75979 11.8537 4.85355C11.7599 4.94732 11.6327 5 11.5001 5C11.3675 5 11.2403 4.94732 11.1466 4.85355C11.0528 4.75979 11.0001 4.63261 11.0001 4.5V1.707L7.5501 5.157C7.84737 5.7291 8.00194 6.36457 8.00065 7.00929C7.99937 7.65401 7.84226 8.28886 7.54271 8.85977C7.24316 9.43067 6.81006 9.92071 6.28028 10.2881C5.75051 10.6556 5.13978 10.8895 4.5001 10.97V13H6.0001C6.13271 13 6.25989 13.0527 6.35366 13.1464C6.44743 13.2402 6.5001 13.3674 6.5001 13.5C6.5001 13.6326 6.44743 13.7598 6.35366 13.8536C6.25989 13.9473 6.13271 14 6.0001 14H4.5001V15.5C4.5001 15.6326 4.44743 15.7598 4.35366 15.8536C4.25989 15.9473 4.13271 16 4.0001 16C3.8675 16 3.74032 15.9473 3.64655 15.8536C3.55278 15.7598 3.5001 15.6326 3.5001 15.5V14H2.0001C1.8675 14 1.74032 13.9473 1.64655 13.8536C1.55278 13.7598 1.5001 13.6326 1.5001 13.5C1.5001 13.3674 1.55278 13.2402 1.64655 13.1464C1.74032 13.0527 1.8675 13 2.0001 13H3.5001V10.97C2.85994 10.8892 2.24884 10.6547 1.71894 10.2865C1.18903 9.91835 0.756054 9.42746 0.456949 8.85573C0.157843 8.28401 0.0014866 7.6484 0.00122104 7.00316C0.00095548 6.35792 0.156789 5.72219 0.455424 5.15021C0.754059 4.57824 1.18663 4.08699 1.71623 3.7184C2.24583 3.34981 2.85674 3.1148 3.49684 3.03344C4.13693 2.95208 4.78721 3.02677 5.39218 3.25115C5.99715 3.47553 6.53887 3.84293 6.9711 4.322L10.2931 1H7.5001ZM6.5031 5.346C6.0643 4.68216 5.37977 4.21983 4.60008 4.0607C3.8204 3.90158 3.00944 4.0587 2.3456 4.4975C1.68177 4.9363 1.21943 5.62084 1.06031 6.40052C0.901183 7.1802 1.0583 7.99116 1.4971 8.655C1.93604 9.31884 2.6207 9.78112 3.40048 9.94015C4.18025 10.0992 4.99127 9.94193 5.6551 9.503C6.31894 9.06407 6.78122 8.3794 6.94025 7.59963C7.09929 6.81985 6.94204 6.00884 6.5031 5.345V5.346Z"
        fill="black"
      />
    </svg>
  );
};

export default GenderIcon;
