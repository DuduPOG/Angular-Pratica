import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


interface ItemCrud {
  nome: string;
  descricao: string;
  foto: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, FloatLabelModule, InputTextModule, ButtonModule, CardModule],
  template: ` <main class="text-center m-auto">
    <h1 class="text-center"> {{ titulo }} </h1>

    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input #nomeInput id="nomeInput" pInputText class="on_label" [(ngModel)]="name" autocomplete="off" />
                <label for="on_label">Nome</label>
            </p-floatlabel>
        </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [(ngModel)]="textoescrito" autocomplete="off" />
                <label for="on_label">Descrição</label>
            </p-floatlabel>
    </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [(ngModel)]="foto" autocomplete="off" />
                <label for="on_label">Foto qualquer</label>
            </p-floatlabel>
    </div>
    <div class="card flex justify-center mt-4">
            <p-button label="Salvar" (onClick)="handleclick()" />
    </div>


    <div class="flex flex-wrap justify-center gap-6 mt-8">
      <p-card
        *ngFor="let item of listaObjetos; let i = index"
        [style]="{ width: '25rem', overflow: 'hidden' }"
      >
        <ng-template pTemplate="header">
          <img alt="Card" class="w-full" [src]="item.foto" />
        </ng-template>

        <ng-template pTemplate="title">
          {{ item.nome }}
        </ng-template>

        <ng-template pTemplate="subtitle">
          Descrição
        </ng-template>

        <p>
          {{ item.descricao }}
        </p>

        <ng-template pTemplate="footer">
          <div class="flex gap-4 mt-1">
            <p-button
              label="Editar"
              (onClick)="editar(i)"
              severity="secondary"
              class="w-full"
              [outlined]="true"
              styleClass="w-full"
              />
            <p-button
              label="Excluir"
              (onClick)="excluir(i)"
              class="w-full"
              styleClass="w-full"
            />
          </div>
        </ng-template>
      </p-card>
    </div>
    <router-outlet></router-outlet>
  </main>`,
  styleUrl: './app.css'
})

export class App {
  titulo = 'Projeto de CRUD';

  name = '';
  textoescrito = '';
  foto = '';
  imagemPadrao =
  'https://static.wikia.nocookie.net/naruto/images/4/43/Mangeky%C3%B4_Sharingan_Shisui.svg/revision/latest?cb=20140503184904&path-prefix=fr';

  editandoIndex: number | null = null;

  listaObjetos: ItemCrud[] = [];

  handleclick() {
    if (!this.name.trim() || !this.textoescrito.trim()) {
      return;
    }

    const objeto: ItemCrud = {
      nome: this.name,
      descricao: this.textoescrito,
      foto: this.foto || this.imagemPadrao
    };

    if (this.editandoIndex !== null) {
      this.listaObjetos[this.editandoIndex] = objeto;
      this.editandoIndex = null;
    } else {
      this.listaObjetos.push(objeto);
    }

    this.resetarInputs();
  }

  editar(index: number) {
    const item = this.listaObjetos[index];

    this.name = item.nome;
    this.textoescrito = item.descricao;
    this.foto = item.foto;

    this.editandoIndex = index;

    setTimeout(() => {
      const input = document.getElementById('nomeInput') as HTMLInputElement;
      input?.focus();
      input?.select();
    }, 0);
  }

  resetarInputs() {
    this.name = '';
    this.textoescrito = '';
    this.foto = '';
  }

  excluir(index: number) {
    this.listaObjetos.splice(index, 1);

    if (this.editandoIndex === index) {
      this.editandoIndex = null;
      this.resetarInputs();
    }
  }
}
