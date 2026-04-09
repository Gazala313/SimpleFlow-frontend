import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Divider } from "antd";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { setAdminData } from "../features/adminSlice";


const Login = () => {
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlegetUserDetails = async (data) => {
        await api.get(`/users/user/${data}/`).then((response) => {
            dispatch(setAdminData(response.data));
            navigate("/dashboard");
        }).catch((error) => {
            console.error("Failed to fetch user details:", error);
        })
    };

    // useEffect(() => {
    //     // accounts.length > 0 && navigate("/dashboard");
    //     handlegetUserDetails(accounts[0]?.username);

    // }, [accounts, dispatch]);

    const handleLogin = async () => {
        handlegetUserDetails("gazala.parveen@tigeranalytics.com");
        // const loginRequest = {
        //     scopes: ["api://801114f2-4838-473c-998f-6aac9a09255a/access_as_user"]
        // };
        // try {
        //    await instance.loginRedirect(loginRequest);
        // } catch (error) {
        //     console.error('Login failed:', error);
        // }
    }

    useEffect(() => {
    const getToken = async () => {
        const accounts = instance.getAllAccounts();

        if (accounts.length > 0) {
            const response = await instance.acquireTokenSilent({
                scopes: ["api://801114f2-4838-473c-998f-6aac9a09255a/access_as_user"],
                account: accounts[0],
            });

            const token = response.accessToken;

            console.log("Access Token:", token);

            localStorage.setItem("token", token);
        }
    };

    getToken();
}, []);

    return (
        <div className="login-container">
            <div className="left-panel">
                <div className="left-logo">
                </div>
                <div className="left-content">

                    <h2 className="title">Welcome to<br />Task Tracker</h2>
                </div>
            </div>

            <div className="right-panel">
                <div className="login-box">
                    <h3 className="sso-title">Single Sign On</h3>
                    <p className="sso-subtext">Sign in with your identity provider</p>

                    <button className="sso-btn" onClick={handleLogin}>Continue with SSO <span>
                        {/* <img
                            src={Arrow}
                            alt="login"
                            style={{ cursor: "pointer" }} /> */}
                    </span></button>

                    <div className="footer-links">
                        <a href="#">Terms of Use</a>
                        <Divider className="nav-divider" orientation="vertical" />
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
