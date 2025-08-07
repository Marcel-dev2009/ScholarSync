'use client'
import Image from "next/image"
import logo from '../public/ValtroLogo.png'
import ptnl from '../public/CdsseLogo.png'
import {FaFacebookF , FaGooglePlusG , FaLinkedinIn , FaRegEnvelope } from 'react-icons/fa'
import {MdLockOutline} from 'react-icons/md' 
import { signIn } from "next-auth/react"; 
import { useState } from "react" 
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
export default function Login() {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error ,   setError] = useState('');
 const router = useRouter()
 const handleSubmit = async (e) => {
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
       router.replace('/Dashboard');
     } catch (error) {
      console.log('Error Validating User' , error)
     }
   }
  return (
    <>
    <div className="grid place-items-center h-screen" >
    <form className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl  " onSubmit={handleSubmit}>
<div className="w-3/5 p-5">
  <div className="flex ">
  <Image src={logo} alt="This is Valtro.Inc Logo" loading="lazy" className="w-7"/>
  <Image src={ptnl} alt="This is Command's logo" loading="lazy" className="w-7 transform translate-y-1"/>
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
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="bg-gray-200 outline-0 flex-1 placeholder-gray-500"/>      
        </div>

        <div className="bg-gray-200 w-64 p-2 flex items-center gap-2 rounded-xs mb-3">
          <MdLockOutline className="w-5 text-gray-700"/>  
          <div className="border h-6 border-gray-400"></div>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" className="bg-gray-200 outline-0 flex-1 placeholder-gray-500"/>      
        </div>
         <div className="flex justify-between mb-4">
         <div className="flex w-64 mb-2 gap-2">
        <input type="checkbox" name="box" id="box" />
        <label className="flex items-center text-sm font-light text-black">Remember me</label>
        </div>  
        <div>
        {
          error ? (
            <div className="bg-red-600 text-white text-sm py-1">{error}</div>
          ) : (
            <button className="text-sm font-light text-black">Forgot Password?</button>
          )
        }
        </div>
        
         </div>
     <Suspense fallback={<div className="border-2 w-6 h-6 rounded-full animate-spin"></div>}>
     <Link href="Dashboard/">
       <button type="submit"
         className=" rounded-2xl border outline-0 text-black border-gray-500 hover:bg-green-500 hover:text-white px-4 py-2 w-30">Sign In</button>
       </Link>
     </Suspense>
     </div>
  </div>
</div> 

 <div className="w-2/5 p-5 bg-green-600 rounded-r-2xl py-36 px-12 text-white text-center">
 <Image src={ptnl} alt="CDSSE LOGO" className="absolute top-24 right-90"/>  <br />
 <h2 className="text-3xl font-bold mb-2 animate-bounce">Welcome BACK!</h2>
 <div className="border-2 w-10 rounded-2xl inline-block"></div>
 <p className="mb-10"> With the account you just created  <br /><br />
  <span > Fill up Person information real quick to continue enjoying  the features of this app</span></p>
 </div> 
      </form> 
    </div>
    </>
  )
}