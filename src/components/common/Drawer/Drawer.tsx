import React, { useEffect, useRef } from 'react';
import { EventListener } from '../../../constants';
import './Drawer.scss';

export const Drawer: React.FC<IConfirmModal> = ({
  className,
  isOpen,
  setIsOpen,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener(EventListener.click, handleClickOutside);
      return () => {
        document.removeEventListener(EventListener.click, handleClickOutside);
      };
    }
  }, [ref, isOpen]);

  return (
    <div id="modal" className={`drawer ${className ? className : ''}`}>
      <div className={`drawer__backdrop ${isOpen ? 'drawer__backdrop--open' : ''}`}>
        <div className="drawer__modal">
          <div ref={ref} className="drawer__content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
