'use strict'

const url = 'https://hospital-project-es3.herokuapp.com/doctor'

const createDoctor = async (doctor) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(doctor),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch(url, options)
}

const readDoctors = async () => {
    const response = await fetch(url)

    const data = response.json()

    return data
}

const updateDoctor = async (doctor, id) => {
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(doctor),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch (`${url}/${id}`, options)
}

export { createDoctor,
         readDoctors,
         updateDoctor }