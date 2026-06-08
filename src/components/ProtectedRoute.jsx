// protect pages that require user authentication
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { // check whther a user is currently logged in
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate("/");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    // redirect unauthenticated users to the Login page
    const handleLogout = async () => {

        const confirmed = window.confirm( // confirms logout request
            "Are you sure you want to log out?"
        );

        if (!confirmed) {
            return;
        }

        await signOut(auth);
        navigate("/");
    };

    if (loading) return <p> Loading... </p>;

    return (
        <div>
            <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                Logged in as: {user?.email}
                <button onClick={handleLogout} style={{ marginLeft: "10px" }}> Logout </button>
            </div>

            {children}
        </div>
    );
}