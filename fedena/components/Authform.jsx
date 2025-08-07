'use client';
import Image from "next/image"
import { useState } from "react";
import logo from '../public/ValtroLogo.png'
import ptnr from '../public/CdsseLogo.png'
import {FaFacebookF , FaGooglePlusG , FaLinkedinIn , FaRegEnvelope } from 'react-icons/fa'
 import { IoPersonOutline } from "react-icons/io5";
import {MdLockOutline} from 'react-icons/md' 
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function Authform() {
  const [change , setChange] = useState('SignIn')
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('');
const router = useRouter();
const call = `If you don't have an account`
const info = `Click the button below to create an account..`
  const handleChange = () => {
     if(change === 'SignIn'){
       setChange('SignUp'); 
     } else if(change === 'SignUp'){
      setChange('SignIn')
     }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (e) => {
    e.preventDefault();
   if(!name || !email || !password){
    setError('All Credentials Required');
    return;
   }
   try { 
    const resExistsUser = await fetch('api/UserExists' , {
      method : 'POST',
      headers : {
        "Content-type" : "application.json",
      },
      body: JSON.stringify({email}),
     })
     const {user} = await resExistsUser.json();
     if(user){
      setError('User Already Exists');
      return;
     }
     const res = await fetch('api/register' , {
      method : 'POST', 
      headers: {
        "Content-type" : "application.json",
      },
      body: JSON.stringify({
        name ,
        email,
        password
      }),
     });
     if(res.ok){
      const form = e.target;
       form.reset();
      router.push('/Login');
     } else {
      console.log('User Registration failed')
     }
   } catch (error){
    console.error ('Error Registering User' , error)
   }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setError('All Credentials Required');
      return;
    } 
    try{
      const res = await signIn('credentials' , {
        email , password , redirect : false
      });
      if (res === undefined){
     
        return null;
      } else if(res.error){
        setError('Invalid Credentials');
        return;
      }
      router.replace('Dashboard')
    } catch (error) {
     console.log('Error Validating User' , error)
    }
  }
  return (
    <>
    {
     change === 'SignIn' ? (
     <>
    <form className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl" onSubmit={handleSignIn}>
<div className="w-3/5 p-5">
  <div className="flex ">
  <Image src={logo} alt="This is Valtro.Inc Logo" loading="lazy" className="w-7"/>
  <Image src={ptnr} alt="This is Command's logo" loading="lazy" className="w-7 transform translate-y-1"/>
  </div>
  <div  className="py-10">
     <h2 className="text-center text-3xl font-semibold text-green-500 mb-2">Sign In to Account </h2>  
     <div className="border-2 w-10 rounded-2xl border-green-500 flex ml-60 mt-6"></div>
     <div className=" w-2 h-2 rounded-[50%] bg-green-500 ml-[22.4rem] transform -translate-y-10 animate-bounce"></div>

     <div className="flex justify-center my-2">
      <button className="border-2 border-gray-200 rounded-full p-3 mx-1"><FaFacebookF className="text-sm text-black"/></button>
      <button className="border-2 border-gray-200 rounded-full p-3 mx-1"><FaGooglePlusG className="text-black"/></button>
      <button className="border-2 border-gray-200 rounded-full p-3 mx-1"><FaLinkedinIn className="text-black"/></button>
     </div>
     <p className="text-gray-400 text-center">or use your email account</p>
     <div className="flex flex-col items-center mt-6">
        <div className="bg-gray-200 w-64 p-2 flex items-center gap-2 rounded-xs mb-6">
          <FaRegEnvelope className="text-gray-400"/>  
          <div className="border h-6 border-gray-400"></div>
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="bg-gray-200 outline-0 flex-1 placeholder-gray-500" />      
        </div>

        <div className="bg-gray-200 w-64 p-2 flex items-center gap-2 rounded-xs mb-3">
          <MdLockOutline className="w-5 text-gray-700"/>  
          <div className="border h-6 border-gray-400"></div>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" className="bg-gray-200 outline-0 flex-1 placeholder-gray-500" />      
        </div>
         <div className="flex justify-between mb-4">
         <div className="flex w-64 mb-2 gap-2">
        <input type="checkbox" name="box" id="box" />
        <label className="flex items-center text-sm font-light text-black">Remember me</label>
        </div>  
        <div>
        {
         error ? (
          <div className=" rounded-md bg-red-600 px-6 py-1 text-white font-light text-sm">{error}</div>
         ) : (
          <button className="text-sm font-light text-black">Forgot Password?</button>
         ) 
        }
        </div>
       
         </div>
       <button type="submit"
         className=" rounded-2xl border outline-0 text-black border-gray-500 hover:bg-green-500 hover:text-white px-4 py-2 w-30">Sign In</button>
    
     </div>
  </div>
</div> 
 <div className="w-2/5 p-5 bg-green-600 rounded-r-2xl py-36 px-12 text-white text-center">
 <h2 className="text-3xl font-bold mb-2 animate-bounce">Welcome BACK!</h2>
 <div className="border-2 w-10 rounded-2xl inline-block"></div>
 <p className="mb-10">Fill up Person information real quick to continue enjoying  the features of this app</p> <br />
 <p>{call}</p>
 <p className="mb-6">{info}</p>
 <button className={`border-1 p-2 w-1/2 rounded-xl inline-block cursor-pointer hover:bg-white hover:text-green-600`}
 onClick={handleChange} >Sign up</button>
 </div> 
      </form> 
     </>
     ) : (
      <>
      <form className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl" onSubmit={handleRegister}>
   <div className="w-3/5 p-5">
     <div className="flex">
     <Image src={logo} alt="This is Valtro.Inc Logo" loading="lazy" className="w-7"/>
     <Image src={ptnr} alt="This is Command's logo" loading="lazy" className="w-7 transform translate-y-1"/>
     </div> 
     <div className="py-10">
        <h2 className="text-center text-3xl font-semibold text-green-500 mb-2">Sign Up to an Account</h2>  
        <div className="border-2 w-10 rounded-2xl border-green-500 flex ml-60 mt-6"></div>
        <div className=" w-2 h-2 rounded-[50%] bg-green-500 ml-[24rem] transform -translate-y-10 animate-bounce"></div>
    
        <div className="flex justify-center my-2">
         <button className="border-2 border-gray-200 rounded-full p-3 mx-1"><FaFacebookF className="text-sm text-black"/></button>
         <button className="border-2 border-gray-200 rounded-full p-3 mx-1"><FaGooglePlusG className="text-black"/></button>
         <button className="border-2 border-gray-200 rounded-full p-3 mx-1"><FaLinkedinIn  className="text-black"/></button>
        </div>
        <p className="text-gray-400 text-center">or use your google account or other socials</p>
        <div className="flex flex-col items-center mt-6">
          <div className="bg-gray-200 w-64 p-2 flex items-center gap-2 rounded-xs mb-6">
          <IoPersonOutline className="text-gray-400" />
          <div className="border h-6 border-gray-400 "></div>
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Full Name" className="bg-gray-200 outline-0 flex-1 placeholder-gray-400" />
          </div>
           <div className="bg-gray-200 w-64 p-2 flex items-center gap-2 rounded-xs mb-6">
             <FaRegEnvelope className="text-gray-400"/>  
             <div className="border h-6 border-gray-400"></div>
             <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="bg-gray-200 outline-0 flex-1 placeholder-gray-400"/>      
           </div>

           <div className="bg-gray-200 w-64 p-2 flex items-center gap-2 rounded-xs mb-3">
             <MdLockOutline className="w-5 text-gray-700"/>  
             <div className="border h-6 border-gray-400"></div>
             <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" className="bg-gray-200 outline-0 flex-1 placeholder-gray-400"/>      
           </div>
            <div className="flex justify-between mb-4">
            <div className="flex w-64 mb-2 gap-2">
           <input type="checkbox" name="box" id="box" />
           <label className="flex items-center text-sm font-light text-black">Remember me</label>
           </div> 
          {
            error && (
              <div className=" rounded-md bg-red-600 px-6 py-1 text-white font-light text-sm">{error}</div>
            )
          }
           </div>
         
            <button className=" rounded-xl border border-gray-500 hover:bg-green-500 hover:text-white px-4 py-2 w-30" type="submit"
        >SignUp</button>
            
           
        </div>
     </div>
   </div>
    <div className="w-2/5 p-5 bg-green-600 rounded-r-2xl py-36 px-12 text-white text-center ">
    <h2 className="text-3xl font-bold mb-2 mt-12 animate-bounce">Hello , Friend!</h2>
    <div className="border-2 w-10 rounded-2xl inline-block"></div>
    <p className="mb-10">Fill up Person information and go on to enjoy the amazing features of this app</p>
    <div>
    <button onClick={handleChange}  
    className={`border-1 p-2 w-1/2 rounded-xl inline-block cursor-pointer hover:bg-white hover:text-green-600`}>Sign In</button>
    </div>
    </div>
      </form>
      </>
     )
    }
    </>
  )
}