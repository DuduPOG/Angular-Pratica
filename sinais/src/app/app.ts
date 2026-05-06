import { Component, signal } from "@angular/core";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: "app-root",
  imports: [ButtonModule],
  template: `
    <p>Current count: {{ count() }}</p>
    <div class="card flex justify-center mt-4">
      <p-button  label="Increment" (onClick)="increment()" />
    </div>  
     <div class="card flex justify-center mt-4">
      <p-button label="Reset" (onClick)="reset()" />
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  // Create a writable signal with an initial value of 0
  count = signal(0);

  increment() {
    // Update the signal value based on its previous value
    this.count.update((value) => value + 1);
  }

  reset() {
    // Set the signal to a specific value
    this.count.set(0);
  }
}