import { MainLayout } from '~/components/layout';

export default function ProfilePage() {
    // const profile = keycloak?.authenticated ? (
    //     <ul>
    //         <li>
    //             <span className="font-weight-bold mr-1">Email:</span>
    //             <span className="text-muted">{parsedToken?.email ?? ''}</span>
    //         </li>
    //         <li>
    //             <span className="font-weight-bold mr-1">Username:</span>
    //             <span className="text-muted">{parsedToken?.preferred_username ?? ''}</span>
    //         </li>
    //         <li>
    //             <span className="font-weight-bold mr-1">First Name:</span>
    //             <span className="text-muted">{parsedToken?.given_name ?? ''}</span>
    //         </li>
    //         <li>
    //             <span className="font-weight-bold mr-1">Last Name:</span>
    //             <span className="text-muted">{parsedToken?.family_name ?? ''}</span>
    //         </li>
    //     </ul>
    // ) : (
    //     <span>Please login to view profile.</span>
    // );

    return (
        <div>
            <h1 className="my-5">User Profile</h1>
            {/* {profile} */}
        </div>
    );
}

ProfilePage.Layout = MainLayout;
