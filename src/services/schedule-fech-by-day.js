import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function sheduleFetchByDay({date}){
  try {
    // Fazendo a requisição. Buscar os dados na API
    // É um GET automático (porque não foi definido method).
    const shedulesResponse = await fetch(`${apiConfig.baseURL}/schedules`)

    //Converte para JSON
    const schedules  = await shedulesResponse.json()

    //Filtra os agendamentos pelo dia selecionado
    const dailySchedules = schedules.filter(( schedule) => dayjs(date).isSame(schedule.when, "day")
  )

  return dailySchedules
  } catch (error) {
    console.log(error);
    alert("Não foi possivel buscar os agendamentos do dia selecionado.")
  }
}