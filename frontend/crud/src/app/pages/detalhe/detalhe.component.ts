import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ItemCrudDetailService } from '../../services/item-crud-detail.service';
import { ItemCrud } from '../../models/item-crud.model';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [ButtonModule, ProgressSpinnerModule, TagModule],
  template: `
    <main class="max-w-3xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">Detalhes do Item</h1>
        <p class="text-center text-gray-600 mt-2">Visualize as informações completas</p>
      </div>

      @if (loading()) {
        <div class="flex justify-center py-12">
          <p-progressSpinner strokeWidth="4" />
        </div>
      } @else if (item(); as currentItem) {
        <div class="bg-white rounded-lg shadow-md p-6 space-y-6">

          @if (currentItem.foto || currentItem.imagemPadrao) {
            <div class="flex justify-center">
              <img
                [src]="currentItem.foto || currentItem.imagemPadrao"
                [alt]="currentItem.nome"
                class="max-w-xs rounded-lg shadow-lg"
              />
            </div>
          }

          <div class="space-y-4">
            <div class="border-b pb-3">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Nome</p>
              <p class="text-lg text-gray-800 mt-1">{{ currentItem.nome }}</p>
            </div>

            <div class="border-b pb-3">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Descrição</p>
              <p class="text-lg text-gray-800 mt-1">{{ currentItem.descricao }}</p>
            </div>

            <div class="border-b pb-3">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Nota</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ currentItem.nota }} / 10</p>
            </div>

            <div class="pb-3">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Foi trabalhoso?
              </p>
              <p-tag
                [value]="currentItem.trabalho ? 'Sim, foi trabalhoso' : 'Não, foi simples'"
                [severity]="currentItem.trabalho ? 'danger' : 'success'"
              />
            </div>
          </div>

          <div class="flex gap-4 pt-4">
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
              [outlined]="true"
              (onClick)="voltar()"
              class="flex-1"
            />
          </div>
        </div>
      } @else {
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p class="text-red-700 mb-4">Item não encontrado.</p>
          <p-button
            label="Voltar para Listagem"
            icon="pi pi-arrow-left"
            (onClick)="voltar()"
          />
        </div>
      }
    </main>
  `,
})
export class DetalheComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly detailService = inject(ItemCrudDetailService);

  item = signal<ItemCrud | null>(null);
  loading = signal(false);
  itemId: number | null = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = Number(params['id']);
      this.carregarItem();
    });
  }

  carregarItem(): void {
    if (this.itemId === null) return;
    this.loading.set(true);
    this.detailService.findById(this.itemId).subscribe({
      next: item => {
        this.item.set(item);
        this.loading.set(false);
      },
      error: () => {
        this.item.set(null);
        this.loading.set(false);
      },
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
