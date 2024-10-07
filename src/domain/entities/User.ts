export class User {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public id?: string
  ) {
    if (!nombre || !email || !password) {
      throw new Error("Todos los campos son obligatorios");
    }
  }
}
