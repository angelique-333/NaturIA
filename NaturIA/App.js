import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from '@expo/vector-icons';

const API_URL = "https://inaturalist-backend-256970460827.us-central1.run.app";
const MAP_URL = "https://visualizador.inde.gov.br/Compartilhar?mapas=W3sibm9tZSI6ImNlcnJhZG9fcGFudGFuYWxfMmFfYXR1YWxpemFjYW8iLCJkZXNjcmljYW8iOiJNTUEgLSDBcmVhcyBQcmlvcml04XJpYXMgcGFyYSBhIENvbnNlcnZh5+NvIGRhIEJpb2RpdmVyc2lkYWRlIC0gQ2VycmFkbyBlIFBhbnRhbmFsIiwid21zIjoiaHR0cHM6Ly9nZW9zZXJ2aWNvcy5pbmRlLmdvdi5ici9nZW9zZXJ2ZXIvSUNNQmlvL293cyIsImJib3giOlstNTkuNzE5MDc4MDYzOTY0OCwtMjQuNjc0MzIyMTQ1ODEzMTQ3LC00MS44NzkxNjU2NDk0MTQwOSwtMi42MjkxNzUxODYxMDI3M10sInpvb20iOjEwLCJjZW50ZXIiOlstNTMyMDc0Ny42MTQ0NDY3NTMsLTE3Nzg3NDUuMzYyMDY3MTAxNV0sInV1aWQiOiJkYzJiOTU5ZC1iMGFmLTQyZmUtOTExYy1kMDIxMjljODA0YmUiLCJtZXRhZGFkbyI6Imh0dHBzOi8vbWV0YWRhZG9zLmluZGUuZ292LmJyL2dlb25ldHdvcmsvc3J2L3Bvci9jc3c/c2VydmljZT1DU1cmdmVyc2lvbj0yLjAuMiZyZXF1ZXN0PUdldFJlY29yZEJ5SWQmZWxlbWVudFNldE5hbWU9ZnVsbCZvdXRwdXRTY2hlbWE9Y3N3Oklzb1JlY29yZCZpZD1kYzJiOTU5ZC1iMGFmLTQyZmUtOTExYy1kMDIxMjljODA0YmUifV0=";

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== "granted" || galleryStatus.status !== "granted") {
        setTimeout(() => {
          Alert.alert(
            "Permissão necessária",
            "É preciso permitir o acesso à câmera e galeria para continuar."
          );
        }, 100);
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        base64: true,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setBase64Image(result.assets[0].base64);
        setResult(null);
      }
    } catch (e) {
      Alert.alert("Erro de Galeria", e.message);
      console.error(e);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão Negada",
          "Ative a permissão para acessar a câmera nas configurações do dispositivo."
        );
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        base64: true,
        allowsEditing: true,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setBase64Image(result.assets[0].base64);
        setResult(null);
      }
    } catch (e) {
      Alert.alert("Erro de Câmera", e.message);
      console.error(e);
    }
  };

  const identifySpecies = async () => {
    if (!base64Image) {
      Alert.alert("Erro", "Selecione ou tire uma foto primeiro.");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/identify`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ image: `data:image/jpeg;base64,${base64Image}` }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Resposta inválida do servidor.");
      }

      if (!response.ok) throw new Error(data.error || "Erro na identificação.");
      setResult(data);
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha na identificação.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* LOGO */}
      <Text style={styles.logo}>NaturIA 🌿</Text>
      <Text style={styles.subtitle}>Identifique plantas e animais em segundos e acompanhe alertas ambientais oficiais do ICMBio. Explore a natureza com consciência</Text>

      {/* BOTOES DA LINHA */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.photoButton]} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={20} color="#fff" />
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={pickImage}>
          <MaterialIcons name="photo-library" size={20} color="#fff" />
          <Text style={styles.buttonText}>Galeria</Text>
        </TouchableOpacity>
      </View>

      {/* IMAGEM */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />}

      {/* BOTAO IDENTIFICAR */}
      <TouchableOpacity style={[styles.button, styles.identifyButton]} onPress={identifySpecies} disabled={loading || !base64Image}>
        {loading ? <ActivityIndicator color="#fff" /> : (
          <>
            <MaterialIcons name="nature" size={20} color="#fff" />
            <Text style={styles.buttonText}>Identificar Espécie</Text>
          </>
        )}
      </TouchableOpacity>

      {/* BOTAO MAPA */}
      <TouchableOpacity style={[styles.button, styles.mapButton]} onPress={() => Linking.openURL(MAP_URL)}>
        <MaterialIcons name="map" size={20} color="#fff" />
        <Text style={styles.buttonText}>Ver Alertas no Mapa</Text>
      </TouchableOpacity>

      {/* RESULTADO */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado</Text>
          <Text style={styles.resultText}>Tipo: <Text style={styles.bold}>{result.category || "Desconhecido"}</Text></Text>
          {result.name && <Text style={styles.resultText}>Nome: <Text style={styles.bold}>{result.name}</Text></Text>}
          {result.details && (
            <>
              <Text style={styles.resultText}>Confiança: <Text style={styles.bold}>{result.details.confidence}</Text></Text>
              <Text style={styles.resultText}>Descrição: <Text style={styles.bold}>{result.details.description_ods15}</Text></Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6ede3",
  },
  logo: {
    fontSize: 36,
    fontWeight: "900",
    color: "#2E8B57",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B4C3B",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  photoButton: {
    backgroundColor: "#66CDAA",
    flex: 1,
    paddingVertical: 12,
  },
  galleryButton: {
    backgroundColor: "#BC8F8F",
    flex: 1,
    paddingVertical: 12,
  },
  identifyButton: {
    backgroundColor: "#4682B4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 8,
  },
  mapButton: {
    backgroundColor: "#4682B4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 6,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resultCard: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },
  bold: {
    fontWeight: "700",
    color: "#000",
  },
});
