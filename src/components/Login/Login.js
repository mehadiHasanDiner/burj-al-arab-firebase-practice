import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css'
import { GoogleLoginButton} from "react-social-login-buttons";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
const [loggedInUser, setLoggedInUser]= useContext(UserContext);
const history = useHistory();
const location = useLocation();
const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
       const handleGoogleSignIn = () => {              
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const {displayName, email} = result.user;
                const signedInUser = {name: displayName, email}
                setLoggedInUser(signedInUser);
                history.replace(from);
                console.log(signedInUser);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log( error, errorCode, errorMessage, email, credential)
            });
    }
    return (
        <div>
            <div className="login-btn">
                <GoogleLoginButton style={{ border: '1px solid' }} onClick={handleGoogleSignIn} />
                {/* <FacebookLoginButton onClick={} /> */}
            </div>
        </div>
    );
};

export default Login;