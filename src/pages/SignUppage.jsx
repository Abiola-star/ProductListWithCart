import React from 'react'
import { Link } from 'react-router';
import image from '../assets/images/image-brownie-desktop.jpg';
import { FcGoogle } from 'react-icons/fc';
import   { useState }  from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function SignUppage() {
  const navigate = useNavigate("")


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors,setErrors] = useState ({})
    const [submitError, setSubmitError] = useState("");
    const [loading,setloading] = useState (false)

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
        setErrors((prevError)=> ({...prevError, [e.target.name]: ""}))
    }
    const validateForm = ()=>{
      const newErrors ={}
      const {name, email,password,confirmPassword} = formData;
      if (!name.trim()) newErrors.name = "Name is required";
      if (!email.trim()) newErrors.email = "Email is required";
      if (!password.trim()) newErrors.password = "Password is required";
      if (!confirmPassword.trim()) {newErrors.confirmPassword ="Confirm Password is required"} else if (password !== confirmPassword) newErrors.confirmPassword = "Password do not match";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setSubmitError('');
  setloading(true)
  try {
    const response = await fetch(`https://plwc-auth-25bd.onrender.com/api/user/signup`, {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await response.json()

        if (response.ok) {
          toast.success("signup successful!!! sign in")
          navigate("/signin")
        }else{
          setSubmitError(data.message || "signUp failed")
        }
  } catch (error) {
    setSubmitError("something went wrong. Please try again", error)
  } finally{
    setloading(false)
  }
};
        
      
  return (
    <div className="flex flex-col lg:flex- row h-screen w-full">
      <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
        <Link to="/" className="mb-6">
        <span className="font-bold text-4xl">Desserts</span>
        </Link>

        {submitError && ( <p className="text-red-600 font-semibold mb-3">{submitError}</p>)}
          <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full">
            <h1 className="text-4xl font-extrabold">Sign Up</h1>
            <p className="text-lg font-bold">Create an account or {''}
              <span className="underline">
                <Link to="/signin">Sign in</Link>
              </span>
            </p>
            <div>
              <label htmlFor="name" className="block text-xl font-bold"> 
                Full Name</label>
              <input onChange={handleChange}
              name="name"
              value={formData.name}
              type="text"
              id="name"
              className="border border-gray-300 rounded-md h-10 px-3 w-full text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xl font-bold"> 
                Email Address</label>
              <input onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              id="email"
              className="border border-gray-300 rounded-md h-10 px-3 w-full text-lg"
              />
              {errors.email && (<p className="text-red-600 font-semibold mb-3">{errors.email}</p>)}
              </div>
              <div>
                <label htmlFor="password" className="block text-xl font-bold"> 
                Password</label>
              <input onChange={handleChange}
              name="password"
              value={formData.password}
              type="password"
              id="password"
              className="border border-gray-300 rounded-md h-10 px-3 w-full text-lg"
              />
              {errors.password && (<p className="text-red-600 font-semibold mb-3">{errors.password}</p>)}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-xl font-bold"> 
                 Confirm Password</label>
              <input onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              type="password"
              id="confirm-password"
              className="border border-gray-300 rounded-md h-10 px-3 w-full text-lg"
              />
              {errors.confirmPassword && (<p className="text-red-600 font-semibold mb-3">{errors.confirmPassword}</p>)}
              </div>
              <button className="bg-rose-300 text-white font-bold text-lg h-12 rounded-md w-full">
               {loading ? "signing up" : "sign up"} 
              </button>
              <button className="border border-gray-500 text-lg rounded-md w-full flex items-center
               justify-center py-2">
                <FcGoogle size={20} className="mr-2" />
                Sign up with Google 
               </button>
          </form>
      </div>
       
       <div className="hidden lg:block lg:w-1/2">
       <img
        src={image}
        alt="brownie-image"
        className="Object-cover w-full h-full"
        />
       </div>
      
    </div>
  );
}

