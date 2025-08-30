import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../utils/authentication';
import GoogleButton from '../components/GoogleButton';
import authImage from '../assets/authImage.jpg'
import hdImage from '../assets/hdImage.png'
interface SignupFormData {
    name: string;
    dateOfBirth: string;
    email: string;
}

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        dateOfBirth: '',
        email: '',
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { name, dateOfBirth, email } = formData;

            // Call the updated registerUser (OTP-based)
            const data = await registerUser(name, dateOfBirth, email);

            // Check if signup was successful
            if ('message' in data) {
                // Clear form
                setFormData({ name: '', dateOfBirth: '', email: '' });

                // Redirect to login
                navigate('/login');
            } else {
                setError('Registration failed. Unknown error.');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };



    const handleGoogleSignUp = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    };

    return (
        <>
            <div className="min-h-screen max-h-screen flex flex-col md:flex-row">
                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 max-h-screen flex flex-col justify-center items-center bg-white px-4 py-8 md:p-8 relative lg:gap-[200px]">
                    {/* Top left corner text/logo */}
                    <div className='h-8 w-full flex items-center justify-center md:justify-start mb-8 md:mb-0'>
                        <img src={hdImage} className='h-8 w-8' />
                        <span className='font-semibold text-2xl ml-2'>HD</span>
                    </div>

                    {/* Form content */}
                    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-md px-0 md:px-16">
                        <div>
                            <h2 className='w-full font-bold text-[2rem] md:text-[40px] text-center md:text-left'>Sign up</h2>
                            <p className='w-full font-normal text-base md:text-lg text-[#969696] text-center md:text-left'>Sign up to enjoy the feature of HD</p>
                        </div>

                        <div className="w-full">
                            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className='border border-[#D9D9D9] rounded-xl p-3 md:p-4 text-base'
                                />
                                <input
                                    name="dateOfBirth"
                                    type="text"
                                    placeholder="Date of Birth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    onFocus={(e) => (e.currentTarget.type = "date")}
                                    required
                                    className='border border-[#D9D9D9] rounded-xl p-3 md:p-4 text-base'
                                />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='border border-[#D9D9D9] rounded-xl p-3 md:p-4 text-base'
                                />

                                <button type="submit" disabled={isLoading} className='bg-[#367AFF] text-center text-white rounded-lg w-full pt-3 pb-3 md:pt-4 md:pb-4 text-base md:text-lg'>
                                    {isLoading ? 'Sending OTP...' : 'Get OTP'}
                                </button>
                            </form>
                            <GoogleButton text="Sign up with Google" clickHandler={handleGoogleSignUp} />
                        </div>
                        <div className='flex w-full justify-center text-center'>
                            <span className='text-base font-semibold text-[#6C6C6C]'>Already have an account? <Link to='/login' className='text-[#367AFF] underline'>Sign In</Link></span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block w-1/2 p-3">
                    <img src={authImage} alt="Signup Illustration" className="w-full h-full object-cover rounded-xl" />
                </div>
            </div>
        </>
    );
};

export default SignupPage;