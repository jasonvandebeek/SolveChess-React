'use client'

import { useEffect } from "react";

export default function GoogleCallback() {
    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.slice(1));
        const accessToken = params.get('access_token');
    
        if (window.opener) {
            window.opener.postMessage({ accessToken }, window.location.origin);
        }
    });
        
    return (
        <div>
            <p>Handling the OAuth callback...</p>
        </div>
    );
}