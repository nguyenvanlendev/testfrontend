import React from 'react';
import ReactInfiniteScroll from 'react-infinite-scroll-component';
import './InfiniteScroll.scss';

export const InfiniteScroll: React.FC<IInfiniteScroll> = ({
  children,
  dataLength,
  next,
  hasMore,
  loader,
  scrollThreshold,
  scrollableTarget,
  className,
  height,
}) => (
  <ReactInfiniteScroll
    className={className ? className : ''}
    dataLength={dataLength}
    next={next}
    hasMore={hasMore}
    scrollThreshold={scrollThreshold ? scrollThreshold : 0.6}
    loader={loader}
    scrollableTarget={scrollableTarget ? scrollableTarget : undefined}
    height={height}
  >
    {children}
  </ReactInfiniteScroll>
);
