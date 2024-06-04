import { Component, Input } from '@angular/core';
import { Pueblo } from "../interfaces/Pueblo.model";

@Component({
  selector: 'app-pueblo',
  standalone: true,
  templateUrl: './pueblo.component.html',
  styleUrls: ['./pueblo.component.css']
})
export class PuebloComponent {
  @Input() pueblo!: Pueblo;
}
