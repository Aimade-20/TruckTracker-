// import { View, Text } from "react-native";
import { View, ScrollView } from "react-native";
import HeaderSection from "../../components/HeaderSection";
// import { camions } from "../../data/data";
import { useTrucks } from "@/context/TrucksContext";
import TruckCard from "../../components/TruckCard"

export default function ArretScreen() {
   const {camions} =useTrucks()
  const filterarret = camions.filter((item => item.status === "À l'arrêt"))
  // console.log(filterarret);
  return (
     <ScrollView nestedScrollEnabled={true}>
          <View
            style={{
              flex: 1,
            }}
          >
            <HeaderSection status = "À l'arrêt"/>
            
            {filterarret.map((item) =>(
              <TruckCard 
              key={item.id}
              camion ={item}
              />
            ))}
    
          </View>
        </ScrollView>
  );
}