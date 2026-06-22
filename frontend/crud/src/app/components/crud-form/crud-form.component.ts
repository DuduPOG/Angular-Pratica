import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { ItemCrud, DEFAULT_ITEM_CRUD } from '../../models/item-crud.model';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    CheckboxModule,
    InputNumberModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Campo Nome -->
      <div class="flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on" class="w-full max-w-lg">
          <input
            id="nomeInput"
            type="text"
            pInputText
            class="w-full"
            [(ngModel)]="formData().nome"
            autocomplete="off"
          />
          <label for="nomeInput">Nome</label>
        </p-floatlabel>
        @if (validation()['nome']) {
          <p class="w-full max-w-lg text-red-500 text-sm -mt-2">
            {{ validation()['nome'] }}
          </p>
        }
      </div>

      <!-- Campo Descrição -->
      <div class="flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on" class="w-full max-w-lg">
          <input
            id="descricaoInput"
            type="text"
            pInputText
            class="w-full"
            [(ngModel)]="formData().descricao"
            autocomplete="off"
          />
          <label for="descricaoInput">Descrição</label>
        </p-floatlabel>
        @if (validation()['descricao']) {
          <p class="w-full max-w-lg text-red-500 text-sm -mt-2">
            {{ validation()['descricao'] }}
          </p>
        }
      </div>

      <!-- Campo Foto (URL) -->
      <div class="flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on" class="w-full max-w-lg">
          <input
            id="fotoInput"
            type="text"
            pInputText
            class="w-full"
            [(ngModel)]="formData().foto"
            autocomplete="off"
          />
          <label for="fotoInput">Foto (URL)</label>
        </p-floatlabel>
      </div>

      <!-- Campo Nota -->
      <div class="flex flex-wrap justify-center items-end gap-4 mt-4">
        <p-floatlabel variant="on" class="w-full max-w-lg">
          <p-inputnumber
            id="notaInput"
            class="w-full"
            [(ngModel)]="formData().nota"
            [min]="0"
            [max]="10"
            [maxFractionDigits]="1"
            inputId="notaInput"
          />
          <label for="notaInput">Nota para seu CRUD (0–10)</label>
        </p-floatlabel>
        @if (validation()['nota']) {
          <p class="w-full max-w-lg text-red-500 text-sm -mt-2">
            {{ validation()['nota'] }}
          </p>
        }
      </div>

      <!-- Checkbox Trabalhoso -->
      <div class="flex justify-center items-center gap-4 mt-4">
        <label for="trabalhoCheckbox" class="font-semibold text-gray-700 cursor-pointer">
          Foi trabalhoso fazer esse CRUD?
        </label>
        <p-checkbox
          id="trabalhoCheckbox"
          [(ngModel)]="formData().trabalho"
          [binary]="true"
        />
      </div>
    </div>
  `,
})
export class CrudFormComponent {
  initialData = input<ItemCrud>(DEFAULT_ITEM_CRUD);
  formSubmitted = output<ItemCrud>();

  formData = signal<ItemCrud>({ ...DEFAULT_ITEM_CRUD });
  validation = signal<Record<string, string>>({});

  constructor() {
    // Sincroniza formData sempre que initialData mudar (funciona para edição e inclusão)
    effect(() => {
      const initial = this.initialData();
      this.formData.set({ ...initial });
      this.validation.set({});
    });
  }

  validateForm(): boolean {
    const errors: Record<string, string> = {};
    const data = this.formData();

    if (!data.nome?.trim()) {
      errors['nome'] = 'Nome é obrigatório';
    }

    if (!data.descricao?.trim()) {
      errors['descricao'] = 'Descrição é obrigatória';
    }

    if (data.nota === null || data.nota === undefined || isNaN(Number(data.nota))) {
      errors['nota'] = 'Nota é obrigatória';
    } else if (data.nota < 0 || data.nota > 10) {
      errors['nota'] = 'Nota deve estar entre 0 e 10';
    }

    this.validation.set(errors);
    return Object.keys(errors).length === 0;
  }

  submit(): void {
    if (this.validateForm()) {
      this.formSubmitted.emit({ ...this.formData() });
    }
  }

  reset(): void {
    this.formData.set({ ...DEFAULT_ITEM_CRUD });
    this.validation.set({});
  }
}
