import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const loginUser = async (event) => {
        event.preventDefault();

        try { // send authenticated users to the Dashboard page
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            // display an error message to user
            switch (error.code) {
                case "auth/user-not-found":
                    setMessage("No user found with this email address.");
                    break;
                case "auth/wrong-password":
                    setMessage("Invalid password. Please try again.");
                    break;
                case "auth/too-many-requests":
                    setMessage("Too many login attempts. Please try again later.");
                    break;
                case "auth/invalid-email":
                    setMessage("The email address is not valid.");
                    break;
                case "auth/invalid-credential":
                    setMessage("Invalid credentials. Please try logging in again.");
                    break;
                default:
                    setMessage("An unexpected error occurred. Please try again.");
            }
        }
    };
    // send password reset email to user
    const resetPassword = async () => {
        if (!email) {
            setMessage("Enter your email first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent.");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2> Login </h2>

            <form onSubmit={loginUser} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

                <button onClick={resetPassword}> Forgot Password </button>

                <p className="auth-link"> Don't have an account?{" "}<Link to="register"> Create one here </Link> </p>

                {message && <p>{message}</p>}
        </div>
    );
}