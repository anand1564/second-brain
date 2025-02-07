// GoogleSignIn.tsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleSignIn: React.FC = () => {
  const responseGoogle = (response: any) => {
    console.log('Google response:', response);
    window.alert('Google response: ' + JSON.stringify(response));
  };

  const errorGoogle = (error: void) => {
    console.error('Google error:', error);
  };

  return (
    <GoogleOAuthProvider clientId="">
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={errorGoogle}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;