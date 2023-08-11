const btnCalcular = document.querySelector("[data-botao]")
const inputDia = document.getElementById("dia")
const inputMes = document.getElementById("mes")
const inputAno = document.getElementById("ano")
const resultadoAnos = document.querySelector("[data-anos]")
const resultadoMeses = document.querySelector("[data-meses]")
const resultadoDias = document.querySelector("[data-dias]")
const mensagensErro = document.querySelectorAll(".mensagem-erro")

btnCalcular.addEventListener("click", calcularIdade)

function calcularIdade() {
  mensagensErro.forEach(mensagem => mensagem.textContent = "")

  const dia = parseInt(inputDia.value)
  const mes = parseInt(inputMes.value)
  const ano = parseInt(inputAno.value)

  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
    exibirMensagemErro("Insira valores válidos para calcular a idade.")
    return
  }

  const dataAtual = new Date()
  const anoAtual = dataAtual.getFullYear()
  const mesAtual = dataAtual.getMonth() + 1
  const diaAtual = dataAtual.getDate()

  if (!validarData(dia, mes, ano)) {
    exibirMensagemErro("Insira uma data válida.")
    return
  }

  let idadeAnos = anoAtual - ano
  let idadeMeses = mesAtual - mes
  let idadeDias = diaAtual - dia

  if (idadeDias < 0) {
    idadeMeses--
    const ultimoDiaMesAnterior = new Date(anoAtual, mesAtual - 1, 0).getDate()
    idadeDias = ultimoDiaMesAnterior + idadeDias
  }

  if (idadeMeses < 0) {
    idadeAnos--
    idadeMeses += 12
  }

  if (ano > anoAtual || (ano === anoAtual && mes > mesAtual) || (ano === anoAtual && mes === mesAtual && dia > diaAtual)) {
    exibirMensagemErro("A data está no futuro.");
    return;
  }

  resultadoAnos.textContent = idadeAnos
  resultadoMeses.textContent = idadeMeses
  resultadoDias.textContent = idadeDias
}

function exibirMensagemErro(mensagem) {
  mensagensErro.forEach(mensagemErro => mensagemErro.textContent = mensagem)
}

function validarData(dia, mes, ano) {
  const dataInformada = new Date(ano, mes - 1, dia)

  if (dataInformada.getFullYear() === ano &&
      dataInformada.getMonth() + 1 === mes &&
      dataInformada.getDate() === dia) {
    return true
  }

  return false
}
