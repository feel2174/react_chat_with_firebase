import React, { useEffect } from 'react';

import Head from 'next/head';
import { AppProps } from 'next/app';

import firebase from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import wrapper from '../redux/wrapper';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { clearUser, setUser } from '../redux/actions/user_action';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Router.push('/');
        dispatch(setUser(user));
      } else {
        Router.push('/login');
        dispatch(clearUser());
      }
    });
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
