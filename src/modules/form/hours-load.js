import { openingHours } from "../../utils/opening-hours.js"
import dayjs from "dayjs"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")
const dateInput = document.getElementById("date")
const wrapper = document.querySelector(".input")


//Permite clicar em qualquer lugar perto para abrir o calendario
wrapper.addEventListener("click", () => {
  dateInput.showPicker()
})

export function hoursLoad({ date, dailySchedules }) {
  //Limpa a lista de horários.
  hours.innerHTML = ""

  // Obtém a lista de todos os horários ocupados
  const unavailableHours = dailySchedules.map((shedule) => dayjs(shedule.when).format("HH:mm"))



  const opening = openingHours.map((hour) => {

    //recupera somente a hora
    const [scheduleHour] = hour.split(":")

    // adicona a hora no date e verifica se esta no passado.
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available,
    }
  })

  //Renderiza os horarios
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    //antes de adicionar o item verificar o cabeçalho se é manha terde ou noite
    if (hour === "9:00") {
      hourHeaderAdd("Manhã")
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite")
    }

    hours.append(li)
  })

  //chamando a funcao criada para quando for clicado ficar selecionado a estilização
  hoursClick()
}

//separar como manha tarde noite
function hourHeaderAdd(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}