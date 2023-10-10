import React from 'react';
import './Pagination.scss';
import { PrevPag } from '../../../assets/svg/PrevPag';
import { NextPag } from '../../../assets/svg/NextPag';
import { DotDot } from '../../../assets/svg/DotDot';
export default function Pagination({ numbers, onClick, paginationNumber, handlePrevPagnum }: any) {
  const renderNumStartToEnd = (start: any, end: any) => {
    return [...Array(end - start + 1).keys()].map(item => {
      return (
        <div
          className={`pagination-element ${paginationNumber === item + start - 1 ? 'active' : ''}`}
          onClick={() => {
            onClick(item + start - 1);
          }}
        >
          {item + start}
        </div>
      );
    });
  };
  const renderDotDot = () => {
    return <div className='dotdot'><DotDot /></div>
  }
  const renderPagiByNum = (numbers: number, paginationNumber: number) => {
    const position = numbers - 1;
    if (numbers == 8 || numbers == 9) {
      if (paginationNumber < 5) {
        if(paginationNumber == 4) {
          return (
            <>
              {renderNumStartToEnd(1, 6)}
              {renderDotDot()}
              <div
                className={`pagination-element ${paginationNumber === numbers - 1 ? 'active' : ''}`}
                onClick={() => {
                  onClick(numbers - 1);
                }}
              >
                {numbers}
              </div>
            </>
          );
        }
        else return (
          <>
            {renderNumStartToEnd(1, 5)}
            {renderDotDot()}
            <div
              className={`pagination-element ${paginationNumber === numbers - 1 ? 'active' : ''}`}
              onClick={() => {
                onClick(numbers - 1);
              }}
            >
              {numbers}
            </div>
          </>
        );
      } else {
        return (
          <>
            <div
              className={`pagination-element ${paginationNumber === 0 ? 'active' : ''}`}
              onClick={() => {
                onClick(0);
              }}
            >
              {1}
            </div>
            {renderDotDot()}
            {renderNumStartToEnd(5, 8)}
          </>
        );
      }
    } else {
      if (paginationNumber < 5) {
        if(paginationNumber == 4) {
          return (
            <>
              {renderNumStartToEnd(1, 6)}
              {renderDotDot()}
              <div
                className={`pagination-element ${paginationNumber === position ? 'active' : ''}`}
                onClick={() => {
                  onClick(position);
                }}
              >
                {position + 1}
              </div>
            </>
          );
        } 
        return (
          <>
            {renderNumStartToEnd(1, 5)}
            {renderDotDot()}
            <div
              className={`pagination-element ${paginationNumber === position ? 'active' : ''}`}
              onClick={() => {
                onClick(position);
              }}
            >
              {position + 1}
            </div>
          </>
        );
      } else if (paginationNumber < position - 4) {
        return (
          <>
            {renderNumStartToEnd(1, 2)}
            {renderDotDot()}
            {renderNumStartToEnd(paginationNumber, paginationNumber + 2)}
            {renderDotDot()}
            {renderNumStartToEnd(numbers - 1, numbers)}
          </>
        );
      } else {
        if(paginationNumber == numbers - 5) {
          return (
            <>
              {renderNumStartToEnd(1, 1)}
              {renderDotDot()}
              {renderNumStartToEnd(numbers-5, numbers)}
            </>
          );
        }
        return (
          <>
            {renderNumStartToEnd(1, 2)}
            {renderDotDot()}
            {renderNumStartToEnd(numbers-4, numbers)}
          </>
        );
      }
    }
  };

  const renderPagi = (numbers: number) => {
    if (numbers < 7 || numbers == 7)
      return [...Array(numbers).keys()].map(item => {
        return (
          <div
            className={`pagination-element ${paginationNumber === item ? 'active' : ''}`}
            onClick={() => {
              onClick(item);
            }}
          >
            {item + 1}
          </div>
        );
      });
    else {
      {
        return renderPagiByNum(numbers, paginationNumber);
      }
    }
  };

  return (
    <div className="pagination">
      <div
        style={{ color: 'black' }}
        onClick={() => {
          handlePrevPagnum(true);
        }}
      >
        <PrevPag />
      </div>
      {renderPagi(numbers)}
      <div
        style={{ color: 'black' }}
        onClick={() => {
          handlePrevPagnum(false);
        }}
      >
        <NextPag />
      </div>
    </div>
  );
}
