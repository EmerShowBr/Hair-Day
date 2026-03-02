import dayjs from "dayjs";


//Seleciona as sessões manhã, tarde e noite.
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function schedulesShow( { dailySchedules }){
  try {
    // LImpa as listas
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    // Renderiza os agendamentos por periodo.
    dailySchedules.forEach((shedule) => {
      const item = document.createElement("li")
      const time = document.createElement("strong")
      const name = document.createElement("span")

      // Adicionar o ID do agendamento 
      item.setAttribute("data-id", shedule.id)

      time.textContent = dayjs(shedule.when).format("HH:mm")
      name.textContent = shedule.name

      // Cria icone de cancelar o agendamento
      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "Cancelar")

      //Adicionar o tempo, nome e icone.
      item.append(time, name, cancelIcon)

      //Obtém somente a hora
      const hour = dayjs(shedule.when).hour()

      //Renderiza o agendamento na sessão (manhã, tarde ou noite)
      if(hour <= 12 ){
        periodMorning.appendChild(item)
      }else if (hour >12 && hour <= 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }
    })


  } catch (error) {
    alert("Não foi possível exibir os agendamentos")
    console.log(error)
  }
}