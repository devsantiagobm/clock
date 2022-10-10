import ui from "./ui.js";

class Requests{
    generarIP(){
        const url = "https://api.ipify.org"
        fetch(url)
            .then(res => res.text())
            .then(data => this.generarInformacion(data))
            .catch(error => ui.fetchCatch(error))
    }

    generarInformacion(ip){
        const url = `https://worldtimeapi.org/api/ip/${ip}.json`
        fetch(url)
            .then(res => res.json())
            .then(data => crearInformacion(data))
            .catch(error => ui.fetchCatch(error))
    }

    generarFrase(){
        const url = "https://programming-quotes-api.herokuapp.com/quotes/random"

        fetch(url)
            .then(res => res.json())
            .then(data => ui.generarFrase(data))
            .catch(error => ui.fetchCatch(error))
        }

}



const requests = new Requests()
export default requests;

async function crearInformacion(data){
    const fecha = new Date()
    const hora = fecha.getHours() 
    let minutos = fecha.getMinutes() 

    minutos < 10 ? minutos = "0" + minutos : minutos
    
    const {abbreviation, timezone, day_of_week, day_of_year, week_number} = data
    const valores = {hora, minutos, abbreviation, timezone, day_of_week, day_of_year, week_number}
    await ui.agregarValores(valores)
    await ui.cambiarVariables(hora)
    await requests.generarFrase()
    ui.ocultarModal()
    ui.actualizarHora()
}