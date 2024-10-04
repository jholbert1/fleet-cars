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
      nombre: "Espectacular",
    });

    const vehicleData = {
      marca: "Chevrolet",
      modelo: "Aveo",
      año: 2019,
    };

    vehicleRepositoryMock.create.mockResolvedValueOnce(
      new Vehicle(
        vehicleData.marca,
        vehicleData.modelo,
        vehicleData.año,
        "fleetId1"
      )
    );

    const result = await vehicleService.createVehicle(vehicleData);

    expect(FleetModel.findOne).toHaveBeenCalledWith({ nombre: "Espectacular" });
    expect(vehicleRepositoryMock.create).toHaveBeenCalled();
    expect(result.fleetId).toBe("fleetId1");
  });

  test('should assign "Pickup / Camioneta" fleet to eligible Toyota vehicles', async () => {
    (FleetModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: "fleetId2",
      nombre: "Pickup / Camioneta",
    });

    const vehicleData = {
      marca: "Toyota",
      modelo: "Hilux",
      año: 2016,
    };

    vehicleRepositoryMock.create.mockResolvedValueOnce(
      new Vehicle(
        vehicleData.marca,
        vehicleData.modelo,
        vehicleData.año,
        "fleetId2"
      )
    );

    const result = await vehicleService.createVehicle(vehicleData);

    expect(FleetModel.findOne).toHaveBeenCalledWith({
      nombre: "Pickup / Camioneta",
    });
    expect(vehicleRepositoryMock.create).toHaveBeenCalled();
    expect(result.fleetId).toBe("fleetId2");
  });

  test('should assign "Económico" fleet to vehicles that do not meet other criteria', async () => {
    (FleetModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: "fleetId3",
      nombre: "Económico",
    });

    const vehicleData = {
      marca: "Ford",
      modelo: "Fiesta",
      año: 2014,
    };

    vehicleRepositoryMock.create.mockResolvedValueOnce(
      new Vehicle(
        vehicleData.marca,
        vehicleData.modelo,
        vehicleData.año,
        "fleetId3"
      )
    );

    const result = await vehicleService.createVehicle(vehicleData);

    expect(FleetModel.findOne).toHaveBeenCalledWith({ nombre: "Económico" });
    expect(vehicleRepositoryMock.create).toHaveBeenCalled();
    expect(result.fleetId).toBe("fleetId3");
  });
});
