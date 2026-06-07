import Appointment from "./Appointment";

// inheritance and polymorphism
export default class ConsultationAppointment extends Appointment {

    constructor(title, clientName, appointmentDate, appointmentTime, status, notes) {
        super(title, clientName, appointmentDate, appointmentTime, status, notes);
    }

    getSummary() {
        return `Consultation: ${this._title} for ${this._clientName}`;
    }
}