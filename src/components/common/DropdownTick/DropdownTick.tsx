import React, { useEffect, useRef, useState } from 'react';
import './DropdownTick.scss';
import { OptionItem } from './OptionItem';
import { DropdownIcon } from '../../../assets/svg/DropdownIcon';
import { CloseIcon } from '../../../assets/svg/CloseIcon';

export const DropdownTick: React.FC<DropdownTick> = ({
  placeholder,
  listOption,
  isMultipleOption,
  setListChosenOption,
  className,
  listChosenOption,
  error,
}) => {
  const [value, setValue] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [isShowBody, setIsShowBody] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setErrorText(error as string);
  }, [error]);

  useEffect(() => {
    if (isShowBody) {
      if (headerRef.current && ref.current) {
        headerRef.current.style.zIndex = '100';
        ref.current.style.zIndex = '99';
      }
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target) && !headerRef.current?.contains(event.target)) {
          setIsShowBody(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } else {
      if (headerRef.current) {
        headerRef.current.style.zIndex = '7';
      }
    }
  }, [ref, isShowBody]);

  // useEffect(() => {
  //   setListChosenOption(listChosenOption);
  // }, [listChosenOption]);

  // useEffect(() => {
  //   if(listChosenOption) setListChosenOption(listChosenOption)
  // },[listChosenOption])

  const checkExistKey = (option: { key: number; value: string }) => {
    const index = listChosenOption?.findIndex((item: { key: number; value: string }) => {
      return item.key === option.key;
    });

    if (index !== -1) return true;
    return false;
  };

  const handlePushKey = (option: { key: number; value: string }) => {
    if (checkExistKey(option))
      setListChosenOption(
        [...listChosenOption]?.filter((item: { key: number; value: string }) => {
          return option.key !== item.key;
        }),
      );
    else setListChosenOption([...listChosenOption, option]);
  };
  const checkChosenItem = () => {
    return listChosenOption?.length !== 0;
  };

  const handlePushKeyWithConstraint = (option: { key: number; value: string }) => {
    if (isMultipleOption) {
      handlePushKey(option);
    } else {
      if (!checkChosenItem()) {
        handlePushKey(option);
      } else {
        if (checkExistKey(option)) {
          handlePushKey(option);
        } else {
          setListChosenOption([option]);
        }
      }
      setIsShowBody(false);
    }
  };

  const renderBodyDropdowntick = (listOption: ListOption) => {
    return listOption.map((item: { key: number; value: string }, index: number) => {
      return (
        <OptionItem
          value={item.value}
          key={index + value}
          onClick={() => {
            handlePushKeyWithConstraint(item);
          }}
          isChosen={checkExistKey(item)}
        />
      );
    });
  };
  const renderMutipleOption = (listOption: ListOption) => {
    return listOption.map((item: { key: number; value: string }) => {
      return (
        <div className="chosen-option" key={item.key + item.value}>
          <span>{item.value}</span>
          <span
            onClick={e => {
              e.stopPropagation();
              handlePushKeyWithConstraint(item);
            }}
          >
            <CloseIcon />
          </span>
        </div>
      );
    });
  };

  const renderValue = () => {
    if (checkChosenItem()) {
      if (isMultipleOption) {
        return <div className="list-chosen-option">{renderMutipleOption(listChosenOption)}</div>;
      } else {
        return (
          <span
            style={{
              fontSize: '16px',
              fontWeight: '400',
              color: 'black',
              display: 'inline-block',
            }}
          >
            {listChosenOption[0]?.value}
          </span>
        );
      }
    } else {
      return (
        <span
          style={{
            fontSize: '15px',
            fontStyle: 'italic',
            fontWeight: '400',
            color: 'black',
            opacity: 0.6,
          }}
        >
          {placeholder}
        </span>
      );
    }
  };

  return (
    <div className={`dropdowntick ${className ? className : ''}`}>
      <div
        ref={headerRef}
        className="dropdowntick__header"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setIsShowBody(!isShowBody);
          setErrorText('');
        }}
      >
        <div className="dropdowntick__header--value">{renderValue()}</div>
        <div className="dropdowntick__header--icon">
          <DropdownIcon />
        </div>
        {/* {isShowBody && (
          <div
            ref={ref}
            className={`dropdowntick__body ${!isMultipleOption || !checkChosenItem() ? 'padding-44' : 'padding-64'}`}
          >
            {renderBodyDropdowntick(listOption)}
          </div>
        )} */}
      </div>
      {errorText && <p className="dropdowntick__error">{errorText}</p>}
      {isShowBody && (
        <div
          ref={ref}
          className={`dropdowntick__body ${!isMultipleOption || !checkChosenItem() ? 'padding-44' : 'padding-64'}`}
        >
          {renderBodyDropdowntick(listOption)}
        </div>
      )}
    </div>
  );
};
