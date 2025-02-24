import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SncfService } from '../../services/sncf.service';

@Component({
  selector: 'app-resultats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultats.component.html'
})
export class ResultatsComponent {
  @Input() resultats: any;
  alertes: any;

  constructor(private sncfService: SncfService) {}

  fetchAlertes() {
    const ligneId = 'Ligne123';
    this.sncfService.getAlertesTrafic(ligneId).subscribe({
      next: (data) => {
        this.alertes = data;
        console.log('Alertes trafic', data);
      },
      error: (err) => console.error('Erreur lors de la récupération des alertes', err)
    });
  }
}
