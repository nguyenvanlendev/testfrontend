import React from 'react';
import './HeaderSearchMobile.scss';
import { FilterIcon } from '../../../assets/svg/FilterIcon';
import { SearchIcon } from '../../../assets/svg/SearchIcon';
export const HeaderSearchMobile: React.FC<IHeaderSearchMobile> = ({
  placeholder,
  value,
  onChange,
  isShowSearchOpt = true,
  onClick = () => {},
}) => {
  return (
    <div className="header-search-mobile">
      <div className="header-search-mobile__input">
        <div className="search-input">
          <input placeholder={placeholder} value={value} onChange={(e) => {
            onChange && onChange(e.target.value)
            }} />
          <div className="search-input__icon">
            <SearchIcon/>
          </div>
        </div>
      </div>
      {isShowSearchOpt ? (
        <div className="header-search-mobile__icon" onClick={onClick}>
          <FilterIcon/>
        </div>
      ) : null}
    </div>
  );
};
