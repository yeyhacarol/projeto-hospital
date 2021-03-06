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

    await fetch(url, options).then(() =>{
        toastr.success('Médico criado com sucesso!', 'Sucesso')
    })
}

const createSpecialty = async (specialty) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(specialty),
        'headers': {
            'content-type': 'application/json'
        }
    }

    await fetch('https://hospital-project-es3.herokuapp.com/specialty', options).then(() =>{
        toastr.success('Especialidade criada com sucesso!', 'Sucesso')
    })
}


const readDoctors = async () => {
    const response = await fetch(url)

    const data = response.json()

    return data
}

const readDoctor = async (id) => {
    const response = await fetch(`${url}/${id}`)

    const data = await response.json()

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

    await fetch (`${url}/${id}`, options).then(() =>{
        toastr.success('Medico atualizado com sucesso!', 'Sucesso')
    })
}

const getSpecialty = async () => {

    const response = await fetch(`https://hospital-project-es3.herokuapp.com/specialty`)

    const data = await response.json()

    return data
}



export { createDoctor,
         readDoctors,
         readDoctor,
         updateDoctor,
         getSpecialty,
         createSpecialty }