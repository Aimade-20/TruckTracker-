import { View, ScrollView } from "react-native";
import HeaderSection from "../../components/HeaderSection";
// import { camions } from "../../data/data";
import { useTrucks } from "@/context/TrucksContext";
import TruckCard from "../../components/TruckCard"


export default function Index() {
  const {camions} =useTrucks()
  const filterEnService = camions.filter((item => item.status === "En service"))

  
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View
        style={{
          flex: 1,
        }}
      >
        <HeaderSection status = "En service"/>
        
        {filterEnService.map((item) =>(
          <TruckCard 
          key={item.id}
          camion ={item}
          />
        ))}

      </View>
    </ScrollView>
  );
}
