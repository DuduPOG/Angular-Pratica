import { Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {form, FormField, required} from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { CrudForm } from './crud-form/crud-form';

export interface ItemCrud {
  nome: string;
  descricao: string;
  imagemPadrao: string;
  foto: string;
  trabalho: boolean;
  nota: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, FloatLabelModule, InputTextModule, ButtonModule, CardModule, Checkbox, FormField, CrudForm],
  template: ` <main class="text-center m-auto">
    <h1 class="text-center"> {{ titulo }} </h1>

  <form (submit)="handleclick($event)">
    <app-crud-form [crudForm]="crudForm" ></app-crud-form>
    <div class="card flex justify-center mt-4">
      <p-button type="submit" [disabled]="crudForm().invalid()" label="Salvar" (onClick)="handleclick($event)" />
    </div>
  </form>
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

        <p>
          Foi trabalhoso fazer esse crud?
        </p>

        <p>
          {{ item.trabalho }}
        </p>

        <p>
          Nota do seu crud:
        </p>

        <p>
          {{ item.nota }}
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

  crudModel = signal<ItemCrud>({
    nome: '',
    descricao: '',
    imagemPadrao: 'https://static.wikia.nocookie.net/naruto/images/4/43/Mangeky%C3%B4_Sharingan_Shisui.svg/revision/latest?cb=20140503184904&path-prefix=fr',
    foto: '',
    trabalho: false,
    nota: '0'
  });

  crudForm = form(this.crudModel, (schemaPath) => {
    required(schemaPath.nome, {message: 'Nome deve ser preenchido'});
    required(schemaPath.descricao, {message: 'Descrição deve ser preenchida'});
    required(schemaPath.nota, {message: 'Nota deve ser preenchida'});
  });

  editandoIndex: number | null = null;

  listaObjetos: ItemCrud[] = [];

  handleclick(e: Event) {
    e.preventDefault();
    if (!this.crudForm.nome().value().trim() || !this.crudForm.descricao().value().trim()) {
      return;
    }
    const objeto: ItemCrud = {
      nome: this.crudForm.nome().value(),
      descricao: this.crudForm.descricao().value(),
      imagemPadrao: 'https://static.wikia.nocookie.net/naruto/images/4/43/Mangeky%C3%B4_Sharingan_Shisui.svg/revision/latest?cb=20140503184904&path-prefix=fr',
      foto: this.crudForm.foto().value() || this.crudForm.imagemPadrao().value(),
      trabalho: this.crudForm.trabalho().value(),
      nota: this.crudForm.nota().value()
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
    this.crudModel.set({
      nome: item.nome,
      descricao: item.descricao,
      imagemPadrao: item.imagemPadrao,
      foto: item.foto,
      trabalho: item.trabalho,
      nota: item.nota
    });

    this.editandoIndex = index;

    setTimeout(() => {
      const input = document.getElementById('nomeInput') as HTMLInputElement;
      input?.focus();
      input?.select();
    }, 0);
  }

  resetarInputs() {
    this.crudModel.set({
      nome: '',
      descricao: '',
      imagemPadrao: 'https://static.wikia.nocookie.net/naruto/images/4/43/Mangeky%C3%B4_Sharingan_Shisui.svg/revision/latest?cb=20140503184904&path-prefix=fr',
      foto: '',
      trabalho: false,
      nota: ''
    });
  }

  excluir(index: number) {
    this.listaObjetos.splice(index, 1);

    if (this.editandoIndex === index) {
      this.editandoIndex = null;
      this.resetarInputs();
    }
  }
}
