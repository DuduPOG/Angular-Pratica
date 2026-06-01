import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CrudService } from '../../services/crud.service';
import { CrudTableComponent } from '../../crud-table/crud-table.component';
import { ItemCrud } from '../../models/item-crud.model';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CrudTableComponent],
  template: `
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">{{ titulo }}</h1>
      </div>

      <!-- Botão para incluir novo item -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <p-button
          label="Novo Item"
          icon="pi pi-plus"
          (onClick)="incluirNovoItem()"
          class="w-full"
        />
      </div>

      <!-- Seção de Tabela -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Lista de Itens</h2>
        <app-crud-table
          [items]="crudService.items$()"
          (onEdit)="handleEdit($event)"
          (onDelete)="handleDelete($event)"
          (onDetail)="handleDetail($event)"
        />
      </div>
    </main>
  `,
  styleUrl: './listagem.component.css'
})
export class ListagemComponent {
  titulo = 'CRUD';

  constructor(
    public crudService: CrudService,
    private router: Router
  ) {}

  incluirNovoItem(): void {
    this.router.navigate(['/incluir']);
  }

  handleEdit(index: number): void {
    this.router.navigate(['/atualizar', index]);
  }

  handleDelete(index: number): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.crudService.deleteItem(index);
    }
  }

  handleDetail(item: ItemCrud): void {
    const index = this.crudService.items$().indexOf(item);
    if (index !== -1) {
      this.router.navigate(['/detalhe', index]);
    }
  }
}
