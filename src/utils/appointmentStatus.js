export const getAppointmentStatus = (appointment) => {

    const appointmentDateTime = new Date(
        `${appointment.date}T${appointment.time}`
    );

    const currentDateTime = new Date();

    if (appointment.status === "Scheduled" && appointmentDateTime < currentDateTime) {
        return "Completed";
    }

    return appointment.status; 
};