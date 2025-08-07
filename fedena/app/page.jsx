
import Image from 'next/image'
import Logo from '../public/ValtroLogo.png'
import Authform from '../components/Authform';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
export default async function Home() {
   const session = await getServerSession(authOptions);
   if(session){
     redirect('/Dashboard')
   } 
    return (
      <main>
      <div className='absolute top-0 left-8'>
      <Image src={Logo} alt='This is the logo of Valtro.Inc' className='w-12'/>
      </div>
      <div className='grid place-items-center h-screen'>
      <Authform/>
      </div>
      </main>
    )
   
}