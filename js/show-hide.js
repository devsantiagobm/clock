import ui from "./ui.js";

export default function show_hide(){
    const button = document.querySelector('.data__button')

    button.addEventListener('click', e => {
        button.classList.toggle('data__button--active')

        if(button.classList.contains('data__button--active')){
            button.children[0].textContent = "less"
            ui.mostrarContenido()
        }
        else{
            button.children[0].textContent = "more"
            ui.ocultarContenido()
        }
    })
}