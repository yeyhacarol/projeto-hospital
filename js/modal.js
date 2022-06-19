'use strict'

const modal = document.getElementById('modal-container')

const openModal = () => {
    modal.classList.add('active')
}

const closeModal = () => {
    modal.classList.remove('active')
}

document.getElementById('close-modal').addEventListener('click', closeModal)  

export { openModal,
         closeModal}
