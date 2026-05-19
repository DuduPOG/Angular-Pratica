import { FieldTree, form, FormField, required } from '@angular/forms/signals';
import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule, Checkbox } from 'primeng/checkbox';
import { ItemCrud } from '../app';

@Component({
  selector: 'app-crud-form',
  imports: [
    FormField,
    CardModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    Checkbox,
    FloatLabelModule,
    ButtonModule
  ],
  template: `
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input #nomeInput id="nomeInput" type="InputTextModule" pInputText class="on_label" [formField]="crudForm().nome" autocomplete="off" />
                <label for="on_label">Nome</label>
                    @if (crudForm().nome().invalid()) {
                      <p class="error">O campo "nome" tem erros de validação:</p>
                      <ul>
                        @for (error of crudForm().nome().errors(); track error) {
                          <li>{{ error.message }}</li>
                        }
                      </ul>
                    }
            </p-floatlabel>
    </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [formField]="crudForm().descricao" autocomplete="off" />
                <label for="on_label">Descrição</label>
                @if (crudForm().descricao().invalid()) {
                  <p class="error">O campo "descrição" tem erros de validação:</p>
                  <ul>
                    @for (error of crudForm().descricao().errors(); track error) {
                      <li>{{ error.message }}</li>
                    }
                  </ul>
                }
            </p-floatlabel>
    </div>

    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [formField]="crudForm().foto" autocomplete="off" />
                <label for="on_label">Foto qualquer</label>
            </p-floatlabel>
    </div>
    <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
      <div class="card flex justify-center gap-4">
        <p>Foi trabalhoso fazer esse crud? </p>
        <p-checkbox [formField]="crudForm().trabalho" [binary]="true" />
      </div>
  </div>
  <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">

            <p-floatlabel variant="on">
                <input pInputText class="on_label" [formField]="crudForm().nota" autocomplete="off" />
                <label for="on_label">Nota para seu crud</label>
                @if (crudForm().nota().invalid()) {
                  <p class="error">O campo "nota" tem erros de validação:</p>
                  <ul>
                    @for (error of crudForm().nota().errors(); track error) {
                      <li>{{ error.message }}</li>
                    }
                  </ul>
                }
            </p-floatlabel>
    </div>
  `,
  styleUrl: './crud-form.css',
})
export class CrudForm {
  crudForm = input.required<FieldTree<ItemCrud>>();
}
