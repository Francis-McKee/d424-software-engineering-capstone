import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Dashboard() {
    // state variables
    const [appointments, setAppointments] = useState([]);

    const [title, setTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("Scheduled");
    const [notes, setNotes] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

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

        // clean user input to prevent SQL injection
        const cleanedTitle = title.trim();
        const cleanedClientName = clientName.trim();
        const cleanedNotes = notes.trim();

        if (!cleanedTitle || !cleanedClientName || !date || !time) {
            alert("Please fill out all required fields.");
            return;
        }
        
        if (editingId) {

            await updateDoc(
                doc(db, "appointments", editingId),
                {
                    title: cleanedTitle,
                    clientName: cleanedClientName,
                    date,
                    time,
                    status,
                    notes: cleanedNotes
                }
            );

            setEditingId(null);

        } else {

            await addDoc(collection(db, "appointments"), {
                title: cleanedTitle,
                clientName: cleanedClientName,
                date,
                time,
                status,
                notes: cleanedNotes,
                createdAt: new Date()
            });
        }

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

    const editAppointment = (appointment) => {
        setEditingId(appointment.id);

        setTitle(appointment.title);
        setClientName(appointment.clientName);
        setDate(appointment.date);
        setTime(appointment.time);
        setStatus(appointment.status);
        setNotes(appointment.notes || ""); // or "" if no notes
    }

    const getAppointmentStatus = (appointment) => {

        const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
        );

        const currentDateTime = new Date();

        if (appointment.status === "Scheduled" && appointmentDateTime < currentDateTime) {
            return "Completed";
        }

        return appointment.status;
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

                <button type="submit">
                    {editingId ? "Save Changes" : "Create Appointment"} {/* ternary, means if editingId === null then the if statement is false and it says Create Appointment */}
                </button>
            </form>

            <h3> Appointments </h3>
            
            <input className="appointment-search"
                type="text"
                placeholder="Search appointments by Title or Client"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br></br>

            <table className="appointment-table">
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
                    {appointments
                        .filter((appointment) => // search functionality that can filter by client name or title
                            appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((appointment) => (
                            <tr key={appointment.id}>
                                <td> {appointment.title} </td>
                                <td> {appointment.clientName} </td>
                                <td> {appointment.date} </td>
                                <td> {appointment.time} </td>
                                <td> {getAppointmentStatus(appointment)} </td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => editAppointment(appointment)}> Edit </button>
                                        <button onClick={() => deleteAppointment(appointment.id)}> Delete </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            
            <br></br>
            <Link to="/reports"> View Reports </Link>
            <br></br>
        </div>

    );
}