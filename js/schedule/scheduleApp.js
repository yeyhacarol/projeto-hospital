import { getDoctorByName, getAppointmentsByDoctor, getAppointment, updateAppointment } from "./schedule.js"
import { openModal, closeModal } from "../modal.js"
import { capitalize } from "../utils/capitalize.js"

const createRow = (appointment) => {
    const row = document.createElement('div')
    row.classList.add('row')

    let options = {
        timeZone: 'America/Sao_Paulo'
    }

    row.innerHTML =
        `<span>${appointment.patient.firstName}</span>
         <span>${appointment.patient.cpf}</span>
         <span>${new Date(appointment.date).toLocaleString('pt-BR', options) }</span>
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

                getAppointments(doctor.id, document.getElementById('appoitment-date').value, document.getElementById('appointment-active').checked)
            });
        }
    }
}

const getAppointments = async (id, date, active = true) => {
    const appointments = await getAppointmentsByDoctor(id, (date || '1900-01-01') , active)

    const tableContainer = document.getElementById('values')

    const rows = appointments.map(createRow)
    tableContainer.replaceChildren(...rows)

}

const editAppointment = async (event) => {
    if (event.target.tagName === 'IMG') {

        const [action, id] = event.target.id.split('-')

        if (action == 'edit') {
            openModal(document.getElementById('appointment-modal'))

            let appointment = await getAppointment(id)

            document.getElementById('appointment-modal').dataset.id = appointment.id

            document.getElementById('patient-name').value = capitalize(appointment.patient.firstName) + ' ' + capitalize(appointment.patient.lastName)
            document.getElementById('patient-cpf').value = appointment.patient.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            document.getElementById('appointment-description').value = appointment.description

            if(appointment.doctorDescription){
                document.getElementById("doctor-description").value = appointment.doctorDescription
                document.getElementById("doctor-description").disabled = true;
            }

        }
    }

}

const saveAppointment = async () => {
    if(!document.getElementById("doctor-description").disabled){
        const appointment = {
            "description": document.getElementById('doctor-description').value
        }
    
        const form = document.getElementById('appointment-modal')
    
        if (form.dataset.id)
            await updateAppointment(appointment, form.dataset.id)
       
    
    }else{
        toastr.error('Consulta finalizada anteriormente!', 'Erro')
    }
    
    closeModal(document.getElementById('appointment-modal'))
    updateTableDoctor()

}

toastr.error('Consulta finalizada anteriormente!', 'Erro')
document.getElementById('appointment-active').checked = true
document.getElementById('save').addEventListener('click', saveAppointment)
document.getElementById('doctor-name').addEventListener('keypress', selectDoctorByName)
document.getElementById('appoitment-date').value = new Date().toISOString().substring(0,10);
document.getElementById('values').addEventListener('click', editAppointment)