import './PostFindTutor.scss';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { IntroPostFindTutor } from '../../../components/StudentPage/IntroPostFindTutor/IntroPostFindTutor';
import { DropdownTick } from '../../../components/common/DropdownTick/DropdownTick';
import { Input } from '../../../components/common/Input/Input';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/common/Button/Button';
import TextArea from '../../../components/common/TextArea/TextArea';
import ModalConfirm from '../../../components/common/ModalConfirm/ModalConfirm';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import RadioButton from '../../../components/common/RadioButton/RadioButton';
import TeachingSchedule from '../../../components/common/TeachingSchedule/TeachingSchedule';
import { apiSystem } from '../../../services/axios/apiSystem';
import { apiPost } from '../../../services/axios/apiPost';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IInfoPost } from '../../../@types/apiResponse';
import { dataGender } from '../../../constants';
import FindTutorIntroImage from "../../../assets/img/draft/FindTutorIntroImage.png"



export const PostFindTutor = () => {

 
  const dataWeekday = [
    {
      weekdayid: 10,
      sessiondays: [],
    },
    {
      weekdayid: 20,
      sessiondays: [],
    },
    {
      weekdayid: 30,
      sessiondays: [],
    },
    {
      weekdayid: 40,
      sessiondays: [],
    },
    {
      weekdayid: 50,
      sessiondays: [],
    },
    {
      weekdayid: 60,
      sessiondays: [],
    },
    {
      weekdayid: 70,
      sessiondays: [],
    },
  ]
  const {id} = useParams();
  const history = useNavigate();


  const [listSubject, setListSubject] = useState<any>([]);
  const [listGrade, setListGrade] = useState<any>([]);
  const [listFomatTeaching, setListFomatTeaching] = useState<any>([]);
  const [listGender, setListGender] = useState<any>([]);
  const [listArea, setListArea] = useState<any>([]);
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeTeaching, setTimeTeaching] = useState({ dynamic: true, static: false });
  // List chosen
  const [listChosenSubject, setListChosenSubject] = useState<ListOption>([]);
  const [listChosenGrade, setListChosenGrade] = useState<ListOption>([]);
  const [listChosenFomatTeaching, setChosenListFomatTeaching] = useState<ListOption>([]);
  const [listChosenGender, setListChosenGender] = useState<ListOption>([]);
  const [listChosenArea, setListChosenArea] = useState<ListOption>([]);
  const [listChosenWeekday, setListChosenWeekday] = useState<ListWeekday[]>(dataWeekday);
  // 
  // const [listChosenInitSubject, setListChosenInitSubject] = useState<ListOption>([]);
  // const [listChosenInitGrade, setListChosenInitGrade] = useState<ListOption>([]);
  // const [listChosenFomatInitTeaching, setChosenListFomatInitTeaching] = useState<ListOption>([]);
  // const [listChosenInitGender, setListChosenInitGender] = useState<ListOption>([]);
  // const [listChosenInitArea, setListChosenInitArea] = useState<ListOption>([]);
  const [listChosenInitWeekday, setListChosenInitWeekday] = useState<ListWeekday[]>(dataWeekday);
  //Modal State
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);
  const [isShowSuccessModal, setIsShowSuccessModal] = useState<boolean>(false);

  //Error
  const [subjectError, setSubjectError] = useState<string>('');
  const [grandError, setGradeError] = useState<string>('');
  const [fomatTeachingError, setFomatTeachingError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [areaError, setAreaError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  //isValid
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [addressValid, setAddressValid] = useState<boolean>(false);
  const [descriptionValid, setDescriptionValid] = useState<boolean>(false);
  
  // 
  const getSecondFromPathName = () => {
    return window.location.pathname.split('/')[3]
  }

  //Validation
  const validatePhone = () => {
    // if (currentUser) return true;
    if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone) && phone) {
      setPhoneError('*Số điện thoại không chính xác!');
      setPhoneValid(false);
    } else {
      setPhoneError('');
      setPhoneValid(true);
    }
  };

  const handleBlurPhone = () => {
    if (phone === '') return;
    validatePhone();
  };

  //validate completer info
  const handleCheckCompleteInfor = () => {
    if (
      addressValid &&
      phoneValid &&
      descriptionValid &&
      listChosenSubject.length > 0 &&
      listChosenGrade.length > 0 &&
      listChosenFomatTeaching.length > 0 &&
      listChosenArea.length > 0 &&
      listChosenGender.length > 0 &&
      address &&
      phone &&
      description
    ) {
      return true;
    }
    return false;
  };
  
  const handleCheckValidAll = () => {
    if (!handleCheckCompleteInfor()) {
      if (!listChosenSubject.length) {
        setSubjectError('*Vui lòng chọn môn học');
      }
      if (!listChosenGrade.length) {
        setGradeError('*Vui lòng chọn lớp');
      }
      if (!listChosenFomatTeaching.length) {
        setFomatTeachingError('*Vui lòng chọn hình thức');
      }
      if (!listChosenGender.length) {
        setGenderError('*Vui lòng chọn giới tính');
      }
      if (!listChosenArea.length) {
        setAreaError('*Vui lòng chọn khu vực');
      }
      if (!address) {
        setAddressError('*Vui lòng nhập địa chỉ!');
        setAddressValid(false);
      }
      if (!phone) {
        setPhoneError('*Vui lòng nhập số điện thoại!');
        setPhoneValid(false);
      }
      if (!description) {
        setDescriptionError('*Vui lòng nhập mô tả!');
        setDescriptionValid(false);
      }
      return false;
    }
    return true;
  };

  const onChangeTimeTeaching = (e: any) => {
    const { name } = e.target;
    if (name === 'static') {
      setTimeTeaching({ dynamic: false, static: true });
    }
    if (name === 'dynamic') {
      setTimeTeaching({ dynamic: true, static: false });
    }
  };

  const handleSubmitPost = (e: any) => {
    e.stopPropagation();
    if (handleCheckValidAll()) {
      apiPost.createPost({
        SubjectId: listChosenSubject[0].key,
        ClassId: listChosenGrade[0].key,
        IsFlexibleTime: timeTeaching.dynamic ? 1 : 0,
        Address: address,
        Contact: phone,
        Description: description,
        Teachingformids: listChosenFomatTeaching.length? listChosenFomatTeaching.map((item: { key: number; value: string }) => 
        item.key,
      ):[],
        GenderIds: listChosenGender.map((item:any) => {
          return item.key
        }),
        AreaIds: listChosenArea.length? listChosenArea.map((item: { key: number; value: string }) => item.key ):[],
        PostSessionWeeks: listChosenWeekday.map((item) => {
          return {
            WeekdayId: item.weekdayid,
            SessionDays: item.sessiondays.map((i:any) => {
              return { SessionDayId:i.sessiondayid}
            })
          }
        }),
      }).then((res) => {
        setIsShowSuccessModal(true);
      });
      
    } else return;
  };
  const handleSumitEdit = (e:any) => {
    e.stopPropagation();
    if (handleCheckValidAll()) {
      setIsShowConfirmModal(true);

    } else return;
  }
  const updatePost = () => {
    setIsShowConfirmModal(false);
     apiPost.updatePost({
        Id: id ? id : "0",
        SubjectId: listChosenSubject[0].key,
        ClassId: listChosenGrade[0].key,
        IsFlexibleTime: timeTeaching.dynamic ? 1 : 0,
        Address: address,
        Contact: phone,
        Description: description,
        Teachingformids: listChosenFomatTeaching.length? listChosenFomatTeaching.map((item: { key: number; value: string }) => 
        item.key,
      ):[],
        GenderIds: listChosenGender.map((item:any) => {
          return item.key
        }),
        AreaIds: listChosenArea.length? listChosenArea.map((item: { key: number; value: string }) => item.key ):[],
        PostSessionWeeks: listChosenWeekday.map((item) => {
          return {
            WeekdayId: item.weekdayid,
            SessionDays: item.sessiondays.map((i:any) => {
              return { SessionDayId:i.sessiondayid}
            })
          }
        }),
      }).then((res) => {
        setIsShowSuccessModal(true);
      });
  }

  useEffect(() => {
    apiSystem
      .getSubjectSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListSubject(res.data.Content.Subjects);
      });

    apiSystem
      .getClasssSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListGrade(res.data.Content.Classes);
      });

    apiSystem
      .getTeachingFormSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListFomatTeaching(res.data.Content.Forms);
      });

    apiSystem
      .getAreaSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListArea(res.data.Content.Areas);
      });
  }, []);

  const checkEditPage = () => {
    return getSecondFromPathName() === "edit";
  }
  useEffect(() => {
    if(checkEditPage()) {
      apiPost.getInfoPost({
        PostId: id ? id : "0"
      }).then((res) => {
        
        const post:IInfoPost = res.data.Content.Post;
        // setListChosenSubject([{
        //   key: post.subjectid,
        //   value: post.subjecttext
        // }]);

        setListChosenSubject([{
          key: post.SubjectId,
          value: post.SubjectText
        }]);

        // setListChosenGrade([{
        //   key: post.classid,
        //   value: post.classtext
        // }]);
        setListChosenGrade([{
          key: post.ClassId,
          value: post.ClassText
        }]);

        setTimeTeaching({
          dynamic:Boolean(post.IsFlexibleTime),
          static: Boolean(!post.IsFlexibleTime),
        })
        // setListChosenWeekday(post.postsessionweeks.map((item:any) => {
        //   return {
        //     weekdayid: item.weekdayid,
        //     sessiondays: item.sessiondays.map(() => ({
        //       sessiondayid: item.sessiondayid,
        //       sessionday: item.sessiondaytext
        //     }))
        //   }
        // }))

        setListChosenInitWeekday(post.PostSessionWeeks.map((item) => {
          return {
            weekdayid: item.WeekdayId,
            sessiondays: item.SessionDays && item.SessionDays.map((i) => ({
              sessiondayid: i.SessionDayId,
              sessionday: i.SessionDayText
            }))
          }
        }))
        
        // setChosenListFomatTeaching(post.postteachingforms.map((item:any) => {
        //   return {
        //     key: item.id,
        //     value: item.title
        //   }
        // }))

        setChosenListFomatTeaching(post.PostTeachingForms.map((item) => {
          return {
            key: item.Id,
            value: item.Title
          }
        }))

        // setListChosenGender(post.postgenders.map((item:any) => ({
        //   key: item.id,
        //   value: item.title
        // })))

        setListChosenGender(post.PostGenders.map((item) => ({
          key: item.Id,
          value: item.Title
        })))
        
        setListChosenArea(post.PostAreas.map((item) => ({
          key: item.Id,
          value: item.Title
        })))

        setAddress(post.Address);
        setPhone(post.Phone);
        setDescription(post.Description)

        setAddressValid(true);
        setDescriptionValid(true);
        setPhoneValid(true);
      })
    }
  },[])

  return (
    <div className="post-find-tutor">
      <HeaderTitleMobile title={checkEditPage() ? "Chỉnh sửa tin đăng":"Đăng nhu cầu"} onClick={() => {
        if(checkEditPage()) {
          history(-1);
        } 
        else setIsShowConfirmModal(true)
        }} />
      <div className="post-find-tutor__intro">
        <img src={FindTutorIntroImage} alt="" />
      </div>

      <div className="post-find-tutor__item post-find-tutor__subject">
        <p className="post-find-tutor__label">Môn học </p>
        <DropdownTick
          listOption={listSubject.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title ,
          }))}
          isMultipleOption={false}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenSubject(listChosenOption);
            setSubjectError('');
          }}
          placeholder="Chọn môn học"
          listChosenOption={listChosenSubject}
        />
        <p className="input__error">{subjectError}</p>
      </div>

      <div className="post-find-tutor__item post-find-tutor__grade">
        <p className="post-find-tutor__label">Đăng kí lớp </p>
        <DropdownTick
          listOption={listGrade.map((item: { Id: number; Name: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Name,
          }))}
          isMultipleOption={false}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenGrade(listChosenOption);
            setGradeError('');
          }}
          placeholder="Lớp học đăng kí dạy"
          listChosenOption={listChosenGrade}
        />
        <p className="input__error">{grandError}</p>
      </div>

      <div className="post-find-tutor__item post-find-tutor__time-teaching">
        <p className="post-find-tutor__label">Thời gian dạy </p>
        <p className="post-find-tutor__description">Thời gian dạy linh hoạt theo lịch của bạn.</p>
        <div className="post-find-tutor__radio-group">
          <RadioButton
            name="dynamic"
            id="dynamic"
            label="Linh hoạt"
            onChange={onChangeTimeTeaching}
            checked={timeTeaching.dynamic}
          />
          <RadioButton
            name="static"
            id="static"
            label="Buổi/ tuần"
            onChange={onChangeTimeTeaching}
            checked={timeTeaching.static}
          />
        </div>

        {timeTeaching.static && <TeachingSchedule setListChosenWeekdayMother = {setListChosenWeekday} listChosenInitWeekday = {listChosenInitWeekday}/>}
      </div>
       
      <div className="post-find-tutor__item post-find-tutor__format-teaching">
        <p className="post-find-tutor__label">Hình thức dạy </p>
        <DropdownTick
          listOption={listFomatTeaching.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption={true}
          setListChosenOption={(listChosenOption: ListOption) => {
            setChosenListFomatTeaching(listChosenOption);
            setFomatTeachingError('');
          }}
          placeholder="Chọn hình thức dạy"
          listChosenOption={listChosenFomatTeaching}
        />
        <p className="input__error">{fomatTeachingError}</p>
      </div>

      <div className="post-find-tutor__item post-find-tutor__sex">
        <p className="post-find-tutor__label">Giới tính </p>
        <DropdownTick
          listOption={dataGender}
          isMultipleOption={true}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenGender(listChosenOption);
            setGenderError('');
          }}
          placeholder="Chọn giới tính"
          listChosenOption={listChosenGender}
        />
        <p className="input__error">{genderError}</p>
      </div>

      <div className="post-find-tutor__item post-find-tutor__area">
        <p className="post-find-tutor__label">Khu vực </p>
        <DropdownTick
          listOption={listArea.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption={true}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenArea(listChosenOption);
            setAreaError('');
          }}
          placeholder="Chọn khu vực"
          listChosenOption={listChosenArea}
        />
        <p className="input__error">{areaError}</p>
      </div>

      <div className="post-find-tutor__item post-find-tutor__address">
        <p className="post-find-tutor__label">Địa chỉ </p>
        <Input
          placeholder="Nhập địa chỉ"
          onChange={(e: any) => {
            setAddress(e.target.value);
          }}
          value={address}
          maxLength={100}
          isClear={true}
          error={addressError}
          onFocus={() => {
            setAddressError('');
            setAddressValid(true);
          }}
        />
      </div>

      <div className="post-find-tutor__item post-find-tutor__address">
        <p className="post-find-tutor__label">Liên hệ </p>
        <Input
          placeholder="Nhập số điện thoại"
          onChange={(e: any) => {
            const value = e.target.value.replace(/ /g, '');
            if (value.length < 11) setPhone(value);
          }}
          value={phone}
          isClear={true}
          setName={setPhone}
          type="text"
          validation="phone"
          isNumber={true}
          error={phoneError}
          onFocus={() => {
            setPhoneError('');
          }}
          onBlur={e => handleBlurPhone()}
        />
      </div>

      <div className="post-find-tutor__item post-find-tutor__disc">
        <p className="post-find-tutor__label">Mô tả chi tiết </p>
        <TextArea
          placeholder="Nhập mô tả"
          rows={5}
          onChange={(e: any) => {
            setDescription(e.target.value);
            setDescriptionError('');
            setDescriptionValid(true);
          }}
          maxLength={200}
          value={description}
        />
        <p className="input__error">{descriptionError}</p>
      </div>

      <div className="post-find-tutor__footer">
        <Button className="btn-post" children={checkEditPage()?"Cập nhật":"Đăng tin"} onClick={() => {
          return checkEditPage()? handleSumitEdit(event):handleSubmitPost(event)}} />
      </div>
      {checkEditPage()?  <>
        <ModalConfirm
          isShow={isShowConfirmModal}
          onClose={() => {
            setIsShowConfirmModal(false);
          }}
          text="Bạn có chắc muốn lưu những chỉnh sửa cho tin đăng?"
          isReturnConfirm = {false}
          handleSave = {updatePost}
        />
        <ModalSuccess
          isShow={isShowSuccessModal}
          text="Bạn đã cập nhật thông tin thành công!"
          setIsShow={setIsShowSuccessModal}
      />
      </>:<>
        <ModalConfirm
          isShow={isShowConfirmModal}
          onClose={() => {
            setIsShowConfirmModal(false);
          }}
          text="Bạn chưa hoàn tất đăng tin. Bạn có chắc chắn muốn thoát không?"
          textRightButton="Thoát"
        />
        <ModalSuccess
          isShow={isShowSuccessModal}
          text="Nhu cầu tìm gia sư của bạn đã được đăng thành công. YOTUTOR sẽ xem và phản hồi bạn sớm nhất nhé!"
          setIsShow={setIsShowSuccessModal}
          clickOutside = {() => {
           history(-1)
          }}
      />
      </>}
      
    </div>
  );
};
