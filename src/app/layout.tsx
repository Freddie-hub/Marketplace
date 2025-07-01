import './globals.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { ReactNode } from 'react';
import { ApolloProvider } from './apollo-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <GoogleOAuthProvider clientId={googleClientId || 'make-sure-there-is-a-client-id-connected'}>
          <ApolloProvider>{children}</ApolloProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}