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


export { getPatienteByName, getSpecialty }