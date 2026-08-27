import { View, Text, StyleSheet, Pressable ,Alert} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
// import { camions } from "../../data/data";
import type { Camion } from "../../types/index";
import { useTrucks } from "@/context/TrucksContext";
import { useState } from "react";


const getStatusColor = (status: Camion["status"]) => {
  if (status === "En maintenance") {
    return "#FFE8E8";
  } else if (status === "À l'arrêt") {
    return "#FFF2DB";
  } else {
    return "#E5F7ED";
  }
};
const getTextColor = (status: Camion["status"]) => {
  if (status === "En maintenance") {
    return "#DB3838";
  } else if (status === "À l'arrêt") {
    return "#F2941F";
  } else {
    return "#1FA15C";
  }
};
export default function DetailTruck() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {camions , deleteCamion , changeStatus} = useTrucks()
  const [status ,setStatus] = useState("")
  const camion = camions.find((item) => item.id === id);

  if (!camion) {
    return (
      <View style={styles.contai}>
        <Text>Camion introuvable</Text>
      </View>
    );
  }
  const oilChangeDue = camion.mileage >= camion.nextOilChangeMileage;
  const remainingKm = camion.nextOilChangeMileage - camion.mileage;
  const handelDelete = () =>{
    Alert.alert("Succès", "Le camion a été supprimer avec succès.", [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);
    deleteCamion(id)
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.appName}>TruckTracker</Text>
      <Text style={styles.title}>Détail du camion</Text>
      <Text style={styles.subtitle}>Informations et actions</Text>

      {/* Truck card */}
      <View style={styles.truckCard}>
        <View
          style={[
            styles.colorCircle,
            {
              backgroundColor: getTextColor(camion.status),
            },
          ]}
        />

        <Text style={styles.plateNumber}>{camion.plateNumber}</Text>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(camion.status),
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: getTextColor(camion.status),
              },
            ]}
          >
            {camion.status}
          </Text>
        </View>
      </View>

      {/* Informations */}
      <Text style={styles.sectionTitle}>Informations</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Couleur</Text>
          <Text style={styles.value}>{camion.color}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Carburant</Text>
          <Text style={styles.value}>{camion.fuelType}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Kilométrage</Text>
          <Text style={styles.value}>{camion.mileage.toLocaleString()} km</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Prochaine vidange</Text>
          <Text style={styles.value}>
            {camion.nextOilChangeMileage.toLocaleString()} km
          </Text>
        </View>
      </View>

      {/* Vidange */}
      {oilChangeDue ? (
        <View style={styles.oilAlert}>
          <Text style={styles.oilText}>Vidange à effectuer</Text>
        </View>
      ) : (
        <View style={styles.oilAlert}>
          <Text style={styles.oilText}>Vidange dans {remainingKm} km</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          style={styles.editButton}
          onPress={() => router.push(`/edit/${camion.id}`)}
        >
          <Text style={styles.buttonText}>Modifier</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={handelDelete}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </Pressable>
      </View>

      {/* Status */}
      <Text style={styles.statusTitle}>Changer le statut</Text>

      <View style={styles.statusActions}>
        <Pressable style={styles.serviceButton} onPress={() => changeStatus(camion.id, "En service")}>
          <Text style={styles.buttonText}>En service</Text>
        </Pressable>

        <Pressable style={styles.stopButton} onPress={() => changeStatus(camion.id, "À l'arrêt")}>
          <Text style={styles.buttonText}>À l arrêt</Text>
        </Pressable>

        <Pressable style={styles.maintenanceButton} onPress={() => changeStatus(camion.id, "En maintenance")}>
          <Text style={styles.buttonText}>Maintenance</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contai: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F7F9",
    paddingHorizontal: 20,
    paddingTop: 28,
  },

  appName: {
    color: "#1F59C7",
    fontSize: 13,
    fontWeight: "600",
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#171B22",
    marginTop: 8,
  },

  subtitle: {
    fontSize: 11,
    color: "#7A8491",
    marginTop: 2,
  },

  truckCard: {
    marginTop: 14,
    height: 92,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2E8",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: "#1FA15C",
    // borderColor: "#0879FF",
    marginRight: 12,
  },

  plateNumber: {
    fontSize: 17,
    fontWeight: "700",
    color: "#171B22",
    flex: 1,
  },

  statusBadge: {
    // backgroundColor: "#E5F7ED",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
  },

  statusText: {
    // color: "#1FA15C",
    fontSize: 9,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 4,
  },

  infoContainer: {
    backgroundColor: "#F6F7F9",
  },

  infoRow: {
    minHeight: 34,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E4E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 10,
    color: "#7A8491",
  },

  value: {
    fontSize: 11,
    fontWeight: "600",
    color: "#171B22",
  },

  oilAlert: {
    marginTop: 14,
    backgroundColor: "#FFF1D8",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },

  oilText: {
    color: "#F2941F",
    fontSize: 11,
    fontWeight: "500",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  editButton: {
    flex: 1,
    height: 38,
    backgroundColor: "#2863D3",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    flex: 1,
    height: 38,
    backgroundColor: "#E63636",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  statusTitle: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 8,
  },

  statusActions: {
    flexDirection: "row",
    gap: 10,
  },

  serviceButton: {
    flex: 1,
    height: 38,
    backgroundColor: "#1FA15C",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  stopButton: {
    flex: 1,
    height: 38,
    backgroundColor: "#F2941F",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  maintenanceButton: {
    flex: 1,
    height: 38,
    backgroundColor: "#DB3838",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});
