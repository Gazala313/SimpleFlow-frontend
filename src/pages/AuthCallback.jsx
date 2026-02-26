import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
    const { instance } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        // console.log("Auth hash:", hash);

        // Extract code from hash
        const params = new URLSearchParams(hash.replace("#", "?"));
        const code = params.get("code");

        if (code) {
            // console.log("Auth Code:", code);
            navigate("/dashboard");
            // Send code to backend to exchange for token
        }
    }, []);

    useEffect(() => {
        instance.handleRedirectPromise().then((response) => {
            if (response) {
                navigate("/");
            }
        });
    }, []);

    return <div>Processing login...</div>;
}

export default AuthCallback;
