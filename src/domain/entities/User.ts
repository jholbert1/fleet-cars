export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: string
  ) {
    if (!name || !email || !password) {
      throw new Error("Todos los campos son obligatorios");
    }
  }
}
