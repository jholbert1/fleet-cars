export class Fleet {
  constructor(public nombre: string, public id?: string) {
    if (!nombre) {
      throw new Error("nombre es requerido");
    }
  }
}
