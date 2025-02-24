import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, {
  ...config,
  providers: [
    ...(config.providers || []),
    provideHttpClient()
  ]
});

export default bootstrap;
