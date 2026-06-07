import Appointment from "./Appointment";

// inheritance and polymorphism
export default class ConsultationAppointment extends Appointment {

    constructor(title, clientName, date, time, status) {
        super(title, clientName, date, time, status);
    }

    getSummary() {
        return `Consultation: ${this._title} for ${this._clientName}`;
    }
}