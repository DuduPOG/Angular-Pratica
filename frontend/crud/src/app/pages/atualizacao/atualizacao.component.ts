import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CrudFormComponent } from '../../components/crud-form/crud-form.component';
import { ItemCrudDetailService } from '../../services/item-crud-detail.service';
import { ItemCrudUpdateService } from '../../services/item-crud-update.service';
import { ItemCrud } from '../../models/item-crud.model';

@Component({
  selector: 'app-atualizacao',
  standalone: true,
  imports: [ButtonModule, ProgressSpinnerModule, ToastModule, CrudFormComponent],
  providers: [MessageService],
  template: `
    <p-toast />

    <main class="max-w-3xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">Editar Item</h1>
        <p class="text-center text-gray-600 mt-2">Atualize as informações do item</p>
      </div>

      @if (loading()) {
        <div class="flex justify-center py-12">
          <p-progressSpinner strokeWidth="4" />
        </div>
      } @else if (editingItem(); as item) {
        <div class="bg-white rounded-lg shadow-md p-6">
          <app-crud-form
            #crudForm
            [initialData]="item"
            (formSubmitted)="handleFormSubmit($event)"
          />

          <div class="flex gap-4 mt-8">
            <p-button
              label="Atualizar"
              icon="pi pi-check"
              [loading]="saving()"
              (onClick)="submitForm()"
              class="flex-1"
            />
            <p-button
              label="Cancelar"
              icon="pi pi-times"
              severity="secondary"
              [outlined]="true"
              (onClick)="cancelar()"
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
            (onClick)="cancelar()"
          />
        </div>
      }
    </main>
  `,
})
export class AtualizacaoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly detailService = inject(ItemCrudDetailService);
  private readonly updateService = inject(ItemCrudUpdateService);
  private readonly messageService = inject(MessageService);

  editingItem = signal<ItemCrud | null>(null);
  loading = signal(false);
  saving = signal(false);
  itemId: number | null = null;

  @ViewChild('crudForm') crudForm!: CrudFormComponent;

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
        this.editingItem.set(item);
        this.loading.set(false);
      },
      error: () => {
        this.editingItem.set(null);
        this.loading.set(false);
      },
    });
  }

  handleFormSubmit(item: ItemCrud): void {
    if (this.itemId === null) return;
    this.saving.set(true);
    this.updateService.update(this.itemId, item).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Item atualizado com sucesso!',
        });
        setTimeout(() => this.router.navigate(['/listagem']), 800);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o item.',
        });
        this.saving.set(false);
      },
    });
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
