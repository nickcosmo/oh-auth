// import { useAuth0 } from '@auth0/auth0-react';
import { base64URLEncode, sha256Gen } from '../util/challenge';

const LoginButton = () => {
  const login = async () => {
    // generate challenge
    const verifier = base64URLEncode('abc123'); // this should be random string
    const sha = sha256Gen(verifier);
    const challenge = base64URLEncode(sha.toString());

    const scope = 'read:users openid offline_access email profile';
    const redirectUri = 'http://localhost:3000/user';

    const url =
      `${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?` +
      `audience=${process.env.REACT_APP_AUTH0_AUDIENCE}&` +
      `scope=${scope}&` +
      `response_type=code&` +
      `client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&` +
      `redirect_uri=${redirectUri}&` +
      `code_challenge_method=S256` +
      `code_challenge=${challenge}`;

    const response = await fetch(url, {
      redirect: 'manual',
      method: 'GET',
    });
    window.location.replace(response.url);
  };
  return <button onClick={() => login()}>Log In</button>;
};

export default LoginButton;
