import React, { useState } from 'react';
import { Button } from '../../../../components/common/Button/Button';
import { DropdownTick } from '../../../../components/common/DropdownTick/DropdownTick';
import { HeaderTitleMobile } from '../../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { mockClasses, mockLocation, mockSubject, mockType } from '../../../../mock/common';
import './FilterForm.scss';
import { apiSystem } from '../../../../services/axios/apiSystem';
import { useEffect } from 'react';
import { apiPost } from '../../../../services/axios/apiPost';
import { IInfoPostDetail } from '../../../../@types/apiResponse';
interface IFilterForm {
  onGetResult: (list:IInfoPostDetail[]) => void;
}

export const FilterForm: React.FC<IFilterForm> = ({ onGetResult }) => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [types, setTypes] = useState([]);
  const [location, setLocation] = useState([]);

  const [chosenSubjects, setChosenSubjects] = useState([]);
  const [chosenClasses, setChosenClasses] = useState([]);
  const [chosenTypes, setChosenTypes] = useState([]);
  const [chosenLocation, setChosenLocation] = useState([]);

  const getListPost = () => {
    apiPost
      .getListPost({
        CurrentPage: 0,
        Limit: 0,
        SubjectIds: chosenLocation.map((item: any) => {
          return item.key;
        }),
        ClassIds: chosenClasses.map((item: any) => {
          return item.key;
        }),
        TeachingFormIds: chosenTypes.map((item: any) => {
          return item.key;
        }),
        AreaIds: chosenLocation.map((item: any) => {
          return item.key;
        }),
        SearchText: '',
      })
      .then(res => {
        onGetResult(res.data.Content.Posts)
      });
  };

  useEffect(() => {
    apiSystem
      .getSubjectSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setSubjects(res.data.Content.Subjects);
      });

    apiSystem
      .getClasssSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setClasses(res.data.Content.Classes);
      });

    apiSystem
      .getTeachingFormSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setTypes(res.data.Content.Forms);
      });

    apiSystem
      .getAreaSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setLocation(res.data.Content.Areas);
      });
  }, []);

  return (
    <div className="filter-form">
      <HeaderTitleMobile title="Tìm tin nhanh" />
      <div className="filter-form__input-wrap">
        <p>Môn học</p>
        <DropdownTick
          listChosenOption={chosenSubjects}
          key={'filter-form__subject'}
          placeholder="Chọn môn học"
          listOption={subjects.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption
          setListChosenOption={setChosenSubjects}
        />
      </div>
      <div className="filter-form__input-wrap">
        <p>Lớp học</p>
        <DropdownTick
          listChosenOption={chosenClasses}
          key={'filter-form__classes'}
          placeholder="Lớp học đăng kí dạy"
          listOption={classes.map((item: { Id: number; Name: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Name,
          }))}
          isMultipleOption
          setListChosenOption={setChosenClasses}
        />
      </div>
      <div className="filter-form__input-wrap">
        <p>Hình thức dạy</p>
        <DropdownTick
          listChosenOption={chosenTypes}
          key={'filter-form__type'}
          placeholder="Chọn hình thức dạy"
          listOption={types.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption
          setListChosenOption={setChosenTypes}
        />
      </div>
      <div className="filter-form__input-wrap">
        <p>Khu vực</p>
        <DropdownTick
          listChosenOption={chosenLocation}
          key={'filter-form__location'}
          placeholder="Chọn khu vực"
          listOption={location.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption
          setListChosenOption={setChosenLocation}
        />
      </div>
      <Button
        className="filter-form__submit-btn"
        width={304}
        height={60}
        onClick={() => {
          //onGetResult();
          getListPost()
        }}
      >
        Tìm kiếm
      </Button>
    </div>
  );
};
