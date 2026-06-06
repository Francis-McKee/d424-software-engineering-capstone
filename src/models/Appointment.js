export default class Appointment {

    constructor( // encapsulation
        title,
        clientName,
        appointmentDate,
        appointmentTime,
        status,
        notes
    ) {
        this.title = title;
        this.clientName = clientName;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.notes = notes;
    }

    getSummary() {
        return `${this.title} - ${this.clientName}`;
    }
}