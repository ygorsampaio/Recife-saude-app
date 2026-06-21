# Recife Saúde - App Mobile

App feito em React Native com Expo. Ele busca a lista de **Unidades
Básicas de Saúde (UBS) do Recife** na API de Dados Abertos da Prefeitura
(Dados Recife), mostra os dados na tela, usa a localização do celular e
salva tudo em um backend próprio (repositório `recife-saude-backend`).

## Por que escolhi essa API

Escolhi o conjunto de dados **Unidades Básicas de Saúde (UBS)** do Dados
Recife porque é uma informação de utilidade pública (encontrar postos de
saúde) e já vem com latitude/longitude de cada unidade, o que combina bem
com a parte de localização do trabalho.

- Dataset: https://dados.recife.pe.gov.br/dataset/unidades-basica-de-saude
- API usada no `api.js`:
  `https://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=7927e663-6753-489c-943c-f20cdd72555e`

## O que o app faz

1. **Tela Home**: busca as UBS na API do Recife e mostra em uma lista.
2. **Tela Detalhes**: mostra as informações da unidade escolhida e tem o
   botão **"Marcar minha localização aqui"**, que pega a localização atual
   do celular (`expo-location`) e envia para o backend (POST).
3. **Tela Histórico**: busca no backend (GET) e mostra todos os check-ins
   já feitos.

## Estrutura do projeto

```
recife-saude-app/
├── App.js              # configura a navegação entre as telas
├── api.js               # funções que buscam e enviam dados (fetch)
├── app.json              # configuração do Expo (permissão de localização)
├── babel.config.js
├── package.json
└── screens/
    ├── Home.js          # lista de unidades (consome API do Dados Recife)
    ├── Detalhes.js       # detalhe + check-in (localização + POST)
    └── Historico.js       # histórico salvo no backend (GET)
```

## Como rodar localmente

Pré-requisitos:
- Node.js instalado
- App **Expo Go** instalado no celular (Android ou iOS) — disponível na
  Play Store / App Store
- O backend (`recife-saude-backend`) já rodando (ver o README dele)

### Passo a passo

1. Criar um projeto Expo vazio:

```bash
npx create-expo-app@latest recife-saude-app --template blank
cd recife-saude-app
```

2. Copiar os arquivos deste repositório (`App.js`, `api.js`, `app.json`,
   `babel.config.js` e a pasta `screens/`) para dentro da pasta criada,
   substituindo os arquivos que já existem.

3. Instalar as bibliotecas usadas (o comando `expo install` já escolhe a
   versão certa para o seu Expo):

```bash
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install expo-location
```

4. Abrir o arquivo `api.js` e trocar essa linha pelo IP do seu computador
   (não usar `localhost`, porque o celular não entende isso):

```js
const API_BACKEND = "http://SEU_IP_AQUI:3000";
```

> Dica: para descobrir o IP, no Windows use `ipconfig`, no Mac/Linux use
> `ifconfig` ou `ip a`. O celular precisa estar na mesma rede Wi-Fi do
> computador.

5. Com o backend já rodando (em outro terminal), iniciar o app:

```bash
npx expo start
```

6. Abrir o app **Expo Go** no celular e escanear o QR code que aparece no
   terminal. (Também dá pra apertar `a` no terminal para abrir num
   emulador Android, se tiver um configurado.)

### Permissão de localização

Na primeira vez que tocar em "Marcar minha localização aqui", o celular
vai pedir permissão de localização — é só aceitar.

## Autor

Nome completo: Ygor Sampaio
