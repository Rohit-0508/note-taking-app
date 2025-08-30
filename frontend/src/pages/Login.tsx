import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleButton from '../components/GoogleButton';
import hdImage from '../assets/hdImage.png';
import authImage from '../assets/authImage.jpg';
import { Eye, EyeOff } from "lucide-react"; // 👈 added

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [showOtp, setShowOtp] = useState<boolean>(false); // 👈 added
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
      console.log("OTP verified:", otp);
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-in clicked");
  };

  return (
    <>
      <div className="min-h-screen max-h-screen flex">
        {/* Left Side - Form */}
        <div className="w-1/2 max-h-screen flex flex-col justify-center items-center bg-white p-8 relative lg:gap-[200px]">
          {/* Top left corner text/logo */}
          <div className='h-8 w-full flex items-center justify-start '>
            <img src={hdImage} className='h-8 w-8' />
            <span className='font-semibold text-2xl '>HD</span>
          </div>

          {/* Form content */}
          <div className="flex flex-col gap-8 w-full max-w-md pl-16 pr-16">
            <div>
              <h2 className='font-bold text-[40px]'>Sign In</h2>
              <p className='font-normal text-lg text-[#969696]'>Please login to continue to your account</p>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {/* Step-based form */}
            <div>
              {step === "email" ? (
                <form onSubmit={handleSendOtp} className='flex flex-col gap-5'>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border border-[#D9D9D9] rounded-xl p-4'
                  />

                  {/* OTP with eye toggle */}
                  <div className="relative">
                    <input
                      type={showOtp ? "text" : "password"}
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className='border border-[#D9D9D9] rounded-xl p-4 w-full pr-10'
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
                    <input type='checkbox' />
                    <label className='font-normal text-base'> Keep me logged in</label>
                  </div>
                  <button type="submit" disabled={isLoading} className='bg-[#367AFF] text-center text-white rounded-lg w-full pt-4 pb-4'>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className='flex flex-col gap-5'>
                  <input
                    type={showOtp ? "text" : "password"}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className='border border-[#D9D9D9] rounded-xl p-4'
                  />
                  <button type="submit" disabled={isLoading} className='bg-[#367AFF] text-center text-white rounded-lg w-full pt-4 pb-4'>
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
        <div className="w-1/2 p-3">
          <img src={authImage} alt="Login Illustration" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
