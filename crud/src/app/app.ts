import { Component, ViewChild, ElementRef, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {form, FormField, minLength, required} from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule, Checkbox } from 'primeng/checkbox';


interface ItemCrud {
  nome: string;
  descricao: string;
  imagemPadrao: string;
  foto: string;
  trabalho: boolean;
  nota: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, FloatLabelModule, InputTextModule, ButtonModule, CardModule, Checkbox, FormField],
  template: ` <main class="text-center m-auto">
    <h1 class="text-center"> {{ titulo }} </h1>

    <form (submit)="handleclick($event)">
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input #nomeInput id="nomeInput" type="InputTextModule" pInputText class="on_label" [formField]="crudForm.nome" autocomplete="off" />
                <label for="on_label">Nome</label>
                    @if (crudForm.nome().invalid()) {
                      <p class="error">O campo "nome" tem erros de validação:</p>
                      <ul>
                        @for (error of crudForm.nome().errors(); track error) {
                          <li>{{ error.message }}</li>
                        }
                      </ul>
                    }
            </p-floatlabel>
    </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [formField]="crudForm.descricao" autocomplete="off" />
                <label for="on_label">Descrição</label>
                @if (crudForm.descricao().invalid()) {
                  <p class="error">O campo "descrição" tem erros de validação:</p>
                  <ul>
                    @for (error of crudForm.nome().errors(); track error) {
                      <li>{{ error.message }}</li>
                    }
                  </ul>
                }
            </p-floatlabel>
    </div>

    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [formField]="crudForm.foto" autocomplete="off" />
                <label for="on_label">Foto qualquer</label>
            </p-floatlabel>
    </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
      <div class="card flex justify-center gap-4">
        <p>Foi trabalhoso fazer esse crud? </p>
        <p-checkbox [formField]="crudForm.trabalho" [binary]="true" />
      </div>
  </div>
  <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [formField]="crudForm.nota" autocomplete="off" />
                <label for="on_label">Nota para seu crud</label>
                @if (crudForm.nome().invalid()) {
                  <p class="error">O campo "nota" tem erros de validação:</p>
                  <ul>
                    @for (error of crudForm.nota().errors(); track error) {
                      <li>{{ error.message }}</li>
                    }
                  </ul>
                }
            </p-floatlabel>
    </div>
    <div class="card flex justify-center mt-4">
      <p-button type="submit" [disabled]="!isFormValid()" label="Salvar" (onClick)="handleclick($event)" />
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

  isFormValid = computed(() =>
    !this.crudForm.nome().invalid() &&
    !this.crudForm.descricao().invalid() &&
    !this.crudForm.nota().invalid()
  );

  editandoIndex: number | null = null;

  listaObjetos: ItemCrud[] = [];

  handleclick(e: Event) {
    e.preventDefault();
    if (!this.crudForm.nome().value().trim() || !this.crudForm.descricao().value().trim()) {
      return;
    }
    if (!this.isFormValid()) {
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
