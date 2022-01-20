import AsyncRaceService from "../services/AsyncRaceService";
import { WinnerData, CarData } from "./types";

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomColor = (): string => {
  const r: string = (`0${  getRandomInt(50, 255).toString(16)}`).slice(-2);
  const g: string = (`0${  getRandomInt(50, 255).toString(16)}`).slice(-2);
  const b: string = (`0${  getRandomInt(50, 255).toString(16)}`).slice(-2);
  return `#${r}${g}${b}`;
}

export const createWinner = async (id: number, wins: number, time: number): Promise<WinnerData> => {
  return AsyncRaceService.createWinner(id, wins, time);
};

export const deleteWinner = async (id: number): Promise<void> => {
  await AsyncRaceService.deleteWinner(id);
};

export const getWinner = async (carId: number): Promise<WinnerData> => {
  return await AsyncRaceService.getWinner(carId) as WinnerData;
}

export const getCarData = async (carId: number): Promise<CarData> => {
  return AsyncRaceService.getCar(carId);
};