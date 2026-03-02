import { apiConfig } from "./api-config.js";


// Função para fazer a requisição para ENVIAR os dados do agendamento.
//“Se alguém me passar id, name e when, eu envio para o servidor.”
export async function scheduleNew({ id, name, when }){
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, when}),
    })

    alert("Agendamento criado com sucesso!")

    // exibe mensagem de agendamento realizada
  } catch (error) {
    console.log(error)
    alert("Não foi possível agendar.Tente novamente mais tarde.")
  }
}

