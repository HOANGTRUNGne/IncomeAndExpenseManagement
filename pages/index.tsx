import { signIn, signOut, useSession } from 'next-auth/react';
import { MainLayout } from '~/components/layout';
import { getToken } from 'next-auth/jwt';

export default function Home() {
    const session = useSession();
    console.log('🏆 ~ Home ~ session:', session);

    return (
        <div>
            <button onClick={() => signIn()}>Sign in</button>
            <button onClick={() => signOut()}>Sign out</button>
            <h1 className="mt-5">Hello Next.js + Keycloak 👋</h1>
            <div className="lead text-muted mb-5">This is an example of a Next.js site using Keycloak.</div>

            {/* <p>You are: {loggedinState}</p>
            <p>{welcomeMessage}</p> */}
        </div>
    );
}

Home.Layout = MainLayout;
