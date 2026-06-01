import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CrudService } from '../../services/crud.service';
import { CrudFormComponent } from '../../crud-form/crud-form.component';
import { ItemCrud, DEFAULT_ITEM_CRUD } from '../../models/item-crud.model';

@Component({
  selector: 'app-inclusao',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CrudFormComponent],
  template: `
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">Adicionar Novo Item</h1>
        <p class="text-center text-gray-600 mt-2">Preencha o formulário para criar um novo item</p>
      </div>

      <!-- Seção de Formulário -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <app-crud-form
          #crudForm
          [initialData]="DEFAULT_ITEM_CRUD"
          (formSubmitted)="handleFormSubmit($event)"
        />

        <div class="flex gap-4 mt-6">
          <p-button
            label="Salvar"
            icon="pi pi-check"
            (onClick)="submitForm()"
            class="flex-1"
          />
          <p-button
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            (onClick)="cancelar()"
            class="flex-1"
            [outlined]="true"
          />
        </div>
      </div>
    </main>
  `,
  styleUrl: './inclusao.component.css'
})
export class InclusaoComponent {
  DEFAULT_ITEM_CRUD = DEFAULT_ITEM_CRUD;

  @ViewChild('crudForm') crudForm!: CrudFormComponent;

  constructor(
    private router: Router,
    private crudService: CrudService
  ) {}

  handleFormSubmit(item: ItemCrud): void {
    this.crudService.addItem(item);
    this.router.navigate(['/listagem']);
  }

  submitForm(): void {
    if (this.crudForm) {
      this.crudForm.submit();
    }
  }

  cancelar(): void {
    this.router.navigate(['/listagem']);
  }
}
