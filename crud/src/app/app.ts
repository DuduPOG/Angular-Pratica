import { Component, signal, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

import { CrudService } from './services/crud.service';
import { CrudFormComponent } from './crud-form/crud-form.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { CrudDetailComponent } from './crud-detail/crud-detail.component';
import { ItemCrud, DEFAULT_ITEM_CRUD } from './models/item-crud.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    CrudFormComponent,
    CrudTableComponent,
    CrudDetailComponent
  ],
  template: `
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">{{ titulo }}</h1>
        <p class="text-center text-gray-600 mt-2">Gerencie seus itens CRUD com facilidade</p>
      </div>

      <!-- Seção de Formulário -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          {{ crudService.getEditingIndex() !== null ? 'Editando Item' : 'Adicionar Novo Item' }}
        </h2>

        <app-crud-form
          #crudForm
          [initialData]="editingItem()"
          (formSubmitted)="handleFormSubmit($event)"
        />

        <div class="flex gap-4 mt-6">
          <p-button
            label="Salvar"
            icon="pi pi-check"
            (onClick)="submitForm()"
            [disabled]="isSaveDisabled()"
            class="flex-1"
          />
          <p-button
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            (onClick)="resetForm()"
            class="flex-1"
            [outlined]="true"
          />
        </div>
      </div>

      <!-- Seção de Tabela -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Lista de Itens</h2>
        @let items = crudService.items$();
        <app-crud-table
          [items]="items"
          (onEdit)="handleEdit($event)"
          (onDelete)="handleDelete($event)"
          (onDetail)="handleDetail($event)"
        />
      </div>

      <!-- Modal de Detalhes -->
      @let selectedItem = crudService.selectedItem$();
      @if (selectedItem) {
        <app-crud-detail
          [item]="selectedItem"
          (onClose)="handleDetailClose()"
        />
      }

      <!-- Outlet para roteamento -->
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.css'
})

export class App {
  titulo = 'Projeto de CRUD - Angular 21 + PrimeNG 21 + Tailwind';

  @ViewChild('crudForm') crudForm!: CrudFormComponent;

  editingItem = signal<ItemCrud>(DEFAULT_ITEM_CRUD);
  isSaveDisabled = signal(false);

  constructor(public crudService: CrudService) {
    // Efeito para carregar item em edição
    effect(() => {
      const editIndex = this.crudService.getEditingIndex();
      if (editIndex !== null) {
        const item = this.crudService.getItemByIndex(editIndex);
        if (item) {
          this.editingItem.set(item);
        }
      } else {
        this.editingItem.set(DEFAULT_ITEM_CRUD);
      }
    });
  }

  handleFormSubmit(item: ItemCrud): void {
    this.crudService.addItem(item);
    this.resetForm();
  }

  submitForm(): void {
    if (this.crudForm) {
      this.crudForm.submit();
    }
  }

  resetForm(): void {
    this.crudService.setEditingItem(null);
    this.editingItem.set(DEFAULT_ITEM_CRUD);
    if (this.crudForm) {
      this.crudForm.reset();
    }
  }

  handleEdit(index: number): void {
    this.crudService.setEditingItem(index);
    setTimeout(() => {
      const input = document.getElementById('nomeInput') as HTMLInputElement;
      input?.focus();
      input?.select();
    }, 0);
  }

  handleDelete(index: number): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.crudService.deleteItem(index);
    }
  }

  handleDetail(item: ItemCrud): void {
    this.crudService.selectItem(item);
  }

  handleDetailClose(): void {
    this.crudService.selectItem(null);
  }
}
