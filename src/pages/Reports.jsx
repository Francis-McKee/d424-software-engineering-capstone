import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

import ConsultationAppointment from "../models/ConsultationAppointment";

export default function Reports() {
    // state varaibles
    const [appointments, setAppointments] = useState([])

    const sampleAppointment = new ConsultationAppointment(
        "Initial Consultation",
        "Francis McKee",
        "2026-06-07",
        "9:00",
        "Scheduled"
    )

    console.log(sampleAppointment.getSummary());

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const querySnapshot = await getDocs(
            collection(db, "appointments")
        );

        const appointmentList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setAppointments(appointmentList);
    };

    const reportTimestamp = new Date().toLocaleString();

    const hasAppointments = appointments.length > 0;

    return (
        <div className="report-container">

            <h2 className="report-heading"> All Appointments Report </h2>

            <p> Generated: {reportTimestamp} </p>

            {!hasAppointments && (
                <p className="no-appointments"> No appointments have been created. </p>
            )}

            {hasAppointments && (

                <div className="report-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th> Title </th>
                                <th> Client </th>
                                <th> Date </th>
                                <th> Time </th>
                                <th> Status </th>
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
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}

            <br></br>
            <p> <Link to="/dashboard"> Return to Dashboard </Link> </p>
            <br></br>
        </div>
    )
}