'use strict'


const getDoctorByName = async (name) => {

    const response = await fetch(`https://hospital-project-es3.herokuapp.com/doctor/name/${name}`)

    const data = await response.json()

    return data
}

const getAppointmentsByDoctor = async (id, date, active) => {

    const response = await fetch(`https://hospital-project-es3.herokuapp.com/appointment/doctor/${id}/${date}/${active}`)

    const data = await response.json()

    return data
}


export { getDoctorByName, getAppointmentsByDoctor }