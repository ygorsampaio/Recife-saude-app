// api.js
//
// Funções que buscam e enviam dados pela internet.
// Usa o fetch normal do JavaScript, sem bibliotecas extras.

// API de Dados Abertos da Prefeitura do Recife - Unidades Básicas de Saúde (UBS)
// https://dados.recife.pe.gov.br/dataset/unidades-basica-de-saude
const API_RECIFE =
  "https://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=7927e663-6753-489c-943c-f20cdd72555e&limit=300";

// Endereço do nosso backend.
// IMPORTANTE: trocar pelo IP do seu computador na rede Wi-Fi quando for
// testar em um celular de verdade (ver o README do app).
const API_BACKEND = "http://192.168.0.10:3000";

// Busca a lista de Unidades Básicas de Saúde do Recife
export async function buscarUnidades() {
  const resposta = await fetch(API_RECIFE);
  const json = await resposta.json();

  // os registros vêm dentro de result.records
  const unidades = json.result.records;

  // só fica com as unidades que têm latitude e longitude preenchidas
  return unidades.filter((u) => u.latitude && u.longitude);
}

// Envia um novo check-in para o backend (POST)
export async function salvarCheckin(dados) {
  const resposta = await fetch(`${API_BACKEND}/checkins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return resposta.json();
}

// Busca o histórico de check-ins salvos no backend (GET)
export async function buscarHistorico() {
  const resposta = await fetch(`${API_BACKEND}/checkins`);
  return resposta.json();
}
