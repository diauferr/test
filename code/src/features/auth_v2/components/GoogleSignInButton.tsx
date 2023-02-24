import React from 'react';

export const GoogleSignInButton = ({ onClick }) => (
  <div>
    <button className="socialButton" onClick={onClick}>
      <img src={'/assets/images/google-logo.svg'} />

      <span>Login com Google</span>

      <img src={'/assets/images/google-logo.svg'} style={{ opacity: 0 }} />
    </button>
    <span>*Caso seu e-mail seja do Google</span>
  </div>
);
