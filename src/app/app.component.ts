import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vimeo player';

  showError() {
    try {
      // Simulate a function that throws an error
      throw new Error('This is a test error');
    } catch (error) {
      // Capture the error with Sentry
      // Rethrow the error if necessary
      throw error;
    }
  }
}
