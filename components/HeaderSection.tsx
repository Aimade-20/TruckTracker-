import { View, Text, StyleSheet } from "react-native";
// import {camions} from "../data/data"
import { useTrucks } from "@/context/TrucksContext";
import type { Camion } from "../types";
interface headerProps {
    status : Camion["status"]
}
export default function HeaderSection({status} : headerProps) {
  const {camions} =useTrucks()
  const totalTrucks = camions.filter((camion) => camion.status === status).length
    const getDescription = () =>{
      switch (status) {
        case "En service":
          return "camions actuellement en circulation"
      case "À l'arrêt":
          return "camions actuellement à l'arrêt"
        case "En maintenance":
          return "camions actuellement en maintenance"
      }
    }
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={{ color: "#1F59C7",fontWeight: "bold",fontSize: 24,backgroundColor :"#F6F7F9"}}>
        TruckTracker
      </Text>
      <Text style={{fontWeight: "bold",fontSize: 20}}>En service</Text>
      <Text style={{fontWeight: "bold"}}>{totalTrucks} {getDescription()}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container :{
        backgroundColor :"#F6F7F9"
    },
  header: {
    marginTop: 40,
    marginLeft: 24,
    backgroundColor :"#F6F7F9"
  },
});
