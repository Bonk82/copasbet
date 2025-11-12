import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';

export default function GoogleLoginButton() {
  useEffect(() => {
    /* global google */
    if (!window.google) return;
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
      theme: 'filled_black',
      size: 'large'
    });
  }, []);

  async function handleCredentialResponse(response) {
    // response.credential es el id_token de Google
    const { login } = UserAuth();
    const id_token = response.credential;
    // Enviar al backend para verificar y crear usuario
    console.log('el response',response);

    await login({operacion:'G',user:response,pass:id_token});
    return;
    
    // const res = await fetch('/auth/google', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id_token }),
    //   credentials: 'include' // MUY importante para cookies httpOnly
    // });
    // const data = await res.json();
    // if (res.ok) {
    //   // usuario autenticado; el cookie httpOnly ya fue seteado por el backend
    //   console.log('Usuario:', data.user);
    // } else {
    //   console.error('Error login:', data);
    // }
  }

  return <div id="g_id_signin"></div>;
}
