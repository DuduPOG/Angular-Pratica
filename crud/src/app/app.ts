import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, ButtonModule],
  template: `   <main class="main">
    <h1 class="text-center"> {{ title }} </h1>
    <input [(ngModel)] = "name"/>
    <p> Hello, {{ name }} </p>
    <p-button [disabled] = "isButtonDisabled" (onClick)="handleclick()"> Click Here </p-button>
    @if (isButtonDisabled) {
      <p>The button is disabled!</p>
    }
    @else {
      <p>The button is enabled!</p>
    }
    <router-outlet></router-outlet>
  </main>`,
  styleUrl: './app.css'
})

export class App {
  isButtonDisabled = false;
  protected readonly title = 'O Guardiorla vem aí';
  name = "Pedro";
  handleclick() {
    window.alert("Vasco é o maior que já existiu")
  }
}
