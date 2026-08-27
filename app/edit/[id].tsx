import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import type { Camion } from "../../types/index";
import { useTrucks } from "@/context/TrucksContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function EditTruckScreen() {
  const router = useRouter();
  const { camions, editCamion } = useTrucks();
  const { id } = useLocalSearchParams<{ id: string }>();

  const camion = camions.find((item) => item.id === id);

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

  useEffect(() => {
    if (camion) {
      setPlateNumber(camion.plateNumber);
      setColor(camion.color);
      setFuelType(camion.fuelType);
      setMileage(String(camion.mileage));
      setStatus(camion.status);
      setNextOilChangeMileage(String(camion.nextOilChangeMileage));
    }
  }, [camion]);

  if (!camion) {
    return (
      <View style={styles.contai}>
        <Text>Camion introuvable</Text>
      </View>
    );
  }
  const handleSave = () => {
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

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    editCamion(id, {
      plateNumber,
      color,
      fuelType,
      mileage: Number(mileage),
      status,
      nextOilChangeMileage: Number(nextOilChangeMileage),
    });

    Alert.alert("Succès", "Le camion a été modifié avec succès.", [
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

      <Text style={styles.title}>Modifier le camion</Text>

      <Text style={styles.subtitle}>Mettre à jour les informations</Text>

      {/* Immatriculation */}
      <View style={styles.field}>
        <Text style={styles.label}>Immatriculation</Text>

        <TextInput
          style={[styles.input, errors.plateNumber && styles.inputError]}
          value={plateNumber}
          onChangeText={setPlateNumber}
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
        />
        {errors.fuelType && <Text style={styles.error}>{errors.fuelType}</Text>}
      </View>

      {/* Kilométrage */}
      <View style={styles.field}>
        <Text style={styles.label}>Kilométrage</Text>

        <TextInput
          style={[styles.input, errors.mileage && styles.inputError]}
          value={mileage}
          keyboardType="numeric"
          onChangeText={setMileage}
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
          keyboardType="numeric"
        />
        {errors.nextOilChangeMileage && (
          <Text style={styles.error}>{errors.nextOilChangeMileage}</Text>
        )}
      </View>

      {/* Enregistrer */}
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
      </Pressable>

      {/* Annuler */}
      <Pressable
        style={styles.cancelButton}
        onPress={() => router.push(`/detail/${camion.id}`)}
      >
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contai: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
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
    fontSize: 9,
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
    fontSize: 10,
    color: "#20252B",
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
  pickerContainer: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2E8",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },

  saveButton: {
    height: 49,
    backgroundColor: "#2863D3",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  cancelButton: {
    height: 49,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#F1F2F4",
  },

  cancelButtonText: {
    color: "#20252B",
    fontSize: 14,
    fontWeight: "600",
  },
});
