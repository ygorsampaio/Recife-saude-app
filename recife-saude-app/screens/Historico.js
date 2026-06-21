// screens/Historico.js
//
// Busca no backend (GET /checkins) todos os check-ins já salvos e mostra
// em uma lista: nome da unidade, localização do usuário e data/hora.

import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { buscarHistorico } from "../api";

export default function Historico() {
  const [checkins, setCheckins] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(() => {
    setCarregando(true);
    buscarHistorico()
      .then((dados) => setCheckins(dados))
      .catch(() => setCheckins([]))
      .finally(() => setCarregando(false));
  }, []);

  // recarrega toda vez que a tela é aberta (ex: depois de um novo check-in)
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0B6E4F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoAtualizar} onPress={carregar}>
        <Text style={styles.botaoTexto}>Atualizar</Text>
      </TouchableOpacity>

      <FlatList
        data={checkins}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.unidadeNome}</Text>
            <Text style={styles.linha}>
              Minha localização: {item.userLatitude.toFixed(4)}, {item.userLongitude.toFixed(4)}
            </Text>
            <Text style={styles.data}>{new Date(item.data).toLocaleString("pt-BR")}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum check-in salvo ainda. Visite uma unidade e marque sua localização.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f2f2f2" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: "#fff", padding: 15, marginBottom: 10, borderRadius: 8 },
  nome: { fontSize: 16, fontWeight: "bold" },
  linha: { color: "#555", marginTop: 4 },
  data: { color: "#999", fontSize: 12, marginTop: 4 },
  botaoAtualizar: {
    backgroundColor: "#0B6E4F",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  vazio: { textAlign: "center", marginTop: 40, color: "#999" },
});
