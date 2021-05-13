import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import firebase from '../../firebase';

import md5 from 'md5';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorSubmit, setErrorSubmit] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      console.log('createdUser', createdUser);

      await createdUser.user?.updateProfile({
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(data.email)}?d=identicon`,
      });

      setLoading(false);
    } catch (error) {
      setErrorSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorSubmit('');
      }, 3000);
    }
  };
  const password = useRef();
  password.current = watch('password');

  // console.log(watch('email'));

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          defaultValue="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>This field is for Email</span>}
        <label>Name</label>
        <input {...register('name', { required: true, maxLength: 10 })} />
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: true, minLength: 8 })}
        />
        {errors.password && <span>password has to be over 8 characters</span>}
        <label>Password Confirm</label>
        <input
          type="password"
          {...register('password_confirm', {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === 'validate' && (
            <p>The passwords do not match</p>
          )}
        {errorSubmit && <p>{errorSubmit}</p>}

        <input type="submit" disabled={loading} />
        <LoginLink href="/login">이미 아이디가 있다면...</LoginLink>
      </form>
    </div>
  );
};
export default RegisterPage;

const LoginLink = styled(Link)`
  color: gray;
  text-decoration: none;
`;
