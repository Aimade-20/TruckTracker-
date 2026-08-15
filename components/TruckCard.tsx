import { View, Text, StyleSheet } from "react-native";
import type {Camion} from "../types/index"

interface CardProps {
    camion : Camion
}

export default function TruckCard({camion} : CardProps) {
  return (
    <View style={styles.card}>
      {/* Top */}
      <View style={styles.topRow}>
        <View style={styles.leftTop}>
          <View style={styles.truckCircle} />

          <Text style={styles.plateNumber}>
            {camion.plateNumber}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {camion.status}
          </Text>
        </View>
      </View>

      {/* Informations */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>color</Text>
          <Text style={styles.value}>{camion.color}</Text>

          <Text style={styles.mileage}>
            {camion.mileage} km
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Carburant</Text>
          <Text style={styles.value}>{camion.fuelType}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 138,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2E8",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginTop : 15 ,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  truckCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#16A05D",
    borderWidth: 2,
    borderColor: "#0879FF",
    marginRight: 10,
  },

  plateNumber: {
    fontSize: 17,
    fontWeight: "700",
    color: "#20252B",
  },

  statusBadge: {
    backgroundColor: "#E2F7EC",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#159451",
  },

  infoContainer: {
    marginTop: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  label: {
    width: 65,
    fontSize: 11,
    color: "#737B86",
  },

  value: {
    fontSize: 12,
    fontWeight: "600",
    color: "#20252B",
  },

  mileage: {
    marginLeft: "auto",
    fontSize: 13,
    fontWeight: "600",
    color: "#20252B",
  },
});