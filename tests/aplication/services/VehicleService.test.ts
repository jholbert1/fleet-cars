import { VehicleService } from "../../../src/aplication/services/VehicleService.js";
import { Vehicle } from "../../../src/domain/entities/Vehicle.js";
import { IVehicleRepository } from "../../../src/domain/repositories/IVehicleRepository.js";

jest.mock("../../../src/infrastructure/database/models/FleetModel.js", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

import FleetModel from "../../../src/infrastructure/database/models/FleetModel.js";

describe("VehicleService", () => {
  let vehicleRepositoryMock: jest.Mocked<IVehicleRepository>;
  let vehicleService: VehicleService;

  beforeEach(() => {
    vehicleRepositoryMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByFleet: jest.fn(),
      count: jest.fn(),
    };

    vehicleService = new VehicleService(vehicleRepositoryMock);

    jest.clearAllMocks();
  });

  test('should assign "Espectacular" fleet to eligible Chevrolet vehicles', async () => {
    (FleetModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: "fleetId1",
      name: "Espectacular",
    });

    const vehicleData = {
      brand: "Chevrolet",
      carModel: "Aveo",
      year: 2019,
    };

    vehicleRepositoryMock.create.mockResolvedValueOnce(
      new Vehicle(
        vehicleData.brand,
        vehicleData.carModel,
        vehicleData.year,
        "fleetId1"
      )
    );

    const result = await vehicleService.createVehicle(vehicleData);

    expect(FleetModel.findOne).toHaveBeenCalledWith({ name: "Espectacular" });
    expect(vehicleRepositoryMock.create).toHaveBeenCalled();
    expect(result.fleetId).toBe("fleetId1");
  });

  test('should assign "Pickup / Camioneta" fleet to eligible Toyota vehicles', async () => {
    (FleetModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: "fleetId2",
      name: "Pickup / Camioneta",
    });

    const vehicleData = {
      brand: "Toyota",
      carModel: "Hilux",
      year: 2016,
    };

    vehicleRepositoryMock.create.mockResolvedValueOnce(
      new Vehicle(
        vehicleData.brand,
        vehicleData.carModel,
        vehicleData.year,
        "fleetId2"
      )
    );

    const result = await vehicleService.createVehicle(vehicleData);

    expect(FleetModel.findOne).toHaveBeenCalledWith({
      name: "Pickup / Camioneta",
    });
    expect(vehicleRepositoryMock.create).toHaveBeenCalled();
    expect(result.fleetId).toBe("fleetId2");
  });

  test('should assign "Económico" fleet to vehicles that do not meet other criteria', async () => {
    (FleetModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: "fleetId3",
      name: "Económico",
    });

    const vehicleData = {
      brand: "Ford",
      carModel: "Fiesta",
      year: 2014,
    };

    vehicleRepositoryMock.create.mockResolvedValueOnce(
      new Vehicle(
        vehicleData.brand,
        vehicleData.carModel,
        vehicleData.year,
        "fleetId3"
      )
    );

    const result = await vehicleService.createVehicle(vehicleData);

    expect(FleetModel.findOne).toHaveBeenCalledWith({ name: "Económico" });
    expect(vehicleRepositoryMock.create).toHaveBeenCalled();
    expect(result.fleetId).toBe("fleetId3");
  });
});
