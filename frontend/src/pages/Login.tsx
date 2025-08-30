import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleButton from '../components/GoogleButton';
import hdImage from '../assets/hdImage.png';
import authImage from '../assets/authImage.jpg';
import { Eye, EyeOff } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setStep("otp");
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      // Simulate successful login
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <>
      <div className="min-h-screen max-h-screen flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 max-h-screen flex flex-col justify-center items-center bg-white px-4 py-8 md:p-8 relative lg:gap-[200px]">
          {/* Top left corner text/logo */}
          <div className='h-8 w-full flex items-center justify-center md:justify-start pt-8 mb-8 md:mb-0'>
            <img src={hdImage} className='h-8 w-8' />
            <span className='font-semibold text-2xl ml-2'>HD</span>
          </div>

          {/* Form content */}
          <div className="flex flex-col gap-8 w-full max-w-md px-0 md:px-16">
            <div>
              <h2 className='w-full font-bold text-[2rem] md:text-[40px] text-center md:text-left'>Sign In</h2>
              <p className='w-full font-normal text-base md:text-lg text-[#969696] text-center md:text-left'>Please login to continue to your account</p>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {/* Step-based form */}
            <div>
              {step === "email" ? (
                <form onSubmit={handleSendOtp} className='flex flex-col gap-5 w-full'>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border border-[#D9D9D9] rounded-xl p-3 md:p-4 text-base'
                  />

                  {/* OTP with eye toggle */}
                  <div className="relative">
                    <input
                      type={showOtp ? "text" : "password"}
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className='border border-[#D9D9D9] rounded-xl p-3 md:p-4 w-full pr-10 text-base'
                    />
                    <button
                      type="button"
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <span className='text-[#367AFF] underline text-base font-normal cursor-pointer'>
                    Resend OTP
                  </span>
                  <div>
                    <input type='checkbox' id="keep-logged-in" />
                    <label htmlFor="keep-logged-in" className='font-normal text-base ml-2'> Keep me logged in</label>
                  </div>
                  <button type="submit" disabled={isLoading} className='bg-[#367AFF] text-center text-white rounded-lg w-full pt-3 pb-3 md:pt-4 md:pb-4 text-base md:text-lg'>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className='flex flex-col gap-5 w-full'>
                  <input
                    type={showOtp ? "text" : "password"}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className='border border-[#D9D9D9] rounded-xl p-3 md:p-4 text-base'
                  />
                  <button type="submit" disabled={isLoading} className='bg-[#367AFF] text-center text-white rounded-lg w-full pt-3 pb-3 md:pt-4 md:pb-4 text-base md:text-lg'>
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>
              )}
              <GoogleButton text="Sign in with Google" clickHandler={handleGoogleSignIn} />
            </div>

            <div className='flex w-full justify-center text-center'>
              <span className='text-base font-semibold text-[#6C6C6C]'>
                Need an account? <Link to='/signup' className='text-[#367AFF] underline'>Create One</Link>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2 p-3">
          <img src={authImage} alt="Login Illustration" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;