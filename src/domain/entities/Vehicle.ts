export class Vehicle {
  constructor(
    public marca: string,
    public modelo: string,
    public año: number,
    public id?: string
  ) {
    if (!marca || !modelo || !año) {
      throw new Error("Marca, modelo y año son obligatorios");
    }

    if (año < 1886 || año > new Date().getFullYear() + 1) {
      throw new Error("Año inválido para un vehículo");
    }
  }
}
