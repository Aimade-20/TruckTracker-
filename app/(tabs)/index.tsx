import { View, ScrollView } from "react-native";
import HeaderSection from "../../components/HeaderSection";
import { camions } from "../../data/data";
import TruckCard from "../../components/TruckCard"

export default function Index() {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View
        style={{
          flex: 1,
        }}
      >
        <HeaderSection />
        
        {camions.map((item) =>(
          <TruckCard 
          key={item.id}
          camion ={item}
          />
        ))}

      </View>
    </ScrollView>
  );
}
