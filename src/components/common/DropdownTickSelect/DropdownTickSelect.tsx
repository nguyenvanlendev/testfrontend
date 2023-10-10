import React, { KeyboardEventHandler, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { LocationIcon } from '../../../assets/svg/LocationIcon';
// import { checkChoiceImg } from '../../../constants';
import { eventListener } from '../../../constants/common';
import { useDebounce } from '../../../hooks';
import { getCoords, removeVietnameseTones } from '../../../utils/common';
import { useDispatch } from 'react-redux';
import './DropdownTickSelect.scss';

export const DropdownTickSelect: React.FC<any> = ({
  zIndexHeader,
  zIndexBody,
  listItem,
  options,
  onChange,
  backgroundColorIcon,
  placeholder,
  className,
  isOver,
  optionPowerGrade,
  indexOption,
  isConvertIdToIndex,
  hasErr,
  id,
  dummy,
  typeSearch,
  typeSelect,
  handleSelect,
  disabled,
  reset,
  isHaveArrowCursor,
  forceUpdateValue,
  propGetValForceUpdate,
  notOnChangeWhenForceUpdate,
  type,
  relatedSearch,
  idActive,
  setIdActive,
  handleGetGoogleMap,
  onClear,
  isIntegrate
}) => {
  const [isDownMenu, setIsDownMenu] = useState(false);
  const [numberSelect, setNumberSelect] = useState(-1);
  const [currentCursor, setCurrentCursor] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const refBody: any = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('');
  const dbValue = useDebounce(filter, 400);
  const refWrapper = useRef<HTMLDivElement>(null);
  const [listSeletedSubjects, setListSelectedSubjects] = useState<any>([]);
  const [showError, setShowError] = useState<boolean>(false);
  // const [forceShowInput, setForceShowInput] = useState<boolean>(false);
  const [listOptions, setListOptions] = useState([]);
  const [errorText, setErrorText] = useState<string>('');
  const refOptions = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (filter && filter !== '' && isDownMenu) {
      switch (type) {
        case 0:
        
          break;
        case 1:
          
          break;
        case 2:
          
          break;
        case 3:
          
          break;
        // case 4:
        //   if (filter) {
        //     // call map api
        //     apiGoogleMap.GetCoordinates({text: filter})
        //     .then((res) => {
        //       const features = res.data?.content?.data?.features
        //       if (features.length > 0) {
        //         setListOptions(features.map((item: any) => {
        //           return {value: item, label: item.properties.label}
        //         }))
        //       } else {
        //         setListOptions([])
        //       }
        //     })
        //   } else {
        //     setListOptions([])
        //   }
        //   break;
          // case 5:
          //   apiGeneral.GetListSecondarySchool({
          //     findtext: filter,
          //     currentpage: 0,
          //     limit: 0
          //   }).then(res => {
          //     if (res.data.result === 1) {
          //       setListOptions(
          //         res.data.content.secondarySchools.map((g: any) => {
          //           return { value: g.id, label: g.name };
          //         }),
          //       );
          //     }
          //   });
          //   break;
      }
    } else {
      setListOptions(refOptions);
    }
  }, [dbValue, type]);

  useEffect(() => {
    setCurrentCursor(-1);
  }, [listOptions]);

  useEffect(() => {
    if (reset) {
      setNumberSelect(-1);
      setListSelectedSubjects([]);
    }
  }, [reset]);

  useEffect(() => {
    if (options?.length > 0) {
      setListOptions(options)
    }
  }, [options]);

  useEffect(() => {
    if (!reset && isConvertIdToIndex && indexOption !== undefined && options.length > 0 && indexOption !== -1) {
      const index = options.findIndex((o: any, i: any) => i === indexOption);
      setNumberSelect(index);
    } else if (type !== 4) {
      setNumberSelect(-1);
      setListSelectedSubjects([]);
    }
  }, [indexOption, options]);

  useEffect(() => {
    if (isDownMenu) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.currentTarget as Node)) {
          setIdActive('default');
          setIsDownMenu(false);
        }
      };
      document.addEventListener(eventListener.CLICK, handleClickOutside);
      return () => {
        document.removeEventListener(eventListener.CLICK, handleClickOutside);
      };
    }
  }, [ref, isDownMenu]);

  useEffect(() => {
    if (isDownMenu && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDownMenu, inputRef.current])

  useEffect(() => {
    if (!showError) {
      setErrorText('');
    }
  }, [showError]);

  useEffect(() => {
    if (
      numberSelect !== -1
      // && listSeletedSubjects.length === 0
    ) {
      var newList = [];
      newList.push(options[numberSelect]);
      setListSelectedSubjects(newList);

      // onChange(newList);
    }
  }, [numberSelect]);

  useEffect(() => {
    if (listSeletedSubjects?.length > 0) {
      setFilter(listSeletedSubjects[0]?.label);
    } else setFilter('');
  }, [listSeletedSubjects]);

  useEffect(() => {
    //Nếu idActive không giống id của Dropdown hiện tại (nghĩa là tắt dropdown khi ấn qua dropdown khác) thì tắt dropdown
    //Trạng thái idActive = 'default' là mặc định (khi chưa mở dropdown nào)
    if (isDownMenu && (idActive !== 'default' && idActive !== id)) setIsDownMenu(false);
  }, [idActive])

  const checkExistInSelectedSubjects = (value: any) => {
    let isExist = false;
    for (let i = 0; i < listSeletedSubjects?.length; i++) {
      if (listSeletedSubjects[i]?.value === value) {
        isExist = true;
      }
    }
    return isExist;
  };

  const handleDeteleSubject = async (item: any) => {
    var newList;
    listSeletedSubjects.map((subject: any, index: any) => {
      if (item.value === subject.value) {
        listSeletedSubjects.splice(index, 1);
        newList = [...listSeletedSubjects];
        return;
      }
    });

    setShowError(false);
    setListSelectedSubjects(newList);
    return;
  };

  const handlePushSeleted = async (item: any, isPushFirst?: any) => {
    var newList = [...listSeletedSubjects];
    // if (type === 4 && typeof(item.value) !== 'number') {
    //   const res = await apiGoogleMap.GetGoogleMap({
    //     street: item.value.properties.name,
    //     ward: item.value.properties.locality,
    //     district: item.value.properties.county,
    //     province: item.value.properties.region,
    //     lat: item.value.geometry.coordinates[1],
    //     lng: item.value.geometry.coordinates[0]
    //   })
    //   if(res) {
    //     dispatch(doSetAddressId(res.data.content.id))
    //     dispatch(doSetInforAddress({
    //       street: item.value.properties.name,
    //       ward: item.value.properties.locality,
    //       district: item.value.properties.county,
    //       province: item.value.properties.region,
    //       lat: item.value.geometry.coordinates[1],
    //       lng: item.value.geometry.coordinates[0]
    //     }));
    //   }
    //   if (res) item.value = {
    //     value: res.data.content.id,
    //     label: item.label
    //   }
    // }
    if (handleSelect) handleSelect(item.value, item.point);

    if (checkExistInSelectedSubjects(item)) {
      return;
    } else {
      if (isPushFirst === true) {
        newList = [];
        newList.push(listOptions[0]);
        await setListSelectedSubjects(newList);
      } else {
        newList = [];
        newList.push(item);
        await setListSelectedSubjects(newList);
      }
    }
    setIsDownMenu(false);
    setIdActive('default');
    return onChange && onChange(newList);
  };

  useEffect(() => {
    if (hasErr) {
      // ref.current.scrollIntoView();
      const { top } = getCoords(refWrapper.current);
      window.scrollTo({ behavior: 'smooth', top: top - 60 });
    }
  }, [hasErr, dummy]);

  const handlePressEnter = (e: any) => {
    if (e.key === 'Enter') {
      handlePushSeleted('', true);
    }
  };

  const handleKeyDownInput: KeyboardEventHandler<HTMLInputElement> = e => {
    if (!isDownMenu) {
      setIsDownMenu(true);
      setIdActive(id);
    }
    if (!isHaveArrowCursor || !listOptions?.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // refBody.current?.scrollBy(100, 100);
      const isCursorFirstElement = currentCursor === listOptions.length - 1;
      const newCursor = isCursorFirstElement ? 0 : currentCursor + 1;
      setCurrentCursor(newCursor);

      if (isCursorFirstElement) {
        refBody.current?.scrollTo({ top: 0 });
        return;
      }

      const offsetTopNewCursor = (
        refBody.current?.querySelectorAll('.dropdown-tick__item')[newCursor] as HTMLDivElement
      ).offsetTop;
      const offsetHeightNewCursor = (
        refBody.current?.querySelectorAll('.dropdown-tick__item')[newCursor] as HTMLDivElement
      ).offsetHeight;
      const delta =
        offsetTopNewCursor + offsetHeightNewCursor - (refBody.current?.offsetHeight + refBody.current?.scrollTop);

      if (delta > 0) {
        refBody.current?.scrollBy(0, delta);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const PADDINGTOP = 25;
      const isCursorLastElement = currentCursor === 0 || currentCursor === -1;
      const newCursor = isCursorLastElement ? listOptions.length - 1 : currentCursor - 1;
      setCurrentCursor(newCursor);
      const offsetTopNewCursor = (
        refBody.current?.querySelectorAll('.dropdown-tick__item')[newCursor] as HTMLDivElement
      ).offsetTop;
      const offsetHeightNewCursor = (
        refBody.current?.querySelectorAll('.dropdown-tick__item')[newCursor] as HTMLDivElement
      ).offsetHeight;
      if (isCursorLastElement) {
        refBody.current?.scrollBy({
          top: refBody.current.scrollHeight,
        });
        return;
      }

      const delta = offsetTopNewCursor - PADDINGTOP - refBody.current?.scrollTop;
      if (delta < 0) {
        refBody.current?.scrollBy(0, delta);
      }
    } else if (e.key === 'Enter') {
      if (currentCursor > -1) {
        handlePushSeleted(listOptions[currentCursor]);
        return;
      }
      setIsDownMenu(false);
      setIdActive('default');
      const lowerFilter = removeVietnameseTones(filter).toLowerCase();
      const newIndex = listOptions.findIndex((opt: any) => {
        return removeVietnameseTones(opt.label).toLowerCase() === lowerFilter;
      });
      if (newIndex > -1) {
        handlePushSeleted(listOptions[newIndex]);
      } else {
        // setForceShowInput(true);
        handlePushSeleted(listOptions[0]);
      }
    }
  };

  useEffect(() => {
    if (forceUpdateValue) {
      const val = propGetValForceUpdate ? forceUpdateValue[propGetValForceUpdate] : forceUpdateValue;
      // -100: signature for invalid value( set value to initial)
      if (val === -100) {
        !notOnChangeWhenForceUpdate && onChange && onChange({ target: { value: '' } }, true);
        setNumberSelect(-1);
        return;
      }
      !notOnChangeWhenForceUpdate && onChange && onChange({ target: { value: val } }, true);

      setNumberSelect(val);
    }
  }, [forceUpdateValue]);

  return (
    <>
      {!disabled && typeSearch && (
        <div
          ref={refWrapper}
          className={`dropdown-tick ${className ? className : ''}`}
          style={{ zIndex: `${zIndexHeader}` }}
          id={id}
        >
          <div
            className="dropdown-tick__header"
            style={{
              zIndex: `${zIndexHeader}`,
              border: hasErr?.length > 0 ? `1px solid #BC3D3D` : '',
            }}
            onClick={(e: ReactMouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              if (e.currentTarget.tagName !== 'path') {
                setIsDownMenu(true);
                setIdActive(id);
                // setForceShowInput(false);
              }
            }}
            ref={ref}
          >
            <div className="dropdown-tick__show">
              {isDownMenu ? (
                <input
                  ref={inputRef}
                  placeholder={placeholder}
                  className="dropdown-tick__show-input"
                  onChange={e => setFilter(e.target.value)}
                  value={filter}
                  onKeyDown={handleKeyDownInput}
                />
              ) : (
                <span>
                  {listSeletedSubjects.length > 0 && listSeletedSubjects[0]?.label !== '' ? (
                    <div className="dropdown-tick__show-selected">{listSeletedSubjects[0]?.label}</div>
                  ) : (
                    placeholder
                  )}
                  {/* numberSelect === -1 ? (
                    placeholder
                  ) : refOptions.length === 0 ? (
                    placeholder
                  ) : refOptions[numberSelect] ? (
                    placeholder
                  ) : (
                    placeholder
                  )} */}
                </span>
              )}
            </div>
            <div
              onClick={e => {
                e.stopPropagation();
                handleSelect(0);
                setListSelectedSubjects([]);
                setFilter('');
                setNumberSelect(-1);
                setIsDownMenu(true);
                onClear()
              }}
              className="dropdown-tick__remove"
              style={{ display: listSeletedSubjects.length === 0 ? 'none' : 'flex' }}
            >
              <IoIosClose />
            </div>
            <div
              className="dropdown-tick__icon"
              style={{ backgroundColor: isDownMenu ? '#0065FF' : '' }}
              onClick={(e: ReactMouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                if (e.currentTarget.tagName !== 'path') {
                  if (isDownMenu) setIdActive('default'); else setIdActive(id);
                  setIsDownMenu(!isDownMenu);
                }
              }}
            >
              {!isDownMenu ? (
                <FiSearch size={25} color="white" className="dropdown-tick__icon-search" />
              ) : (
                <FiChevronDown size={24} color="white" className="dropdown-tick__icon-down" />
              )}
            </div>
          </div>

          {isDownMenu && (
            <div
              ref={refBody}
              className={isOver ? 'dropdown-tick__body dropdown-tick__body--over' : 'dropdown-tick__body'}
              style={{ zIndex: `${zIndexBody}` }}
            >
              {listOptions.length === 0
                ? optionPowerGrade?.map((item: any, i: any) => {
                    return (
                      <div
                        className={`dropdown-tick__item ${
                          isHaveArrowCursor && i === currentCursor ? 'dropdown-tick__item--active' : ''
                        }`}
                        key={i}
                        onClick={e => {
                          e.stopPropagation();
                          handlePushSeleted(item);
                        }}
                        style = {{
                          borderBottom:"1px solid #98a5b9"
                        }}
                      >
                        <div className={`dropdown-tick${checkExistInSelectedSubjects(item.value) ? '--active' : ''}`}>
                          {item?.text}
                        </div>
                        <div className="dropdown-tick__point">{`${item.fromvalue} - ${item.tovalue}`}</div>
                      </div>
                    );
                  })
                : listOptions.map((item: any, i: any) => {
                    return (
                      <div
                        className={`dropdown-tick__item ${type!==4 && 'dropdown-tick__item--underlined'} ${
                          isHaveArrowCursor && i === currentCursor ? 'dropdown-tick__item--active' : ''
                        }`}
                        key={i}
                        onClick={e => {
                          e.stopPropagation();
                          handlePushSeleted(item);
                        }}
                      >
                        <div
                          className={`dropdown-tick__item-text${
                            checkExistInSelectedSubjects(item.value) ||
                            (indexOption === i && listSeletedSubjects.length === 0)
                              ? '--active'
                              : ''
                          }`}
                        >
                          {type === 4 ?
                          <div className ={`dropdown-tick__item-text__address`}style={{display:"flex"}}>
                            <span style={{paddingRight: '7px'}}><LocationIcon/></span>
                            <p>{item?.label}</p>
                          </div>:<div>{item?.label}</div>
                          }
                        </div>
                        {checkExistInSelectedSubjects(item.value) === true ||
                        (indexOption === i && listSeletedSubjects.length === 0) ? (
                          <div
                            className="dropdown-tick__item-active"
                            onClick={e => {
                              e.stopPropagation();
                              // neu la tich hop thi rang khong cho user bo tick chon
                              if(!isIntegrate) {
                                onClear();
                                handleDeteleSubject(item);
                              }
                            }}
                          >
                            {/* <img src={checkChoiceImg} alt="checkChice" /> */}
                          </div>
                        ) : (
                          <span className="dropdown-tick__item-box"></span>
                        )}
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      )}
      {!disabled && typeSelect && (
        <div
          ref={refWrapper}
          className={`dropdown-tick ${className ? className : ''}`}
          style={{ zIndex: `${zIndexHeader}` }}
          onBlur={() => {
            setIdActive('default');
            setIsDownMenu(false);
          }}
          id={id}
        >
          <div
            className="dropdown-tick__header"
            style={{
              zIndex: `${zIndexHeader}`,
              border: hasErr?.length > 0 ? `1px solid #BC3D3D` : '',
            }}
            onClick={(e: ReactMouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              if (e.currentTarget.tagName !== 'path') {
                if (isDownMenu) setIdActive('default'); else setIdActive(id);
                setIsDownMenu(!isDownMenu);
              }
            }}
          >
            <div className="dropdown-tick__show">
              <span>
                {listSeletedSubjects.length > 0 && !reset ? (
                  <div className="dropdown-tick__show-selected">{listSeletedSubjects[0]?.label}</div>
                ) : numberSelect === -1 || listSeletedSubjects.length === 0 || reset ? (
                  placeholder
                ) : options.length === 0 ? (
                  optionPowerGrade[numberSelect]?.text
                ) : options[numberSelect] ? (
                  options[numberSelect]?.label
                ) : (
                  options[options.length]?.label
                )}
              </span>
            </div>
            <div className="dropdown-tick__icon" style={{ backgroundColor: backgroundColorIcon }}>
              <FiChevronDown size={22} color="white" className="dropdown-tick__icon-down" />
            </div>
          </div>

          {isDownMenu && (
            <div
              className={isOver ? 'dropdown-tick__body dropdown-tick__body--over' : 'dropdown-tick__body'}
              style={{ zIndex: `${zIndexBody}` }}
              ref={ref}
            >
              {options.length === 0
                ? optionPowerGrade?.map((item: any, i: any) => {
                    return (
                      <div
                        className={`dropdown-tick__item ${type!==4 && 'dropdown-tick__item--underlined'} ${
                          isHaveArrowCursor && i === currentCursor ? 'dropdown-tick__item--active' : ''
                        }`}
                        key={i}
                        onClick={e => {
                          e.stopPropagation();
                          handlePushSeleted(item);
                        }}
                      >
                        <div className={`dropdown-tick${checkExistInSelectedSubjects(item.value) ? '--active' : ''}`}>
                          {item?.text}
                        </div>
                        <div className="dropdown-tick__point">{`${item.fromvalue} - ${item.tovalue}`}</div>
                      </div>
                    );
                  })
                : options.map((item: any, i: any) => {
                    return (
                      <div
                        className={`dropdown-tick__item ${type!==4 && 'dropdown-tick__item--underlined'} ${
                          isHaveArrowCursor && i === currentCursor ? 'dropdown-tick__item--active' : ''
                        }`}
                        key={i}
                        onClick={e => {
                          e.stopPropagation();
                          handlePushSeleted(item);
                        }}
                      >
                        <div
                          className={`dropdown-tick__item-text${
                            checkExistInSelectedSubjects(item.value) ||
                            (indexOption === i && listSeletedSubjects.length === 0)
                              ? '--active'
                              : ''
                          }`}
                        >
                          {item?.label}
                        </div>
                        {checkExistInSelectedSubjects(item.value) === true ||
                        (indexOption === i && listSeletedSubjects.length === 0) ? (
                          <div
                            className="dropdown-tick__item-active"
                            onClick={e => {
                              e.stopPropagation();
                              if(!isIntegrate) {
                                onClear();
                                handleDeteleSubject(item);
                              }
                            }}
                          >
                            {/* <img src={checkChoiceImg} alt="checkChoice" /> */}
                          </div>
                        ) : (
                          <span className="dropdown-tick__item-box"></span>
                        )}
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      )}
      {disabled && (
        <div
          ref={refWrapper}
          className={`dropdown-tick ${className ? className : ''}`}
          style={{ zIndex: `${zIndexHeader}`, cursor: 'not-allowed' }}
          onBlur={() => {
            setIdActive('default');
            setIsDownMenu(false);
          }}
          id={id}
        >
          <div
            className="dropdown-tick__header"
            style={{
              zIndex: `${zIndexHeader}`,
              border: hasErr?.length > 0 ? `1px solid #BC3D3D` : '',
            }}
          >
            <div className="dropdown-tick__show">
              <span>
                {listSeletedSubjects.length > 0 ? (
                  <div className="dropdown-tick__show-selected">{listSeletedSubjects[0]?.label}</div>
                ) : numberSelect === -1 ? (
                  placeholder
                ) : options.length === 0 ? (
                  optionPowerGrade[numberSelect]?.text
                ) : options[numberSelect] ? (
                  options[numberSelect]?.label
                ) : (
                  options[options.length]?.label
                )}
              </span>
            </div>
            <div className="dropdown-tick__icon" style={{ backgroundColor: backgroundColorIcon }}>
              <FiChevronDown size={22} color="white" className="dropdown-tick__icon-down" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DropdownTickSelect.defaultProps = {
  isHasPowerGrade: false,
};
