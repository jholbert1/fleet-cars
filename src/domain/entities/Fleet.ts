export class Fleet {
  constructor(public name: string, public id?: string) {
    if (!name) {
      throw new Error("name es requerido");
    }
  }
}
