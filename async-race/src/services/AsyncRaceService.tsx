import { Component } from 'react';
import {
  CarData,
  WinnerData,
  GetCarsResponse,
  GetWinnersResponse,
  StartStopEngineResponse,
  DriveSuccess,
  DriveError,
} from '../utils/types';
import { CARS_PER_PAGE_COUNT } from '../utils/constants';

const baseUrl = 'http://localhost:3000';

export default class AsyncRaceService extends Component {
  static async getCars(page = 0, limit: number = CARS_PER_PAGE_COUNT): Promise<GetCarsResponse> {
    const response: Response = await fetch(`${baseUrl}/garage?_page=${page}&_limit=${limit}`);
    const totalCarsCount = Number(response.headers.get('X-Total-Count'));
    const carsArr: CarData[] = await response.json();
    return { carsArr, totalCarsCount };
  }

  static async getCar(carId: number): Promise<CarData> {
    const response: Response = await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'GET',
    });
    const data: CarData = await response.json();
    return data;
  }

  static async createCar(name: string, color: string): Promise<CarData> {
    const response: Response = await fetch(`${baseUrl}/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    const newCar: CarData = await response.json();
    return newCar;
  }

  static async updateCar(name: string, color: string, carId: number): Promise<CarData> {
    const response: Response = await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    const newCar: CarData = await response.json();
    return newCar;
  }

  static async deleteCar(carId: number): Promise<Record<string, never>> {
    const response: Response = await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
    const data: Record<string, never> = await response.json();
    return data;
  }

  static async startEngine(carId: number): Promise<StartStopEngineResponse> {
    const response: Response = await fetch(`${baseUrl}/engine?id=${carId}&status=started`, {
      method: 'PATCH',
    });
    const data: StartStopEngineResponse = await response.json();
    return data;
  }

  static async stopEngine(carId: number): Promise<StartStopEngineResponse> {
    const response: Response = await fetch(`${baseUrl}/engine?id=${carId}&status=stopped`, {
      method: 'PATCH',
    });
    const data: StartStopEngineResponse = await response.json();
    return data;
  }

  static async driveMode(carId: number) {
    let data: DriveSuccess | null = null;
    let error: DriveError | null = null;
    await fetch(`${baseUrl}/engine?id=${carId}&status=drive`, {
      method: 'PATCH',
    })
      .then(async (response: Response) => {
        data = await response.json();
      })
      .catch((err: string) => {
        error = { carId, err };
      });
    return data || error;
  }

  static async getWinners(page: number, limit: number, sort: string, order: string): Promise<GetWinnersResponse> {
    const response: Response = await fetch(
      `${baseUrl}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    );
    const totalWinnersCount = Number(response.headers.get('X-Total-Count'));
    const winnersArr: WinnerData[] = await response.json();
    return { winnersArr, totalWinnersCount };
  }

  static async getWinner(carId: number): Promise<WinnerData> {
    const response: Response = await fetch(`${baseUrl}/winners/${carId}`, {
      method: 'GET',
    });
    const data: WinnerData = await response.json();
    return data;
  }

  static async createWinner(id: number, wins: number, time: number): Promise<WinnerData> {
    const response: Response = await fetch(`${baseUrl}/winners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, wins, time }),
    });
    const newWinner: WinnerData = await response.json();
    return newWinner;
  }

  static async deleteWinner(carId: number): Promise<Record<string, never>> {
    const response: Response = await fetch(`${baseUrl}/winners/${carId}`, {
      method: 'DELETE',
    });
    const data: Record<string, never> = await response.json();
    return data;
  }

  static async updateWinner(carId: number, wins: number, time: number): Promise<WinnerData> {
    const response: Response = await fetch(`${baseUrl}/winners/${carId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins, time }),
    });
    const updatedWinner: WinnerData = await response.json();
    return updatedWinner;
  }
}
