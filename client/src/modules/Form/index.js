import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from 'react-router-dom';

const Form = ({ isSignInPage = true }) => {
  const [data, setData] = useState({
    ...(isSignInPage && {
      firstname: '',
      lastname: '',
    }),
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/${isSignInPage ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.status === 400) {
        alert('Invalid credentials');
      } else {
        const resData = await res.json();
        
        if (resData.token) {
          localStorage.setItem('user:token', resData.token);
          localStorage.setItem('user:detail', JSON.stringify(resData.user));
      window.location.href=
       '/mfa-verification';
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle error (e.g., show a user-friendly message)
    }
  };

  return (
    <div className="bg-light h-screen flex items-center justify-center">
      <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">Welcome {isSignInPage && 'Back'}</div>
        <div className="text-xl font-light mb-14">
          {isSignInPage ? 'Sign in to get explored' : 'Sign up to get started'}
        </div>
        <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>
          {!isSignInPage && (
            <>
              <Input
                label="First name"
                name="firstname"
                placeholder="Enter your first name"
                className="mb-6 w-[75%]"
                value={data.firstname}
                onChange={(e) => handleChange('firstname', e.target.value)}
              />
              <Input
                label="Last name"
                name="lastname"
                placeholder="Enter your last name"
                className="mb-6 w-[75%]"
                value={data.lastname}
                onChange={(e) => handleChange('lastname', e.target.value)}
              />
            </>
          )}
          <Input
            label="Email address"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="mb-6 w-[75%]"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="mb-14 w-[75%]"
            value={data.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <Button label={isSignInPage ? 'Sign in' : 'Sign up'} type="submit" className="w-[75%] mb-2" />
        </form>
        <div>
          {isSignInPage ? "Didn't have an account?" : "Already have an account?"}{' '}
          <span className="text-primary cursor-pointer underline" onClick={() => navigate(`/users/${isSignInPage ? 'sign_up' : 'sign_in'}`)}>
            {isSignInPage ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;

