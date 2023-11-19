"use client"

import { googleLogin } from "@/app/utils/api";

const clientId = '622451295217-09du3qqhs779e5kuv3j758eqhjr8h1bh.apps.googleusercontent.com';
const redirectUri = 'https://localhost:3000/auth/google-response';
const scope = 'email';

const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;

export default function GoogleOauthButton() {
    const startGoogleAuthentication = async () => {
        try {
            const newWindow = window.open(authUrl, 'Google Login', 'width=480,height=640');

            window.addEventListener('message', async (event) => {
                if (event.origin !== window.location.origin || event.source !== newWindow)
                    return;

                const accessToken = event.data.accessToken;
                await googleLogin(accessToken).then(() => {
                    window.location.href = '/';
                });
            });
        } catch (error) {
            //Handle error (display an error message)
        } 
    }

    return (
        <div className="flex flex-row grow gap-[0.5rem] p-[0.5rem] shadow-small rounded-[2px] justify-center select-none cursor-pointer hover:shadow-normal hover:scale-[1.05] transition duration-[0.2s]" onClick={startGoogleAuthentication}>
            <img src="/images/oauth-logo/Google_Logo.svg" className="w-[1.5rem] aspect-[1/1]"/>
            <span className="font-normal">Google</span>
        </div>
    )
}