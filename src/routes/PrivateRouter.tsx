import React, { useState } from 'react';
import { checkIsLogined } from '../utils/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
export const PrivateRouter: React.FC<IPublicRouter> = ({ header: Header, layout: Layout, component: Component }) => {
  const history = useNavigate();
  useEffect(() => {
    checkIsLogined()
      .then(res => {
        if (!res) {
          logout();
          history('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <Layout
      header={<Header />}
      // footer = {<Footer />}
      // sidebar = {<Sidebar />}
    >
      <Component />
    </Layout>
  );
};
