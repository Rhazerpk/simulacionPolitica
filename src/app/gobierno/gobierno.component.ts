import { Component, Input } from '@angular/core';
import { Gobierno } from "../interfaces/Gobierno.model";

@Component({
  selector: 'app-gobierno',
  standalone: true,
  imports: [],
  templateUrl: './gobierno.component.html',
  styleUrl: './gobierno.component.css'
})
export class GobiernoComponent{
    @Input() gobierno!: Gobierno;
}
