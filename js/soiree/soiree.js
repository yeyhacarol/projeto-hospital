'use strict'

const getPatienteByName = async (name) => {

    const response = await fetch(`https://hospital-project-es3.herokuapp.com/patient/attribute/${name}`)

    const data = await response.json()

    return data
}
const getSpecialty = async () => {

    const response = await fetch(`https://hospital-project-es3.herokuapp.com/specialty`)

    const data = await response.json()

    return data
}

const getDoctorBySpecialty = async (id) => {

    const response = await fetch(`https://hospital-project-es3.herokuapp.com/doctor/specialty/${id}`)

    const data = await response.json()

    return data
}

const createAppointment = async (patient) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(patient),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(`https://hospital-project-es3.herokuapp.com/appointment`, options).then(() =>{
        toastr.success('Agendameto feito com sucesso!', 'Sucesso')
        document.getElementById('scheduling-form').reset()
    })
}




export { getPatienteByName, getSpecialty, getDoctorBySpecialty, createAppointment }