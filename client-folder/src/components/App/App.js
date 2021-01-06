import { useEffect, useRef, useState } from 'react';
import '../generalStyles/general.scss';
import moduleStyles from './App.module.scss';
import axios from 'axios';
import gapiService from './../../services/service';

const App = () => {
  const [user, setUser] = useState({});
  const validateRef = useRef();
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    gapiService(() => {
      window.gapi.load('auth2', () => {
        this.auth2 = window.gapi.auth2.init({
          client_id: '928833285884-v6eiobnaf4r33oombmfss6ok3260k2a4.apps.googleusercontent.com',
        });
      });
    })
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0 && user.constructor === Object) {
      axios.get('http://localhost:5000/users')
        .then((res) => {
          const { data } = res;
          for (let item of data) {
            if (user.userEmail === item.userEmail) {
              setUserId((userId) => userId = item._id);
            }
            else {
              setUserId((userId) => userId = "");
            }
          }
        })
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const updatedUser = { ...user, id: userId };
      axios.put(`http://localhost:5000/users/:${userId}`, updatedUser)
        .then((res) => {
          validateRef.current.textContent = res.data;
        })
        .catch((err) => console.log(`Errors: ${err}`))
    }
    else {
      axios.post('http://localhost:5000/users', user)
        .then((res) => {
          validateRef.current.textContent = res.data;
        })
        .catch((err) => console.log(`Errors: ${err}`))
    }
  }, [userId])

  const signIn = () => {
    gapiService((GoogleAuth) => {
      GoogleAuth.signIn(
        {
          scope: 'profile email',
        }
      ).then((googleUser) => {
        validateRef.current.textContent = '';
        const userEmail = googleUser.getBasicProfile().getEmail();
        const userName = googleUser.getBasicProfile().getGivenName();
        const userFamilyName = googleUser.getBasicProfile().getFamilyName();
        const userAvatar = googleUser.getBasicProfile().getImageUrl();
        setUser((user) => user = {
          userEmail,
          userName,
          userFamilyName,
          userAvatar
        })
      })
        .catch((err) => console.log(`Errors: ${err}`))
    })
  }

  const signOut = () => {
    gapiService((GoogleAuth) => {
      GoogleAuth.signOut().then(function () {
        setUser({});
        setUserId(false);
        validateRef.current.textContent = 'User signed out';
      })
        .catch((err) => console.log(`Errors: ${err}`))
    })
  }
  return (
    <div className={moduleStyles.container}>
      <div className={moduleStyles.row}>
        <div className="g-signin2" data-onsuccess="onSignIn" onClick={() => signIn()}></div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      {user.userEmail ? <div className={moduleStyles.userContainer}>
        <div className={moduleStyles.userImgWrapper}>
          <img src={user.userAvatar} alt="user avatar" />
        </div>
        <p>User: {user.userName}</p>
        <p>Family name: {user.userFamilyName}</p>
        <p>Email: {user.userEmail}</p>
      </div> : null}
      <p ref={validateRef}></p>
    </div>
  );
}

export default App;
