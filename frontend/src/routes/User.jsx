import { useEffect, useState } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserRoute = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const [testResponseCode, setTestResponseCode] = useState();
  const [user, setUser, tokenData, setTokenData] = useOutletContext();

  useEffect(() => {
    if (code) {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        code_verifier: 'abc123',
        code,
        redirect_uri: 'http://localhost:3000/user',
      });

      fetch(`${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const user = jwtDecode(res.id_token);
          setUser(user);
          setTokenData(JSON.stringify(res));
        })
        .catch((e) => console.log('e :>> ', e));
    }
  }, [code]);

  const pingTest = async () => {
    if (tokenData) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/test`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(tokenData)['access_token']}`,
        },
      });

      setTestResponseCode(res.status);
    }
  };

  return (
    <div className="App">
      {!user && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          Not Logged In :(
        </div>
      )}
      {user && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: '#808080', textAlign: 'center' }}>
            <img src={user ? user.picture : ''} alt="user" width="200" height="200" />
            <p
              style={{
                padding: '5px',
                backgroundColor: '#808080',
                color: 'white',
              }}
            >
              {user ? user.nickname : ''}
            </p>
            <p
              style={{
                padding: '5px',
                backgroundColor: '#808080',
                color: 'white',
              }}
            >
              {user ? user.name : ''}
            </p>
          </div>
          <button onClick={pingTest} style={{ width: '20%', marginTop: '10px' }}>
            Ping API
          </button>
          {testResponseCode && testResponseCode >= 200 && testResponseCode < 300 && (
            <p
              style={{
                padding: '5px',
                color: '#3BB143',
              }}
            >
              Success
            </p>
          )}
          {testResponseCode && testResponseCode >= 400 && (
            <p
              style={{
                padding: '5px',
                color: '#D30000',
              }}
            >
              Failed
            </p>
          )}
          <p
            style={{
              padding: '5px',
              backgroundColor: '#808080',
              color: 'white',
              width: '50%',
              overflow: 'visible',
              overflowWrap: 'break-word',
            }}
          >
            {tokenData}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserRoute;
