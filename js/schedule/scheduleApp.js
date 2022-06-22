import { getDoctorByName, getAppointmentsByDoctor } from "./schedule.js"
import { formatDate } from "../utils/formatDate.js"

const createRow = (appointment) => {
    const row = document.createElement('div')
    row.classList.add('row')
    row.innerHTML =
        `<span>${appointment.patient.firstName}</span>
         <span>${appointment.patient.cpf}</span>
         <span>${new Date(appointment.date).toLocaleString()}</span>
         <span>
             <img src="img/edit.png" alt="Editar paciente" id="edit-${appointment.id}">
         </span>`

    return row
}

const createRowDoctor = (doctor) => {
    const row = document.createElement('div')
    row.classList.add('column-doctor')
    row.dataset.id = doctor.id
    row.innerHTML =
        `<span>${doctor.firstName}</span>
         <span>${doctor.lastName}</span>
        `

    return row
}

const updateTableDoctor = async (name) => {

    const tableContainer = document.getElementById('data-list-doctor')

    const doctors = await getDoctorByName(name)

    const rows = doctors.map(createRowDoctor)

    tableContainer.replaceChildren(...rows)

    return doctors
}


const selectDoctorByName = async () => {

    let doctorName = document.getElementById('doctor-name').value

    if (doctorName.length > 2) {
        const doctors = await updateTableDoctor(doctorName)

        const columnsPatient = document.querySelectorAll('.column-doctor');

        for (const column of columnsPatient) {
            column.addEventListener('click', (event) => {
                let doctor = doctors.filter(item => {
                    return item.id == (event.target.parentElement.dataset.id || event.target.dataset.id)
                })[0]
                document.getElementById('doctor-name').dataset.id = doctor.id

                getAppointments(doctor.id, document.getElementById('appoitment-date').value)
            });
        }
    }
}


const getAppointments = async (id, date, active = true) => {
    const appointments = await getAppointmentsByDoctor(id, (date || '1900-01-01') , active)

    const tableContainer = document.getElementById('values')

    const rows = appointments.map(createRow)
    tableContainer.replaceChildren(...rows)
    console.log(appointments)
}

document.getElementById('doctor-name').addEventListener('keypress', selectDoctorByName)