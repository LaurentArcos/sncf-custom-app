import { Component } from '@angular/core';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ResultatsComponent } from './components/resultats/resultats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchFormComponent, ResultatsComponent],
  // providers: [provideHttpClient()],  <-- Retirez cette ligne
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sncf-custom-app';
}
