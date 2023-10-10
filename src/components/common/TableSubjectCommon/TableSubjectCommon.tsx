import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { combineObjectFromPoint } from '../../../utils';
import { useResponsive } from '../../../hooks';
import { RootState } from '../../../redux';
import { Input } from '../Input/Input';

import './TableSubjectCommon.scss';

interface ITableSubject {
  firstSubmitted?: boolean;
  subjects?: any;
  typeForm?: number;
}

export const TableSubjectCommon: React.FC<ITableSubject> = ({
  firstSubmitted,
  subjects,
  typeForm,
}) => {
  const { isFromMobile } = useResponsive();
  const renderTextLabelTypeForm3 = (code: any) => {
    if (code === '10HK1') {
      return 'Điểm HK1 lớp 10';
    } else if (code === '10HK2') {
      return 'Điểm HK2 lớp 10';
    } else if (code === '11HK1') {
      return 'Điểm HK1 lớp 11';
    } else if (code === '11HK2') {
      return 'Điểm HK2 lớp 11';
    } else if (code === '12HK1') {
      return 'Điểm HK1 lớp 12';
    } else if (code === '12HK2') {
      return 'Điểm HK2 lớp 12';
    }
  };
  const grades = [0, 1, 2];

  return (
    <>
      {typeForm === 1 && (
        <div className="common-input__type-6">
          {subjects?.map((item: any, index: number) => {
            return (
              <Input
                validation="avgPoint"
                placeholder="Nhập"
                required={true}
                id={`inp-point__12HK2__${item.subjectid}`}
                value={item.point}
                label={item.code}
                colorLabel={'black'}
                fontWeightLabel={700}
              />
            );
          })}
        </div>
      )}
      {typeForm === 2 && (
        <div className="common-input__type-6">
          {subjects?.map((item: any, index: number) => {
            return (
              <Input
                validation="avgPoint"
                placeholder="Nhập"
                required={true}
                id={`inp-point__12HK2__${item.subjectid}`}
                value={item.point}
                label={item.code}
                colorLabel={'black'}
                fontWeightLabel={700}
              />
            );
          })}
        </div>
      )}
      {typeForm === 4 && (
        <>
          {!isFromMobile &&
            grades.map((grade) => {
              return (
                <div
                  style={{ margin: '10px 0 10px', fontSize: '14px' }}
                  className={`type-group-input-common__padding-bottom type-group-input-common__border-bottom`}
                >
                  <div id="sem-title" className="type-group-input-common__type-9n">
                    <div className="subject-name" />
                    <div className="class__sect">
                      <span className="" style={{ fontSize: '14px' }}>
                        {`HK1 Lớp 1${grade}`}
                      </span>
                      <span className="" style={{ fontSize: '14px' }}>
                        {`HK2 Lớp 1${grade}`}
                      </span>
                    </div>
                  </div>
                  {combineObjectFromPoint(subjects)?.map((item: any, index: any) => {
                    return (
                      <div id="sem-title" className="type-group-input-common__type-9n">
                        <div className="subject-name">{item.subjectname}</div>
                        <div className="class__sect">
                          <Input
                            validation="avgPoint"
                            placeholder="Nhập"
                            required={true}
                            id={`inp-point__10HK1__${item.subjectid}`}
                            value={item.point[grade * 2]}
                          />
                          <Input
                            validation="avgPoint"
                            placeholder="Nhập"
                            required={true}
                            id={`inp-point__10HK2__${item.subjectid}`}
                            value={item.point[grade * 2 + 1]}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          {isFromMobile && (
            <div style={{ margin: '18px 0 10px', fontSize: '14px' }}>
              <div id="sem-title" className="type-group-input__type-9n">
                <div className="subject-name" />
                <div className="class__sect">
                  <span className="" style={{ fontSize: '14px' }}>
                    HK1 Lớp 10
                  </span>
                  <span className="" style={{ fontSize: '14px' }}>
                    HK2 Lớp 10
                  </span>
                </div>
                <div className="class__sect">
                  <span className="" style={{ fontSize: '14px' }}>
                    HK1 Lớp 11
                  </span>
                  <span className="" style={{ fontSize: '14px' }}>
                    HK2 Lớp 11
                  </span>
                </div>
                <div className="class__sect">
                  <span className="" style={{ fontSize: '14px' }}>
                    HK1 Lớp 12
                  </span>
                  <span className="" style={{ fontSize: '14px' }}>
                    HK2 Lớp 12
                  </span>
                </div>
              </div>
              {combineObjectFromPoint(subjects)?.map((item: any, index: any) => {
                return (
                  <div id="sem-title" className="type-group-input__type-9n">
                    <div className="subject-name">{item.subjectname}</div>
                    <div className="class__sect">
                      <Input
                        validation="avgPoint"
                        placeholder="Nhập"
                        required={true}
                        id={`inp-point__10HK1__${item.subjectid}`}
                        value={item.point[0]}
                      />
                      <Input
                        validation="avgPoint"
                        placeholder="Nhập"
                        required={true}
                        id={`inp-point__10HK2__${item.subjectid}`}
                        value={item.point[1]}
                      />
                    </div>
                    <div className="class__sect">
                      <Input
                        validation="avgPoint"
                        placeholder="Nhập"
                        required={true}
                        id={`inp-point__11HK1__${item.subjectid}`}
                        value={item.point[2]}
                      />
                      <Input
                        validation="avgPoint"
                        placeholder="Nhập"
                        required={true}
                        id={`inp-point__11HK2__${item.subjectid}`}
                        value={item.point[3]}
                      />
                    </div>
                    <div className="class__sect">
                      <Input
                        validation="avgPoint"
                        placeholder="Nhập"
                        required={true}
                        id={`inp-point__12HK1__${item.subjectid}`}
                        value={item.point[4]}
                      />
                      <Input
                        validation="avgPoint"
                        placeholder="Nhập"
                        required={true}
                        id={`inp-point__12HK2__${item.subjectid}`}
                        value={item.point[5]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {typeForm === 3 && (
        <div className="common-input__type-6">
          {subjects?.map((item: any, index: number) => {
            return (
              <Input
                validation="avgPoint"
                placeholder="Nhập"
                required={true}
                id={`inp-point__12HK2__${item.subjectid}`}
                value={item.point}
                label={renderTextLabelTypeForm3(item.code)}
                colorLabel={isFromMobile ? 'black' : 'white'}
                fontWeightLabel={700}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
