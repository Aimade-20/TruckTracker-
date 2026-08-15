import { View, Text, StyleSheet } from "react-native";
import {camions} from "../data/data"
export default function HeaderSection() {
    const totelTrucks = camions.length
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={{ color: "#1F59C7",fontWeight: "bold",fontSize: 24,backgroundColor :"#F6F7F9"}}>
        TruckTracker
      </Text>
      <Text style={{fontWeight: "bold",fontSize: 20}}>En service</Text>
      <Text style={{fontWeight: "bold"}}>{totelTrucks} camions actuellement en circulation</Text>
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
