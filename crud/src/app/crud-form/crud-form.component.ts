import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ItemCrud, DEFAULT_ITEM_CRUD } from '../models/item-crud.model';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    CheckboxModule
  ],
  template: `
    <div class="space-y-4">
      <!-- Campo Nome -->
      <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on">
          <input
            #nomeInput
            id="nomeInput"
            type="text"
            pInputText
            class="on_label w-full"
            [(ngModel)]="formData().nome"
            autocomplete="off"
          />
          <label for="nomeInput">Nome</label>
          @if (validation()['nome']) {
            <p class="error text-red-500 text-sm mt-1">{{ validation()['nome'] }}</p>
          }
        </p-floatlabel>
      </div>

      <!-- Campo Descrição -->
      <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on">
          <input
            id="descricaoInput"
            type="text"
            pInputText
            class="on_label w-full"
            [(ngModel)]="formData().descricao"
            autocomplete="off"
          />
          <label for="descricaoInput">Descrição</label>
          @if (validation()['descricao']) {
            <p class="error text-red-500 text-sm mt-1">{{ validation()['descricao'] }}</p>
          }
        </p-floatlabel>
      </div>

      <!-- Campo Foto -->
      <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on">
          <input
            id="fotoInput"
            type="text"
            pInputText
            class="on_label w-full"
            [(ngModel)]="formData().foto"
            autocomplete="off"
            placeholder="URL da foto"
          />
          <label for="fotoInput">Foto (URL)</label>
        </p-floatlabel>
      </div>

      <!-- Campo Checkbox - Trabalho -->
      <div class="card flex justify-center items-center gap-4 mt-4">
        <label for="trabalhoCheckbox" class="font-semibold">
          Foi trabalhoso fazer esse CRUD?
        </label>
        <p-checkbox
          id="trabalhoCheckbox"
          [(ngModel)]="formData().trabalho"
          [binary]="true"
        />
      </div>

      <!-- Campo Nota -->
      <div class="card flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on">
          <input
            id="notaInput"
            type="number"
            pInputText
            class="on_label w-full"
            [(ngModel)]="formData().nota"
            autocomplete="off"
            min="0"
            max="10"
          />
          <label for="notaInput">Nota para seu CRUD (0-10)</label>
          @if (validation()['nota']) {
            <p class="error text-red-500 text-sm mt-1">{{ validation()['nota'] }}</p>
          }
        </p-floatlabel>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .error {
        display: block;
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
    }
  `]
})
export class CrudFormComponent {
  initialData = input<ItemCrud>(DEFAULT_ITEM_CRUD);
  formSubmitted = output<ItemCrud>();

  formData = signal<ItemCrud>({ ...DEFAULT_ITEM_CRUD });
  validation = signal<Record<string, string>>({});

  constructor() {
    // Sincronizar dados iniciais quando o input mudar
    this.syncInitialData();
  }

  private syncInitialData(): void {
    const initial = this.initialData();
    if (initial && initial.nome) {
      this.formData.set(initial);
    }
  }

  validateForm(): boolean {
    const errors: Record<string, string> = {};
    const data = this.formData();

    if (!data.nome || !data.nome.trim()) {
      errors['nome'] = 'Nome é obrigatório';
    }

    if (!data.descricao || !data.descricao.trim()) {
      errors['descricao'] = 'Descrição é obrigatória';
    }

    if (!data.nota || data.nota === '') {
      errors['nota'] = 'Nota é obrigatória';
    }

    this.validation.set(errors);
    return Object.keys(errors).length === 0;
  }

  submit(): void {
    if (this.validateForm()) {
      this.formSubmitted.emit(this.formData());
    }
  }

  reset(): void {
    this.formData.set({ ...DEFAULT_ITEM_CRUD });
    this.validation.set({});
  }

  setFormData(data: ItemCrud): void {
    this.formData.set(data);
    this.validation.set({});
  }
}
