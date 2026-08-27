import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Camion } from "../types";
import { camions as initialCamions } from "../data/data";

interface TrucksContextType {
  camions: Camion[];
  addCamion: (camion: Camion) => void;
  editCamion:  ( id: string, updatedData: Partial<Camion>) => void;
  deleteCamion : (id : string) => void
  changeStatus : (id : string ,newStates :Camion["status"]) => void
}

const TrucksContext = createContext<TrucksContextType | undefined>(undefined);

export const TruckProvider = ({ children}: {children: ReactNode}) => {
  const [camions, setCamions] = useState<Camion[]>(initialCamions);

  const addCamion = (newCamion: Camion) => {
    setCamions((prev) => [...prev, newCamion]);
  };

  const editCamion = (id : string , updateData : Partial<Camion>) =>{
    setCamions((prev) => prev.map((initialCamions) => 
      initialCamions.id === id ? {...initialCamions , ...updateData} : initialCamions
    ))
  }

  const deleteCamion = (id : string ) =>{
    setCamions((prev) => prev.filter((item) => item.id !== id))
  }

  const changeStatus = (id : string , newStates : Camion["status"]) =>{
    setCamions((prev) => prev.map((camion) => camion.id === id ? {...camion, status : newStates} : camion))
  }


  return (
    <TrucksContext.Provider
      value={{
        camions,
        addCamion,
        editCamion,
        deleteCamion,
        changeStatus
      }}
    >
      {children}
    </TrucksContext.Provider>
  );
};

export function useTrucks() {
  const context = useContext(TrucksContext);

  if (!context) {
    throw new Error(
      "useTrucks must be used inside TruckProvider"
    );
  }

  return context;
}