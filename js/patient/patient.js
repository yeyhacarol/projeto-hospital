'use strict'

const url = 'https://hospital-project-es3.herokuapp.com/patient'

const createPatient = async (patient) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(patient),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(url, options)
}

const readPatients = async () => {
    const response = await fetch(url)

    const data = await response.json()

    return data
}

const updatePatient = async (patient, id) => {
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(patient),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(`${url}/${id}`, options)
}


export { createPatient,
         readPatients,
         updatePatient }