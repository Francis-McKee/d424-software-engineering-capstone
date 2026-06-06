import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Dashboard() {
    
    const [appointments, setAppointments] = useState([]);

    const [title, setTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("Scheduled");
    const [notes, setNotes] = useState("");

    const fetchAppointments = async () => {
        const snapshot = await getDocs(collection(db, "appointments"));

        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setAppointments(data);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const createAppointment = async (e) => {
        e.preventDefault();

        if (!title || !clientName || !date || !time) {
            alert("Please fill out all required fields.");
            return;
        }

        await addDoc(collection(db, "appointments"), {
            title,
            clientName,
            date,
            time,
            status,
            notes,
            createdAt: new Date()
        });

        setTitle("");
        setClientName("");
        setDate("");
        setTime("");
        setNotes("");

        fetchAppointments();
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-heading"> Internal Appointment Scheduling System </h2>
            <p> Dashboard </p>

            <form onSubmit={createAppointment} className="appointment-form">

                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    placeholder="Client Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <button type="submit"> Create Appointment </button>
            </form>

            <h3> Appointments </h3>

            {appointments.map((a) => (
                <div key={a.id}>
                    <strong>{a.title}</strong><br />
                    {a.clientName}<br />
                    {a.date} {a.time}<br />
                    {a.status}
                </div>
            ))}
        </div>
    );
}