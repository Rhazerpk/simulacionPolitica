// src/app/components/control/control.component.ts
import { Component, OnDestroy } from '@angular/core';
import { ContiendaCivil } from '../interfaces/ContiendaCivil.model';
import { Gobierno } from '../interfaces/Gobierno.model';
import { Partido } from '../interfaces/Partido.model';
import { Politica } from '../interfaces/Politica.model';
import { Pueblo } from '../interfaces/Pueblo.model';
import { ControlService } from '../services/control.service';
import { CommonModule } from '@angular/common';
import { GobiernoComponent } from '../gobierno/gobierno.component';
import { PuebloComponent } from '../pueblo/pueblo.component';


@Component({
  selector: 'app-control',
  standalone: true,
  imports: [CommonModule, GobiernoComponent, PuebloComponent],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnDestroy {
  gobierno!: Gobierno;
  pueblo!: Pueblo;
  numProtestas: number = 0;
  cambiosPolitica: number = 0;
  cambiosGobierno: number = 0;
  simulacionInterval: any;
  simulacionEnCurso: boolean = false;

  constructor(private controlService: ControlService) {
    this.reset();
  }

  reset(): void {
    const estadoInicial = this.controlService.inicializarEstado();
    this.gobierno = estadoInicial.gobierno;
    this.pueblo = estadoInicial.pueblo;
    this.numProtestas = 0;
    this.cambiosPolitica = 0;
    this.cambiosGobierno = 0;
  }

  iniciarSimulacion(): void {
    if (this.simulacionEnCurso) {
      return;
    }
    this.simulacionEnCurso = true;
    this.simulacionInterval = setInterval(() => {
      this.controlService.actualizarEstado(this.gobierno, this.pueblo);
      this.actualizarEstadisticas();
    }, 1000);
  }

  actualizarEstadisticas(): void {
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

  detenerSimulacion(): void {
    if (this.simulacionInterval) {
      clearInterval(this.simulacionInterval);
      this.simulacionInterval = null;
      this.simulacionEnCurso = false;
    }
  }

  ngOnDestroy(): void {
    this.detenerSimulacion();
  }
}
