import { Camion } from "../types/index";

export const camions: Camion[] = [
  {
    id: "1",
    plateNumber: "12345-A-6",
    color: "Blanc",
    fuelType: "Diesel",
    mileage: 45200,
    status: "En service",
    nextOilChangeMileage: 50000,
  },
  {
    id: "2",
    plateNumber: "78901-B-2",
    color: "Bleu",
    fuelType: "Essence",
    mileage: 67300,
    status: "À l'arrêt",
    nextOilChangeMileage: 70000,
  },
  {
    id: "3",
    plateNumber: "45678-C-9",
    color: "Rouge",
    fuelType: "Diesel",
    mileage: 99000,
    status: "En maintenance",
    nextOilChangeMileage: 95000,
  },
];
