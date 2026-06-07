import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

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

    const deleteAppointment = async (id) => {

        await deleteDoc(
            doc(db, "appointments", id)
        );

        fetchAppointments();
    }

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

            <table>
                <thead>
                    <tr>
                        <th> Title </th>
                        <th> Client </th>
                        <th> Date </th>
                        <th> Time </th>
                        <th> Status </th>
                        <th> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td> {appointment.title} </td>
                            <td> {appointment.clientName} </td>
                            <td> {appointment.date} </td>
                            <td> {appointment.time} </td>
                            <td> {appointment.status} </td>
                            <td>
                                <button onClick={() => deleteAppointment(appointment.id)}> Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}