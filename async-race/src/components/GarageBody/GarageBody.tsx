import React, { Component } from 'react';
import AsyncRaceService from '../../services/AsyncRaceService';
import CarsList from '../CarsList';
import { CARS_PER_PAGE_COUNT } from '../../utils/constants';
import { CarData } from '../../utils/types';

import './GarageBody.scss';

interface State {
  carsArr: CarData[];
  totalCarsCount: number | null;
  totalPagesCount: number | null;
  currentPage: number;
}

export default class GarageBody extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      carsArr: [],
      totalCarsCount: null,
      totalPagesCount: null,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.createCar();
    this.getCars();
  }

  async getCars() {
    const { carsArr, totalCarsCount } = await AsyncRaceService.getCars();
    const totalPagesCount = Math.ceil(totalCarsCount / CARS_PER_PAGE_COUNT);
    this.setState({ carsArr, totalCarsCount, totalPagesCount });
  }

  async createCar() {
    const newCar = (await AsyncRaceService.createCar('Panamera', '#e2e2e2')) as CarData;
    console.log(this.state.carsArr);
    console.log(newCar);

    // this.setState([ ...this.state.carsArr, newCar ])
  }

  render() {
    const { totalCarsCount, currentPage, carsArr } = this.state;
    return (
      <div className="garage-body-wrapper">
        <h2>Garage ({totalCarsCount})</h2>
        <h3>Page #{currentPage}</h3>
        <CarsList carsItems={carsArr} />
      </div>
    );
  }
}
