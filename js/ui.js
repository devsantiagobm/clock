class UI {
    mostrarContenido() {
        const frase = document.querySelector('.phrase')
        frase.classList.add('phrase--hidden')
    }

    ocultarContenido() {
        const frase = document.querySelector('.phrase')
        frase.classList.remove('phrase--hidden')
    }

    agregarValores(datos) {
        const { hora, minutos, timezone, day_of_week, day_of_year, week_number } = datos
        const cajas = this.obtenerCajas()
        const { boxHora, boxAbreviacion, boxCity, boxPlace, boxDayYear, boxDayWeek, boxWeek, boxReception, boxImage } = cajas
        boxAbreviacion.textContent = this.horaAbreviada(hora);
        boxHora.textContent = `${this.horaFormateada(hora)}:${minutos}`;
        boxReception.textContent = this.cambiarSaludo(hora)
        boxCity.textContent = `In ${timezone.split("/")[1]}`
        boxPlace.textContent = timezone.replace("/", ", ");
        boxDayWeek.textContent = this.diaFormateado(day_of_week)
        boxDayYear.textContent = day_of_year
        boxWeek.textContent = week_number
        boxImage.src = this.cambiarIcono(hora)
    }

    diaFormateado(day) {
        const dias = {
            1: "Monday",
            2: "Tueday",
            3: "Wednesday",
            4: "thursday",
            5: "Friday",
            6: "Saturday",
            0: "Sunday",
        }

        return dias[day] || "Undefined"
    }

    obtenerCajas() {
        const boxHora = document.querySelector('.data__hour')
        const boxAbreviacion = document.querySelector('.data__standard')
        const boxCity = document.querySelector('.data__place')
        const boxPlace = document.querySelector('.information__data--place')
        const boxDayYear = document.querySelector('.information__data--day-year')
        const boxDayWeek = document.querySelector('.information__data--day-week')
        const boxWeek = document.querySelector('.information__data--week')
        const boxReception = document.querySelector('.data__reception')
        const boxImage = document.querySelector('.data__icon')
        return { boxHora, boxAbreviacion, boxCity, boxPlace, boxDayYear, boxDayWeek, boxWeek, boxReception, boxImage }
    }

    cambiarVariables(hora) {
        const setStyles = document.documentElement.style
        if (hora < 5 || hora >= 18) {
            setStyles.setProperty('--bg-image', "url(../assets/desktop/bg-image-nighttime.jpg)")
            setStyles.setProperty('--bg-data', "var(--bg-light)")
            setStyles.setProperty('--text-data', "var(--text)")
        }

    }

    horaFormateada(hora) {
        let horaFormateada = ((hora + 11) % 12 + 1)

        horaFormateada = horaFormateada < 10 ? "0" + horaFormateada : horaFormateada

        return horaFormateada;
    }

    horaAbreviada = hora => hora < 12 ? "a:m" : "p:m"

    cambiarSaludo(hora) {
        const intervalos = [[5, 11, "Good morning"], [12, 18, "Good afternoon"], [19, 23, "Good evening"], [0, 4, "Good evening"]]
        return intervalos.find(item => item[0] <= hora && item[1] >= hora)[2] + ", it's currently"
    }

    cambiarIcono = hora => hora < 5 || hora >= 18 ? "assets/icon-moon.svg" : "assets/icon-sun.svg"

    ocultarModal() {
        const modal = document.querySelector('.modal')

        modal.classList.add('modal--hidden')
    }

    fetchCatch(error) {
        alert(`Something did not work. Error: ${error}`)
    }

    actualizarHora() {

        const fecha = new Date()
        let segundos = fecha.getSeconds()
        const segundosFaltantes = (60 - segundos) * 1000

        setTimeout(() => {
            this.iniciarTemporizador()
            
            setInterval(() => {
                this.iniciarTemporizador()
            }, 60000);
        
        }, segundosFaltantes)
    
    }

    iniciarTemporizador() {
        const fecha = new Date()
        const hora = fecha.getHours()
        let minutos = fecha.getMinutes()
        minutos < 10 ? minutos = "0" + minutos : minutos

        const boxHora = document.querySelector('.data__hour')
        boxHora.textContent = `${this.horaFormateada(hora)}:${minutos}`;
    }

    generarFrase(data){
        const {author, en} = data;
        const boxAuthor = document.querySelector('.phrase__author')
        const boxPhrase = document.querySelector('.phrase__text')

        boxAuthor.textContent = author;
        boxPhrase.textContent = en;
    }
}

const ui = new UI()
export default ui;