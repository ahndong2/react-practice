import React, { useEffect } from 'react';
import { LoginLayout } from 'components/templates';
import Login from './components/templates/Login';

const LoginContainer = () => {
  useEffect(() => {}, []);

  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
};

export default LoginContainer;
