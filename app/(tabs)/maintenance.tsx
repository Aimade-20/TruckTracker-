// import { View, Text } from "react-native";
import { View, ScrollView } from "react-native";
import HeaderSection from "../../components/HeaderSection";
import { useTrucks } from "@/context/TrucksContext";
// import { camions } from "../../data/data";
import TruckCard from "../../components/TruckCard"

export default function MaintenanceScreen() {
  const {camions} =useTrucks()
   const filterMainten = camions.filter((item => item.status === "En maintenance"))
  // console.log(filterMainten);
  return (
     <ScrollView nestedScrollEnabled={true}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <HeaderSection status = "En maintenance"/>
                
                {filterMainten.map((item) =>(
                  <TruckCard 
                  key={item.id}
                  camion ={item}
                  />
                ))}
        
              </View>
            </ScrollView>
  );
}