import { Component } from '@angular/core';

@Component({
  selector: 'app-rules',
  standalone: true,
  template: `<div class="info">
    <h2>Spielregeln</h2>
    <p>- Rote Felder sind negativ, gr&uuml;ne positiv.</p>
    <p>- Der Spieler spielt gegen einen Computer, der einen virtuellen Spieler darstellt.</p>
    <p>- Beide w&auml;hlen abwechselnd ein Feld, das zu der aktuellen Punktzahl addiert wird.</p>
    <p>- Der beginnende Spieler wird durch Zufall bestimmt. Er kann das erste Feld aus dem kompletten Spielbrett ausw&auml;hlen und entscheidet somit den Startpunkt.</p>
    <p>- Der zweite Spieler hat von diesem Feld ausgehend alle waagerechten und senkrechten Felder zur Auswahl. Er entscheidet mit seinem n&auml;chsten Zug seine Ausrichtung. Die andere bekommt der Gegner.</p>
    <p>- Ab dem 3. Zug kann der jeweilige Spieler die Felder nur in seiner Ausrichtung (waagerecht oder senkrecht) nehmen.</p>
    <p>- Die Reihe/Spalte wird entschieden durch den vorausgehenden Zug.</p>
    <p>- Der Gewinner ist derjenige mit der h&ouml;chsten Punktzahl am Ende.</p>
    <p>- Achtung! Es kann passieren, dass ein Spiel endet, weil der n&auml;chste Spieler kein Feld mehr in seiner Richtung zur Auswahl hat. Auch hier ist die h&ouml;chste Punktzahl f&uuml;r den Sieg entscheidend.</p>
    <p>F&uuml;r ein neues Spiel F5 dr&uuml;cken.</p>
    <p>Dir gef&auml;llt das Spiel? Du willst mehr? Du hast Verbesserungsvorschl&auml;ge? Schreib mir eine <a href="mailto:info@alax.de">E-Mail</a>.</p>
  </div>`,
  styles: [`
    :host {
      display: block;
    }
    .info {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
      line-height: 1.6;
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: #333;
    }
    p {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      text-indent: -1rem;
    }
    a {
      color: #1976d2;
      text-decoration: none;
      font-weight: bold;
    }
    a:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  `]
})
export class RulesComponent {}
