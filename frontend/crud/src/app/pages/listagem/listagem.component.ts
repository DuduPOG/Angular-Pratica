import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CrudTableComponent } from '../../components/crud-table/crud-table.component';
import { ItemCrudListService } from '../../services/item-crud-list.service';
import { ItemCrudRemoveService } from '../../services/item-crud-remove.service';
import { AuthService } from '../../auth/auth.service';
import { ItemCrud } from '../../models/item-crud.model';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [ButtonModule, ProgressSpinnerModule, ToastModule, CrudTableComponent],
  providers: [MessageService],
  template: `
    <p-toast />

    <!-- Navbar mínima com logout -->
    <header class="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
      <span class="font-semibold text-gray-700 text-lg">CRUD</span>
      <p-button
        label="Sair"
        icon="pi pi-sign-out"
        severity="secondary"
        [outlined]="true"
        size="small"
        (onClick)="logout()"
      />
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">CRUD</h1>
        <p class="text-center text-gray-500 mt-1">Gerencie seus itens abaixo</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <p-button
          label="Novo Item"
          icon="pi pi-plus"
          (onClick)="incluirNovoItem()"
          class="w-full"
        />
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Lista de Itens</h2>

        @if (loading()) {
          <div class="flex justify-center py-12">
            <p-progressSpinner strokeWidth="4" />
          </div>
        } @else {
          <app-crud-table
            [items]="items()"
            (onEdit)="handleEdit($event)"
            (onDelete)="handleDelete($event)"
            (onDetail)="handleDetail($event)"
          />
        }
      </div>
    </main>
  `,
})
export class ListagemComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly listService = inject(ItemCrudListService);
  private readonly removeService = inject(ItemCrudRemoveService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  items = signal<ItemCrud[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    this.loading.set(true);
    this.listService.findAll().subscribe({
      next: items => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os itens.',
        });
        this.loading.set(false);
      },
    });
  }

  incluirNovoItem(): void {
    this.router.navigate(['/incluir']);
  }

  handleEdit(id: number): void {
    this.router.navigate(['/atualizar', id]);
  }

  handleDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.removeService.remove(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Item excluído com sucesso.',
          });
          this.carregarItens();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir o item.',
          });
        },
      });
    }
  }

  handleDetail(item: ItemCrud): void {
    this.router.navigate(['/detalhe', item.id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
