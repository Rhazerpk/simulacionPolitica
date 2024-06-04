import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlComponent } from './control/control.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simulacionPolitica';
}
