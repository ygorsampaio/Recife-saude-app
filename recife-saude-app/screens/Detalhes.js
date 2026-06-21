// screens/Detalhes.js
//
// Mostra os detalhes de uma unidade de saúde e tem o botão de check-in:
// pega a localização atual do usuário (expo-location) e salva no backend
// junto com os dados da unidade.

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { salvarCheckin } from "../api";

export default function Detalhes({ route, navigation }) {
  const { unidade } = route.params;
  const [enviando, setEnviando] = useState(false);

  async function marcarLocalizacao() {
    setEnviando(true);

    // pede permissão de localização ao usuário
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Precisamos da sua localização para fazer o check-in.");
      setEnviando(false);
      return;
    }

    try {
      // pega as coordenadas atuais do celular
      const local = await Location.getCurrentPositionAsync({});

      await salvarCheckin({
        unidadeNome: unidade.nome_oficial,
        bairro: unidade.bairro,
        unidadeLatitude: unidade.latitude,
        unidadeLongitude: unidade.longitude,
        userLatitude: local.coords.latitude,
        userLongitude: local.coords.longitude,
      });

      Alert.alert("Pronto!", "Sua localização foi salva no backend.");
      navigation.navigate("Historico");
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar. Verifique se o backend está rodando.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.nome}>{unidade.nome_oficial}</Text>
      <Text style={styles.linha}>Bairro: {unidade.bairro}</Text>
      <Text style={styles.linha}>Endereço: {unidade["endereço"]}</Text>
      <Text style={styles.linha}>Telefone: {unidade.fone}</Text>
      <Text style={styles.linha}>Horário: {unidade.horario}</Text>
      <Text style={styles.linha}>Serviço: {unidade.servico}</Text>

      <TouchableOpacity style={styles.botao} onPress={marcarLocalizacao} disabled={enviando}>
        {enviando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Marcar minha localização aqui</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  nome: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  linha: { fontSize: 14, color: "#444", marginBottom: 6 },
  botao: {
    backgroundColor: "#0B6E4F",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
});
