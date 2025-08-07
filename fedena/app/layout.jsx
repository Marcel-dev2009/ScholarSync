
import { Provider } from "./provider";
import "./globals.css";
export const metadata = {
  title:{
   default: 'Skolo-Management System' ,
   template: '%s | Skolo'
  },
  description: `A Full Stack School Management System To automate the administrative tasks of school
  Built In partnership with Command Day Seconadary School
  `
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
    
     <body>
       <Provider>
       {children}
     </Provider>
      </body>
    
    </html>
  );
}
