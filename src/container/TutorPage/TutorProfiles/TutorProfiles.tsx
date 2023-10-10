import { useEffect, useState } from 'react';
import { apiTutor } from '../../../services/axios/apiTutor';
import { checkIsLogined } from '../../../utils/auth';
import EmptyTutorProfile from './EmptyTutorProfile';
import ListTutorProfile from './ListTutorProfile';
import './TutorProfiles.scss';
import { useNavigate } from 'react-router-dom';

const TutorProfiles = () => {
  const navigate = useNavigate();
  const [listTutorProfiles, setListTutorProfiles] = useState<ITutor[]>([]);

  useEffect(() => {
    handleCallApi();
  }, []);

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/tutor/profiles/new?isFrom=choose-profiles');
  };

  const handleCallApi = async () => {
    const isLogin = await checkIsLogined();
    if (isLogin) {
      try {
        let response = await apiTutor.getTutorProfiles({
          CurrentPage: 0,
          Limit: 0,
          Status: 'MyProfile',
          FindString: '',
          GenderId: -1,
          AcademicLevelId: 0,
          PostId: 0,
          SubjectIds: [],
          ClassIds: [],
          TeachingFormIds: [],
          AreaIds: [],
        });
        setListTutorProfiles(response.data.Content.Tutors);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {listTutorProfiles && listTutorProfiles.length > 0 ? (
        <ListTutorProfile listTutorProfiles={listTutorProfiles} />
      ) : (
        <EmptyTutorProfile onClick={e => handleNavigate(e)} />
      )}{' '}
    </>
  );
};

export default TutorProfiles;
