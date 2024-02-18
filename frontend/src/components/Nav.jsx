import styles from './Nav.module.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';

const Nav = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.nav}>
      <ul>
        <li
          className={styles.navItem}
          onClick={() => {
            navigate('/');
          }}
        >
          Home
        </li>
        <li
          className={styles.navItem}
          onClick={() => {
            navigate('/user');
          }}
        >
          User
        </li>
        <li>
          {!user && <LoginButton />}
          {user && <LogoutButton />}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
