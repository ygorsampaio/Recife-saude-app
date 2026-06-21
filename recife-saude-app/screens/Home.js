// screens/Home.js
//
// Tela inicial: busca a lista de Unidades Básicas de Saúde na API do
// Dados Recife e mostra em uma lista. Ao tocar em uma unidade, abre a
// tela de Detalhes.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { buscarUnidades } from "../api";

export default function Home({ navigation }) {
  const [unidades, setUnidades] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarUnidades()
      .then((dados) => setUnidades(dados))
      .catch(() => Alert.alert("Erro", "Não foi possível buscar os dados da API do Recife."))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0B6E4F" />
        <Text>Carregando unidades de saúde...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={unidades}
      keyExtractor={(item, index) => String(item.cnes || index)}
      ListHeaderComponent={
        <TouchableOpacity
          style={styles.linkHistorico}
          onPress={() => navigation.navigate("Historico")}
        >
          <Text style={styles.linkHistoricoTexto}>Ver meu histórico de check-ins</Text>
        </TouchableOpacity>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Detalhes", { unidade: item })}
        >
          <Text style={styles.nome}>{item.nome_oficial}</Text>
          <Text style={styles.bairro}>{item.bairro}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f2f2f2" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  nome: { fontSize: 16, fontWeight: "bold" },
  bairro: { color: "#555", marginTop: 4 },
  linkHistorico: {
    backgroundColor: "#0B6E4F",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  linkHistoricoTexto: { color: "#fff", fontWeight: "bold" },
});
