import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styled from 'styled-components';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log(watch('example'));

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" defaultValue="email" {...register('email')} />
        <label>Name</label>
        <input {...register('name', { required: true })} />
        <label>Password</label>
        <input type="password" {...register('password', { required: true })} />
        <label>Password Confirm</label>
        <input
          type="password"
          {...register('password_confirm', { required: true })}
        />

        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <input type="submit" />
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
