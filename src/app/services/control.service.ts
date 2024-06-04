import { Injectable } from '@angular/core';
import { ContiendaCivil } from '../interfaces/ContiendaCivil.model';
import { Gobierno } from '../interfaces/Gobierno.model';
import { Partido } from '../interfaces/Partido.model';
import { Politica } from '../interfaces/Politica.model';
import { Pueblo } from '../interfaces/Pueblo.model';


@Injectable({
  providedIn: 'root'
})
export class ControlService {
  constructor() {}

  inicializarEstado(): { gobierno: Gobierno, pueblo: Pueblo } {
    const partido = Math.random() > 0.5 ? Partido.CONSERVADOR : Partido.LIBERAL;
    const politica = partido === Partido.CONSERVADOR ? Politica.COERCITIVA : Politica.PERMISIVA;
    const gobierno = new Gobierno(partido, politica);
    const pueblo = new Pueblo(ContiendaCivil.BAJA);
    return { gobierno, pueblo };
  }

  actualizarEstado(gobierno: Gobierno, pueblo: Pueblo): void {
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
