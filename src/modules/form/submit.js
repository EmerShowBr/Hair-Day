import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"
import { shedulesDay } from "../schedules/load-schedule.js"

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")

const timeToday = dayjs().format("YYYY-MM-DD")

selectedDate.value = timeToday
selectedDate.min = timeToday

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    // Recuperando o nome do cliente
    const name = clientName.value.trim()
    console.log(name)

    if(!name){
      return alert("Informe o nome do cliente!")
    }

    // Recuperar o horario selecionado 
    const hourSelected = document.querySelector(".hour-selected")
    
    if(!hourSelected){
      return alert("Selecione a hora.")
    }

    //Recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":")
    
    //Inserir a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour")
    
    //Gerar um ID
    const id = String(Date.now())

    //Faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    })

    // Recarregar os agendamentos
    await shedulesDay ()

    // Limpa o imput de nome do cliente
    clientName.value = ""
  } catch (error) {
    alert("Não foi possivel realizar o agendamento")
  }
}



