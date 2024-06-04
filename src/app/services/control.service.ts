import { Injectable } from '@angular/core';
import { Partido } from '../interfaces/Partido.model';
import { Pueblo } from "../interfaces/Pueblo.model";
import { ContiendaCivil } from "../interfaces/ContiendaCivil.model";
import { Gobierno } from "../interfaces/Gobierno.model";
import { Politica } from "../interfaces/Politica.model";

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  constructor() {}

  actualizarEstado(gobierno: Gobierno, pueblo: Pueblo) {
    if (gobierno.politica === Politica.COERCITIVA) {
      pueblo.contiendaCivil = ContiendaCivil.ALTA;
    } else {
      pueblo.contiendaCivil = ContiendaCivil.BAJA;
    }

    if (pueblo.contiendaCivil === ContiendaCivil.ALTA) {
      if (gobierno.partido === Partido.LIBERAL) {
        gobierno.politica = Politica.PERMISIVA;
      }
    } else if (gobierno.partido === Partido.LIBERAL) {
      gobierno.politica = Politica.COERCITIVA;
    }
  }
}
