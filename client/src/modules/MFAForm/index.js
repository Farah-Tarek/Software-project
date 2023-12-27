import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from 'react-router-dom';

const MFAVerificationForm = () => {
  const [mfaCode, setMfaCode] = useState('');

  const userId =    JSON.parse(localStorage.getItem('user:detail')).id;

  const navigate = useNavigate();

  const handleChange = (value) => {
    setMfaCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/is-mfa-correct/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret: mfaCode }),
      });

      if (res.status === 401) {
        alert('Invalid MFA code');
      } else {
        const resData = await res.json();
        if (resData.message === 'MFA correct') {
          // MFA verification successful, you can perform additional actions if needed
          alert('MFA verification successful');
          navigate('/tickets/create');
        }
      }
    } catch (error) {
      console.error('Error during MFA verification:', error);
      // Handle error (e.g., show a user-friendly message)
    }
  };

  return (
    <div className="bg-light h-screen flex items-center justify-center">
      <div className="bg-white w-[600px] h-[400px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">MFA Verification</div>
        <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="MFA Code"
            type="text"
            name="mfaCode"
            placeholder="Enter your MFA code"
            className="mb-6 w-[75%]"
            value={mfaCode}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button label="Verify MFA" type="submit" className="w-[75%] mb-2" />
        </form>
        <div>
          <span className="text-primary cursor-pointer underline" onClick={() => navigate('/users/sign_in')}>
            Back to Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default MFAVerificationForm;
