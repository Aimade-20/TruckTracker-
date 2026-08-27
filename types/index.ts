export type Camion = {
  id: string;
  plateNumber: string;
  color: string;
  fuelType: string;
  mileage: number;
  status: "En service" | "À l'arrêt" | "En maintenance";
  nextOilChangeMileage: number;
};