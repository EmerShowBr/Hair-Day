import { hoursLoad } from "../form/hours-load";
import { sheduleFetchByDay } from "../../services/schedule-fech-by-day.js"
import { schedulesShow } from "../schedules/show.js"

//seleciona o input de data
const selectedDate = document.getElementById("date")

export async function shedulesDay() {
  // Obtpem a data do input
  const date = selectedDate.value

  //Busca na API os agendamentos
  const dailySchedules = await sheduleFetchByDay({ date })

  // Exibe os agendamentos
  schedulesShow({dailySchedules})


  // Carregar as horas disponiveis
  hoursLoad({ date, dailySchedules })
} 