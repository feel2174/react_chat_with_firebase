import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" placeholder="ID" {...register('id')} />
        <label>Password</label>
        <input
          type="password"
          placeholder="PW"
          {...register('password', { required: true })}
        />{' '}
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
