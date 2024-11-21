// import { Rol } from "./rol";

export interface Usuario {
  usuarioID?: string | number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  tipoDocumentoIdentidad: string;
  documentoIdentidad: string;
  nacionalidad: string;
  telefono: string;
  ocupacion: string;
  genero: string;
  direccion: string;
  email: string;
  password: string;
  estadoCivil: string;
  educacion: string;
  numeroDependientes: number;
  numeroHijos: number;
  discapacidad: string;
  nombreContactoEmergencia: string;
  telefonoContactoEmergencia: string;
  estadoSocio: string;
  fechaRegistro: Date;
  fechaModificacion: Date;
  rol: String;
}
