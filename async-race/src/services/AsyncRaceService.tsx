import { Component } from 'react';
import { CarData } from '../utils/types';

interface GetCarsResponse {
  carsArr: CarData[];
  totalCarsCount: number;
}

interface StartStopEngineResponse {
  velocity: number;
  distance: number;
}

const baseUrl = 'http://localhost:3000';

export default class AsyncRaceService extends Component {
  static async getCars(page = 0, limit = 7): Promise<GetCarsResponse> {
    const response = await fetch(`${baseUrl}/garage?_page=${page}&_limit=${limit}`);
    const totalCarsCount = Number(response.headers.get('X-Total-Count'));
    const carsArr = await response.json();
    return { carsArr, totalCarsCount };
  }

  static async getCar(carId: number): Promise<CarData> {
    const response = await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

  static async createCar(name: string, color: string): Promise<CarData> {
    const response = await fetch(`${baseUrl}/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    const newCar = await response.json();
    return newCar;
  }

  static async updateCar(name: string, color: string, carId: number): Promise<CarData> {
    const response = await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    const newCar = await response.json();
    return newCar;
  }

  static async deleteCar(carId: number): Promise<Record<string, never>> {
    const response = await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }

  static async startEngine(carId: number): Promise<StartStopEngineResponse> {
    const response = await fetch(`${baseUrl}/engine?id=${carId}&status=started`, {
      method: 'PATCH',
    });
    const data: StartStopEngineResponse = await response.json();
    console.log(data);
    return data;
  }

  static async stopEngine(carId: number): Promise<StartStopEngineResponse> {
    const response = await fetch(`${baseUrl}/engine?id=${carId}&status=stopped`, {
      method: 'PATCH',
    });
    const data: StartStopEngineResponse = await response.json();
    console.log(data);
    return data;
  }

  static async driveMode(carId: number) {
    let data;
    let error;
    await fetch(`${baseUrl}/engine?id=${carId}&status=drive`, {
      method: 'PATCH',
    })
      .then(async response => {
        data = await response.json();
      })
      .catch(err => {
        error = { carId, err };
      });
    return data || error;
  }
}
