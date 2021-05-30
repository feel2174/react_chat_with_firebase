import { useForm } from 'react-hook-form';
import { useState } from 'react';
import firebase from '../../firebase';
import styled from 'styled-components';
import Link from 'next/link';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorSubmit, setErrorSubmit] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const signInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      console.log('signInUser', signInUser);
      setLoading(false);
    } catch (error) {
      setTimeout(() => {
        setErrorSubmit('');
      }, 3000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>ID</label>
        <input
          type="email"
          placeholder="아이디(이메일)를 입력해주세요."
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>This field is for Email</span>}
        <label>Password</label>
        <input
          placeholder="비밀번호를 입력해주세요."
          type="password"
          {...register('password', { required: true })}
        />

        {errorSubmit && <p>{errorSubmit}</p>}

        <input type="submit" disabled={loading} />
        <LoginLink href="/register">아직 아이디가 없다면...</LoginLink>
      </form>
    </div>
  );
};
export default LoginPage;

const LoginLink = styled(Link)`
  color: gray;
  text-decoration: none;
`;
