import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SncfService } from '../../services/sncf.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent {
  depart = '';
  arrivee = '';
  date = '';
  heure = '';
  resultats: any;

  constructor(private sncfService: SncfService) {}

  formatDatetime(date: string, time: string): string {
    return date.replace(/-/g, '') + 'T' + time.replace(/:/g, '') + '00';
  }

  onSubmit() {
    this.sncfService.getHoraires(this.depart, this.arrivee, this.date, this.heure)
      .subscribe({
        next: (data) => {
          this.resultats = data;
          console.log('Horaires reçus', data);
        },
        error: (err) => console.error('Erreur lors de l’appel à l’API', err)
      });
  }
}
