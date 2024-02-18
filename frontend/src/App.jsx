import './App.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/Nav';

function App() {
  const [user, setUser] = useState();
  const [tokenData, setTokenData] = useState();

  return (
    <>
      <Nav user={user} />
      <Outlet context={[user, setUser, tokenData, setTokenData]} />
    </>
  );
}

export default App;
