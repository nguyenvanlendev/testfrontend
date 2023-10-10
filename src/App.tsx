import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

import { PublicRouter } from './routes/PublicRouter';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import Login from './container/HomePage/Login';
import { HomePage } from './container/HomePage/HomePage';
import { MainNavbar } from './components/common/MainNavbar/MainNavbar';
import ForgotPassword from './container/HomePage/ForgotPassword';
import { FindTutor } from './container/StudentPage/FindTutor/FindTutor';
import { FindPost } from './container/TutorPage/FindPost/FindPost';
import ProfileInfoMobile from './components/Profile/ProfileInfo/ProfileInfoMobile';
import UpdateProfileMobile from './components/Profile/UpdateProfile/UpdateProfileMobile';
import NotificationMobile from './components/Notification/NotificationMobile';
import { FindTutorResult } from './container/StudentPage/FindTutorResult/FindTutorResult';
import { QuickFindTutor } from './container/StudentPage/QuickFindTutor/QuickFindTutor';
import Register from './container/HomePage/Register';

import { Avatar } from './components/common/Avatar/Avatar';
import { PostFindTutor } from './container/StudentPage/PostFindTutor/PostFindTutor';
import { FilterPost } from './container/TutorPage/FilterPost/FilterPost';
// import EditAvatar from './components/common/EditAvatar';
import ClassDetails from './container/HomePage/ClassDetails';
import EditAvatar from './components/common/EditAvatar';
import { ProfileGeneral } from './container/HomePage/ProfileGeneral/ProfileGeneral';
import { TutorProfile } from './container/TutorPage/CreateProfile/TutorProfile';
import { ManageFile } from './container/HomePage/ManageFile/ManageFile';

import TutorDetailsInfo from './container/StudentPage/TutorDetailsInfo/TutorDetailsInfo';
import TutorProfiles from './container/TutorPage/TutorProfiles';
import YourProfiles from './container/TutorPage/YourProfiles';
import { NewPost } from './container/StudentPage/NewPost/NewPost';
import { PrivateRouter } from './routes/PrivateRouter';
import TutorCLass from './container/TutorPage/TutorClass/TutorClass';
import { Signalr } from './services/singalr';
import ReviewChangeTutor from './container/StudentPage/ReviewChangeTutor/ReviewChangeTutor';
export default function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<PublicRouter component={HomePage} layout={MainLayout} header={MainNavbar} />} />
            <Route
              path={'/login'}
              element={<PublicRouter component={Login} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/forgot'}
              element={<PublicRouter component={ForgotPassword} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/student/find-tutor'}
              element={<PublicRouter component={FindTutor} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'student/find-tutor/:id'}
              element={<PublicRouter component={FindTutorResult} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/profile'}
              element={<PrivateRouter component={ProfileInfoMobile} layout={MainLayout} header={MainNavbar} />}
            />

            <Route
              path={'/profile-general/avatar/:type'}
              element={<PublicRouter component={EditAvatar} layout={MainLayout} header={MainNavbar} />}
            />

            <Route
              path={'/notification'}
              element={<PublicRouter component={NotificationMobile} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/student/quick-find-tutor'}
              element={<PublicRouter component={QuickFindTutor} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/student/post-find-tutor/post'}
              element={<PrivateRouter component={PostFindTutor} layout={MainLayout} header={MainNavbar} />}
            />

            <Route
              path={'/student/post-find-tutor/edit/:id'}
              element={<PrivateRouter component={PostFindTutor} layout={MainLayout} header={MainNavbar} />}
            />

            <Route
              path={'/student/tutor-detail-info/:id'}
              element={<PublicRouter component={TutorDetailsInfo} layout={MainLayout} header={MainNavbar} />}
            />

            <Route
              path={'/student/review-change-tutor'}
              element={<PublicRouter component={ReviewChangeTutor} layout={MainLayout} header={MainNavbar} />}
            />

            <Route
              path={'/tutor'}
              element={<PublicRouter component={FindPost} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/tutor-class'}
              element={<PublicRouter component={TutorCLass} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/filter-post'}
              element={<PublicRouter component={FilterPost} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/profiles/:id'}
              element={<PrivateRouter component={TutorProfile} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/profile'}
              element={<PublicRouter component={TutorProfile} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/choose-profiles'}
              element={<PrivateRouter component={TutorProfiles} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/your-profiles'}
              element={<PublicRouter component={YourProfiles} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/class-details/:id'}
              element={<PublicRouter component={ClassDetails} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/profile-general/:id'}
              element={<PublicRouter component={ProfileGeneral} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/student/manage-profile'}
              element={<PublicRouter component={ManageFile} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/tutor/manage-profile'}
              element={<PublicRouter component={ManageFile} layout={MainLayout} header={MainNavbar} />}
            />
            <Route
              path={'/student/new-post'}
              element={<PrivateRouter component={NewPost} layout={MainLayout} header={MainNavbar} />}
            />
          </Routes>
        </BrowserRouter>

        <Signalr />
      </Suspense>
    </div>
  );
}
