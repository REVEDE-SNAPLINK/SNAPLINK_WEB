import { useEffect } from "react";

/**
 * Legacy redirect: /auth/kakao now maps to Login (general login page).
 * This component is kept as a redirect shim for backward compatibility.
 */
export default function KakaoLogin() {
    useEffect(() => {
        window.location.replace("/auth/login");
    }, []);

    return null;
}
