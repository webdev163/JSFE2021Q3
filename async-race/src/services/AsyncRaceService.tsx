import { Component } from 'react';

export default class AsyncRaceService extends Component {
  static async getCars(page = 0, limit = 7) {
    const response = await fetch(`http://localhost:3000/garage?_page=${page}&_limit=${limit}`);
    const totalCarsCount = Number(response.headers.get('X-Total-Count'));
    const carsArr = await response.json();
    return { carsArr, totalCarsCount };
  }

  static async createCar(name: string, color: string) {
    const response = await fetch('http://localhost:3000/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    const newCar = await response.json();
    return newCar;
  }

  // render() {
  //   const { foo } = this.state;
  //   return <div />;
  // }
}
