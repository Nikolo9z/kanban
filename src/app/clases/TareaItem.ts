export class ItemTarea {
    nombre: string;
    encargado: string;
    fechaInicio:Date;
    fechaTermino:Date;
  
    constructor(nombre: string, encargado: string,fechaInicio:Date,fechaTermino:Date) {
      this.nombre = nombre;
      this.encargado = encargado;
      this.fechaInicio=fechaInicio!;
      this.fechaTermino=fechaTermino!;
    }
  }