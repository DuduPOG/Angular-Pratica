import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, FloatLabelModule, InputTextModule, ButtonModule, CardModule],
  template: ` <main class="text-center m-auto">
    <h1 class="text-center"> {{ titulo }} </h1>
    
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
            
            <p-floatlabel variant="on">
                <input pInputText id="on_label" [(ngModel)]="name" autocomplete="off" />
                <label for="on_label">Nome da Lenda</label>
            </p-floatlabel>
        </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
            
            <p-floatlabel variant="on">
                <input pInputText id="on_labell" [(ngModel)]="textoescrito" autocomplete="off" />
                <label for="on_labell">Texto da Lenda</label>
            </p-floatlabel>
    </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
            
            <p-floatlabel variant="on">
                <input pInputText id="on_labell" [(ngModel)]="foto" autocomplete="off" />
                <label for="on_labell">Foto da Lenda</label>
            </p-floatlabel>
    </div>
    <div class="card flex justify-center mt-4">
            <p-button label="Clica aí" (onClick)="handleclick()" />
    </div>
    

    <div class="mb-4 p-8 flex items-center justify-center">
        <p-card [style]="{ width: '25rem', overflow: 'hidden' }">
          <ng-template pTemplate="header">
            <img alt="Card" class="w-full" [src]="cardPhoto" />
          </ng-template>
          <ng-template pTemplate="title">
            {{ title }}
          </ng-template>
          <ng-template pTemplate="subtitle"> Notícias do dia </ng-template>
          <p>
            {{ cardText }}
          </p>
          <ng-template pTemplate="footer">
            <div class="flex gap-4 mt-1">
              <p-button label="Cancel" severity="secondary" class="w-full" [outlined]="true" styleClass="w-full" />
              <p-button label="Save" class="w-full" styleClass="w-full" />
            </div>
          </ng-template>
        </p-card>
      </div>
    <router-outlet></router-outlet>
  </main>`,
  styleUrl: './app.css'
})
export class App {
  isButtonDisabled = false;
  titulo = 'Lendas Urbanas';
  title = '';
  name = '';
  textoescrito = '';
  foto = '';
  cardText = '';
  cardPhoto = 'https://primefaces.org/cdn/primeng/images/card-ng.jpg';
  handleclick() {
    this.titulo = this.name;
    this.title = this.name;
    this.cardText = this.textoescrito;
    this.cardPhoto = this.foto || this.cardPhoto;
  }
}
