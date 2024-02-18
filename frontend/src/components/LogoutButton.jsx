const LogoutButton = () => {
  const logout = async () => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const returnTo = 'http://localhost:3000';

    const response = await fetch(
      `${domain}/v2/logout?client_id=${clientId}&return_to=${returnTo}`,
      {
        redirect: 'manual',
        method: 'GET',
      }
    );

    window.location.replace(response.url);
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        console.log('logout');
        logout();
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
