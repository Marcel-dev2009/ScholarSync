'use client';
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Suspense } from 'react';
import styles from './form.module.css'
export default function Userinfo(){ 
   const {data : session} = useSession();
   return (
     <div className="grid place-items-center h-screen">
       <div className={`font-bold flex flex-col gap-2 my-6 px-6 py-2 ${styles.session} `}>
         <div>
          Name : <Suspense fallback={<h2>Loading...</h2>}> <span className="font-bold">{session?.user?.name}</span></Suspense>
         </div>
         <div>
           Email : <span className="font-bold">{session?.user?.email}</span>
         </div>
         <button onClick={() => signOut()} className='text-white py-2 px-6 bg-red-500 mt-3'> Log Out</button>
       </div>
     </div>     
   )       
}