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

    getTitle() {
        return this._title;
    }

    getClientName() {
        return this._clientName;
    }

    getSummary() {
        return `${this._title} - ${this._clientName}`;
    }
}