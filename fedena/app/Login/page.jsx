import Login from "../../components/Login"
 import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if(session){
    redirect('/Dashboard');
  }
     return (
    <main>
       <Login/>   
    </main>  
  )
  
 
}