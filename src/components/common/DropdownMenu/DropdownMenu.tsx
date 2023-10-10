import { useEffect, useRef, useState } from "react";
import { EventListener } from "../../../constants";
import { FiChevronDown } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import "./DropdownMenu.scss";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

export const DropdownMenu: React.FC<IDropdownMenu> = ({
  options,
  onChange,
  backgroundColorIcon,
  placeholder,
  className,
  isOver,
  optionPowerGrade,
  indexOption,
  isConvertIdToIndex,
}) => {
  const [isDownMenu, setIsDownMenu] = useState(false);
  const [numberSelect, setNumberSelect] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDownMenu) {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDownMenu(false);
        }
      };
      document.addEventListener(EventListener.click, handleClickOutside);
      return () => {
        document.removeEventListener(EventListener.click, handleClickOutside);
      };
    }
  }, [ref, isDownMenu]);

  useEffect(() => {
    if (isConvertIdToIndex && indexOption !== undefined && options.length > 0) {
      const index = options.findIndex(
        (o) => o.value === Number.parseInt(indexOption as any)
      );
      setNumberSelect(index);
    } else if (indexOption !== undefined) {
      setNumberSelect(indexOption);
    }
  }, [indexOption, options]);

  const handleSelectItem = (i: number, value: any) => {
    setNumberSelect(i);
    setIsDownMenu(false);
    return onChange(value);
  };

  return (
    <div className={`dropdown-menu ${className ? className : ""}`}>
      <div
        className="dropdown-menu__header"
        style={{ borderBottom: isDownMenu ? "1px solid white" : "" }}
        onClick={() => setIsDownMenu(true)}
      >
        <div className="dropdown-menu__show">
          <span>
            {numberSelect === -1
              ? placeholder
              : options.length === 0
              ? optionPowerGrade[numberSelect]?.text
              : options[numberSelect]
              ? options[numberSelect].label
              : options[options.length - 1].label}
          </span>
        </div>
        <div
          className="dropdown-menu__icon"
          style={{ backgroundColor: backgroundColorIcon }}
        >
          <FiChevronDown size={22} color="white" />
        </div>
      </div>
      {isDownMenu && (
        <div
          className={
            isOver
              ? "dropdown-menu__body dropdown-menu__body--over"
              : "dropdown-menu__body"
          }
          ref={ref}
        >
          {options.length === 0
            ? optionPowerGrade?.map((item, i) => {
                return (
                  <div
                    className="dropdown-menu__item"
                    key={i}
                    onClick={() => handleSelectItem(i, item.id)}
                  >
                    <div className="dropdown-menu__power">{item?.text}</div>
                    <div className="dropdown-menu__point">{`${item.fromvalue} - ${item.tovalue}`}</div>
                  </div>
                );
              })
            : options.map((item, i) => {
                return (
                  <div
                    className="dropdown-menu__item"
                    key={i}
                    onClick={() => handleSelectItem(i, item.value)}
                  >
                    {item.value === options[numberSelect]?.value ? (
                      <PrimaryButton
                        checkedIcon={true}
                        shape="circle"
                        background={"#4CBD51"}
                        hideBorder
                        margin="0 10px 0 0"
                      />
                    ) : (
                      <PrimaryButton
                        checkedIcon={false}
                        shape="circle"
                        background={"#3a4276"}
                        hideBorder
                        border="1px solid #fff"
                        margin="0 10px 0 0"
                      />
                    )}
                    {item.label}
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

// DropdownMenu.defaultProps = {
//   isHasPowerGrade: false,
// };
