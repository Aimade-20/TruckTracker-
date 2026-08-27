import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";

import { useTrucks } from "@/context/TrucksContext";
import { Camion } from "../types/index";

export default function AddTruckScreen() {
  const { addCamion } = useTrucks();
  const router = useRouter();

  const [plateNumber, setPlateNumber] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [mileage, setMileage] = useState("");
  const [status, setStatus] = useState<Camion["status"]>("En service");
  const [nextOilChangeMileage, setNextOilChangeMileage] = useState("");

  const [errors, setErrors] = useState({
    plateNumber: "",
    color: "",
    fuelType: "",
    mileage: "",
    status: "",
    nextOilChangeMileage: "",
  });

  const handleAdd = () => {
    const newErrors = {
      plateNumber: "",
      color: "",
      fuelType: "",
      mileage: "",
      status: "",
      nextOilChangeMileage: "",
    };

    if (!plateNumber.trim()) {
      newErrors.plateNumber = "L'immatriculation est obligatoire";
    }

    if (!color.trim()) {
      newErrors.color = "La couleur est obligatoire";
    }

    if (!fuelType.trim()) {
      newErrors.fuelType = "Le type de carburant est obligatoire";
    }

    if (!mileage.trim()) {
      newErrors.mileage = "Le kilométrage est obligatoire";
    } else if (isNaN(Number(mileage))) {
      newErrors.mileage = "Le kilométrage doit être un nombre";
    }

    if (!nextOilChangeMileage.trim()) {
      newErrors.nextOilChangeMileage =
        "Le kilométrage de vidange est obligatoire";
    } else if (isNaN(Number(nextOilChangeMileage))) {
      newErrors.nextOilChangeMileage =
        "Le kilométrage de vidange doit être un nombre";
    }

    setErrors(newErrors);

    const newCamion: Camion = {
      id: Date.now().toString(),
      plateNumber: plateNumber.trim(),
      color: color.trim(),
      fuelType: fuelType.trim(),
      mileage: Number(mileage),
      status,
      nextOilChangeMileage: Number(nextOilChangeMileage),
    };

    // console.log("NEW CAMION:", newCamion);

    addCamion(newCamion);

    // console.log("ADD EXECUTED");

    Alert.alert("Succès", "Le camion a été ajouté avec succès.", [
      {
        text: "OK",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.appName}>TruckTracker</Text>

      <Text style={styles.title}>Ajouter un camion</Text>

      <Text style={styles.subtitle}>Créer une nouvelle fiche</Text>

      {/* Immatriculation */}
      <View style={styles.field}>
        <Text style={styles.label}>Immatriculation</Text>

        <TextInput
          style={[styles.input, errors.plateNumber && styles.inputError]}
          value={plateNumber}
          onChangeText={setPlateNumber}
          placeholder="Ex. 12345-A-6"
          placeholderTextColor="#737B86"
        />

        {errors.plateNumber && (
          <Text style={styles.error}>{errors.plateNumber}</Text>
        )}
      </View>

      {/* Couleur */}
      <View style={styles.field}>
        <Text style={styles.label}>Couleur</Text>

        <TextInput
          style={[styles.input, errors.color && styles.inputError]}
          value={color}
          onChangeText={setColor}
          placeholder="Ex. Blanc"
          placeholderTextColor="#737B86"
        />

        {errors.color && <Text style={styles.error}>{errors.color}</Text>}
      </View>

      {/* Carburant */}
      <View style={styles.field}>
        <Text style={styles.label}>Type de carburant</Text>

        <TextInput
          style={[styles.input, errors.fuelType && styles.inputError]}
          value={fuelType}
          onChangeText={setFuelType}
          placeholder="Diesel"
          placeholderTextColor="#737B86"
        />

        {errors.fuelType && <Text style={styles.error}>{errors.fuelType}</Text>}
      </View>

      {/* Kilométrage */}
      <View style={styles.field}>
        <Text style={styles.label}>Kilométrage initial</Text>

        <TextInput
          style={[styles.input, errors.mileage && styles.inputError]}
          value={mileage}
          onChangeText={setMileage}
          placeholder="45200"
          keyboardType="numeric"
          placeholderTextColor="#737B86"
        />

        {errors.mileage && <Text style={styles.error}>{errors.mileage}</Text>}
      </View>

      {/* Statut */}
      <View style={styles.field}>
        <Text style={styles.label}>Statut initial</Text>

        <View
          style={[styles.pickerContainer, errors.status && styles.inputError]}
        >
          <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value as Camion["status"])}
          >
            <Picker.Item label="En service" value="En service" />

            <Picker.Item label="À l'arrêt" value="À l'arrêt" />

            <Picker.Item label="En maintenance" value="En maintenance" />
          </Picker>
        </View>

        {errors.status && <Text style={styles.error}>{errors.status}</Text>}
      </View>

      {/* Vidange */}
      <View style={styles.field}>
        <Text style={styles.label}>Prochaine vidange à</Text>

        <TextInput
          style={[
            styles.input,
            errors.nextOilChangeMileage && styles.inputError,
          ]}
          value={nextOilChangeMileage}
          onChangeText={setNextOilChangeMileage}
          placeholder="50000"
          keyboardType="numeric"
          placeholderTextColor="#737B86"
        />

        {errors.nextOilChangeMileage && (<Text style={styles.error}>{errors.nextOilChangeMileage}</Text>)}
      </View>

      {/* Button */}
      <Pressable style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Ajouter le camion</Text>
      </Pressable>

      <Text style={styles.footerText}>Tous les champs sont obligatoires</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },

  content: {
    backgroundColor: "#F6F7F9",
    marginHorizontal: 18,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 40,
    borderRadius: 22,
    minHeight: "100%",
  },

  appName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F59C7",
    marginBottom: 14,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#171B22",
  },

  subtitle: {
    fontSize: 13,
    color: "#737B86",
    marginTop: 2,
    marginBottom: 18,
  },

  field: {
    marginBottom: 13,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#66717F",
    marginBottom: 7,
  },

  input: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2E8",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    overflow: "hidden",
    color: "#20252B",
  },

  pickerContainer: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2E8",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },

  inputError: {
    borderColor: "#DB3838",
  },

  error: {
    color: "#DB3838",
    fontSize: 11,
    marginTop: 5,
    marginLeft: 3,
    fontWeight: "500",
  },

  addButton: {
    height: 49,
    backgroundColor: "#2863D3",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  footerText: {
    fontSize: 11,
    color: "#737B86",
    marginTop: 17,
  },
});
