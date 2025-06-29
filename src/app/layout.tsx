import './globals.css';
import { ReactNode } from 'react';
import { ApolloProvider } from './apollo-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={googleClientId ||  'make-sure-there-is-a-client-id-connected'}>
        <ApolloProvider>{children}</ApolloProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}