import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CrudService } from '../../services/crud.service';
import { ItemCrud, DEFAULT_ITEM_CRUD } from '../../models/item-crud.model';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">Detalhes do Item</h1>
        <p class="text-center text-gray-600 mt-2">Visualize as informações completas do item</p>
      </div>

      <!-- Card de Detalhes -->
      @if (item(); as currentItem) {
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <!-- Imagem -->
          @if (currentItem.foto || currentItem.imagemPadrao) {
            <div class="mb-6 flex justify-center">
              <img
                [src]="currentItem.foto || currentItem.imagemPadrao"
                alt="{{ currentItem.nome }}"
                class="max-w-xs rounded-lg shadow-lg"
              />
            </div>
          }

          <!-- Informações -->
          <div class="space-y-4">
            <div class="border-b pb-3">
              <label class="text-sm font-semibold text-gray-600">Nome:</label>
              <p class="text-lg text-gray-800">{{ currentItem.nome }}</p>
            </div>

            <div class="border-b pb-3">
              <label class="text-sm font-semibold text-gray-600">Descrição:</label>
              <p class="text-lg text-gray-800">{{ currentItem.descricao }}</p>
            </div>

            <div class="border-b pb-3">
              <label class="text-sm font-semibold text-gray-600">Nota:</label>
              <p class="text-lg text-gray-800">{{ currentItem.nota }}</p>
            </div>

            <div class="pb-3">
              <label class="text-sm font-semibold text-gray-600">Status de Trabalho:</label>
              <div class="mt-2">
                <span
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                  [class]="currentItem.trabalho ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                >
                  {{ currentItem.trabalho ? 'Sim, é trabalhoso' : 'Não, é simples' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex gap-4 mt-8">
            <p-button
              label="Editar"
              icon="pi pi-pencil"
              severity="warn"
              (onClick)="editar()"
              class="flex-1"
            />
            <p-button
              label="Voltar"
              icon="pi pi-arrow-left"
              severity="secondary"
              (onClick)="voltar()"
              class="flex-1"
              [outlined]="true"
            />
          </div>
        </div>
      } @else {
        <div class="bg-red-100 rounded-lg shadow-md p-6 text-center">
          <p class="text-red-800">Item não encontrado</p>
          <p-button
            label="Voltar para Listagem"
            icon="pi pi-arrow-left"
            (onClick)="voltar()"
            class="mt-4"
          />
        </div>
      }
    </main>
  `,
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent implements OnInit {
  item = signal<ItemCrud | null>(null);
  itemId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = Number(params['id']);
      const currentItem = this.crudService.getItemByIndex(this.itemId);
      this.item.set(currentItem || null);
    });
  }

  editar(): void {
    if (this.itemId !== null) {
      this.router.navigate(['/atualizar', this.itemId]);
    }
  }

  voltar(): void {
    this.router.navigate(['/listagem']);
  }
}
