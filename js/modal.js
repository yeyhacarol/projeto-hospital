'use strict'

const patientModal = document.getElementById('modal-container')
const doctorModal = document.getElementById('doctor-modal')
const specialtyModal = document.getElementById('specialty-modal')

const openModal = () => {
    (patientModal || doctorModal || specialtyModal).classList.add('active')
}

const closeModal = () => {
    (patientModal || doctorModal || specialtyModal).classList.remove('active')

    document.getElementById('patient-registration')?.reset()
}

document.getElementById('new-patience')?.addEventListener('click', openModal)  
document.getElementById('new-doctor')?.addEventListener('click', openModal)  
document.getElementById('add-specialty')?.addEventListener('click', openModal)
document.getElementById('new-specialty')?.addEventListener('click', openModal)


document.getElementById('close-modal')?.addEventListener('click', closeModal)
document.getElementById('close-doctor-modal')?.addEventListener('click', closeModal)
document.getElementById('close-specialty-modal')?.addEventListener('click', closeModal)

export { openModal,
         closeModal}
