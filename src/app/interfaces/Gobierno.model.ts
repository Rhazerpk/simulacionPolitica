import { Politica } from "./Politica.model";
import { Partido } from "./Partido.model";


export class Gobierno {
  constructor(
    public partido: Partido,
    public politica: Politica
  ) { }
}
