import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    // create new user account
    const registerUser = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try { // redirect the user after successful registratio
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            const messages = {
                "auth/email-already-in-use":
                    "This email is already registered.",
                "auth/invalid-email":
                    "Invalid email address.",
                "auth/weak-password":
                    "Password should be at least 6 characters.",
            };

            setMessage(messages[error.code] || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2> Register </h2>

            <form onSubmit={registerUser} className="auth-form">
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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit"> Create Account </button>
            </form>

            <p className="auth-link"> Already have an account?{" "} <Link to="/"> Login here </Link> </p>
            <br></br>
            {message && <p className="message"> {message} </p>}
        </div>
    );
}