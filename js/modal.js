'use strict'

const patientModal = document.getElementById('modal-container')
const doctorModal = document.getElementById('doctor-modal')
const specialtyModal = document.getElementById('specialty-modal')

const openModal = (modal) => {
    (modal || patientModal || doctorModal || specialtyModal).classList.add('active')
}

const closeModal = (modal) => {
    (modal || patientModal || doctorModal || specialtyModal).classList.remove('active')

    document.getElementById('patient-registration')?.reset()
    document.getElementById('doctor-registration')?.reset()
    document.getElementById('specialty-registration')?.reset()
}

document.getElementById('new-patience')?.addEventListener('click', () => { openModal(patientModal) })  
document.getElementById('new-doctor')?.addEventListener('click', () => { openModal(doctorModal) })  
document.getElementById('add-specialty')?.addEventListener('click', () => { openModal(specialtyModal) })
document.getElementById('new-specialty')?.addEventListener('click', () => { openModal(specialtyModal) })


document.getElementById('close-modal')?.addEventListener('click', () => { closeModal(patientModal) })
document.getElementById('close-doctor-modal')?.addEventListener('click', () => { closeModal(doctorModal) })
document.getElementById('close-specialty-modal')?.addEventListener('click',() => {  closeModal(specialtyModal)})

export { openModal,
         closeModal}
