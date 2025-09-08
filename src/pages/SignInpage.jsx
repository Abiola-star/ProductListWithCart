import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import image from '../assets/images/image-brownie-desktop.jpg';
import {toast} from "react-toastify"

const initialFormState = {
  email: '',
  password: '',
};

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitError('');
    console.log('Sign In Data:', formData);
    setIsLoading(true)
     try {
      const response = await fetch(`http://localhost:5000/api/user/signin`, {
              method: "POST",
              headers: { "Content-Type" : "application/json"},
              body: JSON.stringify(formData),
          });
          const data = await response.json()
  
          if (response.ok) {
            toast.success("signup successful!!! sign in")
            navigate("/")
          }else{
            setSubmitError(data.message || "signUp failed")
          }
    } catch (error) {
      setSubmitError("something went wrong. Please try again", error)
    } finally{
      setIsLoading(false)
    }
  };
 

  const renderInput = (label, name, type = 'text') => (
    <div>
      <label htmlFor={name} className="block text-xl font-bold">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        className="border border-gray-300 rounded-md h-10 px-3 w-full text-lg"
      />
      {errors[name] && <p className="text-red-600 font-semibold mb-3">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
        <Link to="/" className="mb-6">
          <span className="font-bold text-4xl">Desserts</span>
        </Link>

        {submitError && <p className="text-red-600 font-semibold mb-3">{submitError}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full">
          <h1 className="text-4xl font-extrabold">Sign In</h1>
          <p className="text-lg font-bold">
            Welcome back! Don’t have an account?
            <span className="underline">
              <Link to="/signup">Sign up</Link>
            </span>
          </p>

          {renderInput('Email Address', 'email', 'email')}
          {renderInput('Password', 'password', 'password')}

          <div className="flex lg:flex-row justify-between items-start lg:items-center gap-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-md lg:text-lg font-bold">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-lg text-rose-800 underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-rose-300 text-white font-bold text-lg h-12 rounded-md w-full"
          >
           {isLoading ? "signing in" : "sign in"}
          </button>

          <button
            type="button"
            className="border border-gray-500 text-lg rounded-md w-full flex items-center justify-center py-2"
          >
            <FcGoogle size={20} className="mr-2" /> Sign in with Google
          </button>
        </form>
      </div>

      <div className="hidden lg:block lg:w-1/2">
        <img src={image} alt="brownie-image" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}