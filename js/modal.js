'use strict'

const modal = document.getElementById('modal-container')
const doctorModal = document.getElementById('doctor-modal')
const specialtyModal = document.getElementById('specialty-modal')

const openModal = () => {
    modal.classList.add('active')
}

const closeModal = () => {
    modal.classList.remove('active')

    document.getElementById('patient-registration').reset()
}

document.getElementById('plus').addEventListener('click', openModal)  

export { openModal,
         closeModal}
