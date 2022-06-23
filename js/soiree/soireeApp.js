import { getPatienteByName, getSpecialty, getDoctorBySpecialty, createAppointment } from "./soiree.js"

const createRowPatient = (patient) => {
    const row = document.createElement('div')
    row.classList.add('column-patient')
    row.dataset.id = patient.id
    row.innerHTML =
        `<span>${patient.firstName}</span>
         <span>${patient.lastName}</span> -
         <span>${patient.cpf}</span>
        `

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


const createOption = (specialty) => {
    const option = document.createElement('option')
    option.setAttribute("id", specialty.id);
    option.setAttribute("data-cost", specialty.cost);
    option.innerHTML = specialty.name

    return option
}

const updateOption = async () => {
    const tableContainer = document.getElementById('specialty')

    const specialties = await getSpecialty()
    specialties.unshift(
        {
            id: 0,
            name:"Selecione uma especialidade",
            cost: 0
        }
    );
    const options = specialties.map(createOption)
    tableContainer.replaceChildren(...options)
}

const updateTablePatient = async () => {
    const tableContainer = document.getElementById('data-list')

    const patients = await getPatienteByName(document.getElementById('patient-name').value)

    const rows = patients.map(createRowPatient)
    tableContainer.replaceChildren(...rows)

    return patients
}

const updateTableDoctor = async (id) => {

    if(!Number(id))
        return

    const tableContainer = document.getElementById('data-list-doctor')

    const doctors = await getDoctorBySpecialty(id)

    const rows = doctors.map(createRowDoctor)
    tableContainer.replaceChildren(...rows)

    return doctors
}


const selectPatientByName = async () => {
    if (document.getElementById('patient-name').value.length > 2) {
        const patients = await updateTablePatient()

        const columnsPatient = document.querySelectorAll('.column-patient');

        for (const column of columnsPatient) {
            column.addEventListener('click', (event) => {
                let patient = patients.filter(item => {
                    return item.id == (event.target.parentElement.dataset.id || event.target.dataset.id)
                })[0]
                document.getElementById('patient-name').dataset.id = patient.id
                document.getElementById('patient-name').value = capitalize(patient.firstName) + ' ' + capitalize(patient.lastName)
                document.getElementById('patient-cpf').value = patient.cpf
                document.getElementById('patient-birth-date').value = patient.birthDate
                   
                document.getElementById('data-list').innerHTML = ''
            });
        }
    }
}



const selectSpecialty = async (event) => {

    document.getElementById('specialty-cost').value = 'R$' + Number(event.target[event.target.selectedIndex].dataset.cost).toFixed(2)
    const doctors = await updateTableDoctor(event.target[event.target.selectedIndex].id)

    const columnsDoctor = document.querySelectorAll('.column-doctor');
    
    for (const column of columnsDoctor) {
        column.addEventListener('click', (event) => {

            let doctor = doctors.filter(item => {
                return item.id == (event.target.parentElement.dataset.id || event.target.dataset.id)
            })[0]
            document.getElementById('doctor-name').dataset.id = doctor.id
            document.getElementById('doctor-name').value = capitalize(doctor.firstName) + ' ' + capitalize(doctor.lastName)
            document.getElementById('data-list-doctor').innerHTML = ''
        });
    }
}

function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

const saveAppoinment = async () => {
    const appointment = {
        "patient":  document.getElementById('patient-name').dataset.id,
        "doctor": document.getElementById('doctor-name').dataset.id ,
        "description": document.getElementById('appointment-description').value,
        "date": document.getElementById('appointment-date').value
    }

    if(!appointment.patient){
        toastr.error('Por favor, selecione um paciente!', 'Erro')
        return
    }
    if(!appointment.doctor){
        toastr.error('Por favor, selecione um medico!', 'Erro')
        return
    }
    if(!appointment.date){
        toastr.error('Por favor, selecione uma data para a consulta!', 'Erro')
        return
    }
    if(!appointment.description){
        toastr.error('Por favor, Escreva uma observação!', 'Erro')
        return
    }
    
    await createAppointment(appointment)
}

updateOption()
document.getElementById('patient-name').addEventListener('keypress', selectPatientByName)
document.getElementById('specialty').addEventListener("change", selectSpecialty);
document.getElementById('save').addEventListener('click', saveAppoinment)


