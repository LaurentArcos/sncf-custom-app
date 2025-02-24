import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SncfService {
  // Utilisation de l'URL directe (ou via proxy si vous le souhaitez)
  private apiUrl = 'http://localhost:3000/api';
  private apiKey = environment.sncfApiKey;

  constructor(private http: HttpClient) { }

  private formatDatetime(date: string, time: string): string {
    const formattedDate = date.replace(/-/g, '');
    const formattedTime = time.replace(/:/g, '') + '00'; // Ajoute "00" pour les secondes
    return `${formattedDate}T${formattedTime}`;
  }

  getHoraires(depart: string, arrivee: string, date: string, time: string): Observable<any> {
    const datetime = this.formatDatetime(date, time);
    const params = { from: depart, to: arrivee, datetime: datetime };

    const credentials = btoa(`${this.apiKey}:`);

    return this.http.get<any>(`${this.apiUrl}/journeys`, {
      params,
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });
  }

  getAlertesTrafic(ligneId: string): Observable<any> {
    const credentials = btoa(`${this.apiKey}:`);
    return this.http.get<any>(`${this.apiUrl}/lines/${ligneId}/alerts`, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });
  }
}
