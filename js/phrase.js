import requests from "./requests.js"

export default function phrase(){
    const button = document.querySelector('.phrase__picture')

    button.addEventListener('click', () => requests.generarFrase())
}