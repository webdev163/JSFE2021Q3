import React, { Component } from 'react';
import GarageHeader from '../../components/GarageHeader';
import GarageBody from '../../components/GarageBody';
import AsyncRaceService from '../../services/AsyncRaceService';
import { CARS_PER_PAGE_COUNT } from '../../utils/constants';
import { CarData, GlobalState } from '../../utils/types';

import './Garage.scss';

interface Props {
  isVisible: boolean;
  updateState: (state: GlobalState) => void;
}

export default class Garage extends Component<Props, GlobalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      carsArr: [],
      totalCarsCount: null,
      totalPagesCount: null,
      currentPage: 1,
      selectedCar: { name: '', color: '#000000', id: 0 },
    };
  }

  componentDidMount() {
    this.getCars();
  }

  componentDidUpdate() {
    const { updateState } = this.props;
    updateState(this.state);
  }

  async getCars() {
    const { carsArr, totalCarsCount } = await AsyncRaceService.getCars();
    const totalPagesCount = Math.ceil(totalCarsCount / CARS_PER_PAGE_COUNT);
    this.setState({ carsArr, totalCarsCount, totalPagesCount });
  }

  createCar = async (carName: string, carColor: string) => {
    const { carsArr } = this.state;
    const carData = (await AsyncRaceService.createCar(carName, carColor)) as CarData;
    this.setState({ carsArr: [...carsArr, carData] });
    this.getCars();
  };

  deleteCar = async (carId: number) => {
    await AsyncRaceService.deleteCar(carId);
    this.getCars();
  };

  selectCar = async (carId: number) => {
    const carData = await AsyncRaceService.getCar(carId);
    this.setState({ selectedCar: carData });
  };

  updateCar = async (name: string, color: string, carId: number) => {
    await AsyncRaceService.updateCar(name, color, carId);
    const { carsArr } = this.state;
    const index = carsArr.findIndex(el => el.id === carId);
    this.setState({
      selectedCar: { name: '', color: '#000000', id: 0 },
      carsArr: [...carsArr.slice(0, index), { name, color, id: carId }, ...carsArr.slice(index + 1)],
    });
  };

  render() {
    const { isVisible } = this.props;
    return (
      <div className={`garage-wrapper ${isVisible ? '' : 'hidden'}`}>
        <GarageHeader createCar={this.createCar} updateCar={this.updateCar} />
        <GarageBody deleteCar={this.deleteCar} selectCar={this.selectCar} />
      </div>
    );
  }
}
