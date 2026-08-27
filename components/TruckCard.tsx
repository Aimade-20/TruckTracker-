import { View, Text, StyleSheet, Pressable } from "react-native";
import type { Camion } from "../types/index";
import { useRouter } from "expo-router";

interface CardProps {
  camion: Camion;
}
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

export default function TruckCard({ camion }: CardProps) {
  const router = useRouter()
  // console.log("status", camion.status);
  const getVed = () => {
    if (camion.mileage >= camion.nextOilChangeMileage) {
      return (
        <View style={styles.oilBadge}>
          <Text style={styles.oilText}>Vidange à effectuer</Text>
        </View>
      );
    }
  };

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/detail/${camion.id}`)}>
      <View style={styles.topRow}>
        <View style={styles.leftTop}>
          <View
            style={[
              styles.truckCircle,
              {
                borderColor: getTextColor(camion.status),
              },
            ]}
          />

          <Text style={styles.plateNumber}>{camion.plateNumber}</Text>
        </View>

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

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>color</Text>
          <Text style={styles.value}>{camion.color}</Text>

          <Text style={styles.mileage}>{camion.mileage} km</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Carburant</Text>
          <Text style={styles.value}>{camion.fuelType}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text> {getVed()} </Text>
        </View>
      </View>
    </Pressable>
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
    marginTop: 15,
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
    borderWidth: 2,
    marginRight: 10,
  },

  plateNumber: {
    fontSize: 17,
    fontWeight: "700",
    color: "#20252B",
  },

  statusBadge: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },

  infoContainer: {
    marginTop: 8,
    // marginBottom : 8,
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
  oilBadge: {
    backgroundColor: "#FFE8E8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  oilText: {
    color: "#DB3838",
    fontSize: 10,
    fontWeight: "600",
  },
});
