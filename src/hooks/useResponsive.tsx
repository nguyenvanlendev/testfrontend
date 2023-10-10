import { useMediaQuery } from 'react-responsive';

export enum EBreakPoint {
  xs = 370,
  sm = 576,
  md = 800,
  lg = 992,
  lgXl = 1060,
  xl = 1200,
  xxl = 1400,
  ipad = 768,
  xsBg = 413,
}

export const useResponsive = () => {
  const isAfter376 = useMediaQuery({ maxWidth: EBreakPoint.xs });
  const isFrom376To576 = useMediaQuery({
    minWidth: EBreakPoint.xs,
    maxWidth: EBreakPoint.sm,
  });

  const isFrom376To1060 = useMediaQuery({
    minWidth: EBreakPoint.xs,
    maxWidth: EBreakPoint.lgXl,
  });

  const isFrom576To800 = useMediaQuery({
    minWidth: EBreakPoint.sm,
    maxWidth: EBreakPoint.md,
  });
  const isFrom800To992 = useMediaQuery({
    minWidth: EBreakPoint.md,
    maxWidth: EBreakPoint.lg,
  });

  const isFrom1024 = useMediaQuery({
    minWidth: 1024,
  });

  const isFrom992 = useMediaQuery({ minWidth: EBreakPoint.md });
  const isFromMobile = useMediaQuery({ minWidth: EBreakPoint.sm }); //ipad
  const isMobile = useMediaQuery({ minWidth: EBreakPoint.xs, maxWidth: EBreakPoint.sm }); //ipad
  const isFrom1200 = useMediaQuery({ minWidth: EBreakPoint.xl });
  const isFrom413 = useMediaQuery({ minWidth: EBreakPoint.xsBg });
  const isFrom1000 = useMediaQuery({ minWidth: 1000 });
  const isFrom900 = useMediaQuery({ minWidth: 900 });

  return {
    isAfter376,
    isFrom576To800,
    isFrom800To992,
    isFrom992,
    isFrom376To576,
    isFromMobile,
    isFrom1200,
    isFrom376To1060,
    isFrom413,
    isFrom1024,
    isFrom1000,
    isFrom900,
    isMobile,
  };
};
