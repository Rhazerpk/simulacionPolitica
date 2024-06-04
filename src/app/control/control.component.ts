// src/app/components/control/control.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobiernoComponent } from '../gobierno/gobierno.component';
import { PuebloComponent } from '../pueblo/pueblo.component';
import { Partido } from '../interfaces/Partido.model';
import { Pueblo } from "../interfaces/Pueblo.model";
import { ContiendaCivil } from "../interfaces/ContiendaCivil.model";
import { Gobierno } from "../interfaces/Gobierno.model";
import { Politica } from "../interfaces/Politica.model";
import { ControlService } from '../services/control.service';


@Component({
  selector: 'app-control',
  standalone: true,
  imports: [CommonModule, GobiernoComponent, PuebloComponent],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnDestroy {
  gobierno: Gobierno = new Gobierno(Partido.CONSERVADOR, Politica.COERCITIVA);
  pueblo: Pueblo = new Pueblo(ContiendaCivil.BAJA);
  numProtestas: number = 0;
  cambiosPolitica: number = 0;
  cambiosGobierno: number = 0;
  simulacionInterval: any;

  constructor(private controlService: ControlService) {}

  iniciarSimulacion() {
    this.simulacionInterval = setInterval(() => {
      this.controlService.actualizarEstado(this.gobierno, this.pueblo);
      this.actualizarEstadisticas();
    }, 10);
  }

  actualizarEstadisticas() {
    if (this.pueblo.contiendaCivil === ContiendaCivil.ALTA) {
      this.numProtestas++;
    }
    if (this.gobierno.politica === Politica.PERMISIVA) {
      this.cambiosPolitica++;
    }
    if (this.pueblo.contiendaCivil === ContiendaCivil.ALTA && this.gobierno.partido !== Partido.CONSERVADOR) {
      this.gobierno.partido = this.gobierno.partido === Partido.LIBERAL ? Partido.CONSERVADOR : Partido.LIBERAL;
      this.cambiosGobierno++;
    }
  }

  detenerSimulacion() {
    if (this.simulacionInterval) {
      clearInterval(this.simulacionInterval);
      this.simulacionInterval = null;
    }
  }

  ngOnDestroy() {
    this.detenerSimulacion();
  }
}
