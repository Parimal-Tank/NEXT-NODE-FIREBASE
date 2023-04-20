import styles from "../../styles/Home.module.css";
import Head from "next/head";
import app from '../../../firebaseConfig';
import { useEffect, useState } from "react";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword , GoogleAuthProvider , GithubAuthProvider , signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

 
const Login = () => {

     const auth = getAuth();
     const googleAuthProvider = new GoogleAuthProvider();
     const githubAuthProvider = new GithubAuthProvider();
     const router  = useRouter();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');


    useEffect(() => {
        let token = sessionStorage.getItem('Token');

        if(token){
            router.push('/');
        }
    },[])

    const signUp = () => {
      signInWithEmailAndPassword(auth , email , password)
        .then(() => {
             router.push('/');
        })
       .catch((err) => {
            alert('Email Id Does not Exist');
       })
    }

    const signUpWithGoogle = () => { 
            signInWithPopup(auth , googleAuthProvider)
            .then((response) => {
                sessionStorage.setItem('Token' , response.user.accessToken);
                router.push('/');
            }) 
    }

    const signUpWithGithub = () => {
        signInWithPopup(auth , githubAuthProvider)
        .then((response) => {
            sessionStorage.setItem('Token' , response.user.accessToken);
            router.push('/');
        })
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Parimal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Login</h1>

        <input
          placeholder="Email"
          className={styles.inputBox}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
        />
        <input
          placeholder="Password"
          className={styles.inputBox}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
        />

        <button className={styles.button} onClick={signUp}>
          Sign In
        </button>
        <hr />
        <button className={styles.googleAlt} onClick={signUpWithGoogle}>
          Sign Up with Google
        </button>
        <hr />
        <button className={styles.googleAlt} onClick={signUpWithGithub}>
          Sign Up with Github
        </button>
      <h5>Do not Have Account? </h5>
      <Link legacyBehavior href='/register'>
              Register
      </Link>
      </main>

    </div>
  );
};

export default Login;
