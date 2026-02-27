import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Divider } from "antd";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Login = () => {
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        accounts.length > 0 && navigate("/dashboard");
    }, [accounts])

    const handleLogin = async () => {
        try {
            await instance.loginRedirect({
                scopes: ['User.Read'],
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <div className="login-container">
            <div className="left-panel">
                <div className="left-logo">
                    {/* <img
                        className="dfi-logo"
                        src={DFILogo}
                        alt="DFI"
                        style={{ cursor: "pointer" }}
                    /> */}
                </div>
                <div className="left-content">

                    <h2 className="title">Welcome to<br />Task Tracker</h2>

                    {/* <p className="desc">
                        Your intelligent data companion —<br />
                        ask, analyze, and visualize insights<br />
                        from DFI’s data with ease.
                    </p> */}
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
