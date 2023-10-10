import { useResponsive } from '../../hooks';
import HomePageDesk from './HomePageDesk';
import HomePageMobile from './HomePageMobile';
import './HomePage.scss';

export const HomePage = () => {
  const { isFromMobile } = useResponsive();
  return <>{isFromMobile ? <HomePageMobile /> : <HomePageMobile />}</>;
};


