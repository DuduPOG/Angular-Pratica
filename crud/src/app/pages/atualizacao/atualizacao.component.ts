import { Component, OnInit, OnDestroy, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CrudService } from '../../services/crud.service';
import { CrudFormComponent } from '../../crud-form/crud-form.component';
import { ItemCrud, DEFAULT_ITEM_CRUD } from '../../models/item-crud.model';

@Component({
  selector: 'app-atualizacao',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CrudFormComponent],
  template: `
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-center text-gray-800">Editar Item</h1>
        <p class="text-center text-gray-600 mt-2">Atualize as informações do item</p>
      </div>

      <!-- Seção de Formulário -->
      @if (editingItem(); as item) {
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <app-crud-form
            #crudForm
            [initialData]="item"
            (formSubmitted)="handleFormSubmit($event)"
          />

          <div class="flex gap-4 mt-6">
            <p-button
              label="Atualizar"
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
      } @else {
        <div class="bg-red-100 rounded-lg shadow-md p-6 text-center">
          <p class="text-red-800">Item não encontrado</p>
          <p-button
            label="Voltar para Listagem"
            icon="pi pi-arrow-left"
            (onClick)="cancelar()"
            class="mt-4"
          />
        </div>
      }
    </main>
  `,
  styleUrl: './atualizacao.component.css'
})
export class AtualizacaoComponent implements OnInit, OnDestroy {
  editingItem = signal<ItemCrud | null>(null);
  itemId: number | null = null;

  @ViewChild('crudForm') crudForm!: CrudFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = Number(params['id']);
      const item = this.crudService.getItemByIndex(this.itemId);
      if (item) {
        // Define o índice de edição no serviço para que addItem() faça update em vez de create
        this.crudService.setEditingItem(this.itemId);
        this.editingItem.set(item);
      }
    });
  }

  ngOnDestroy(): void {
    // Limpa o estado de edição ao sair da página
    this.crudService.setEditingItem(null);
  }

  handleFormSubmit(item: ItemCrud): void {
    if (this.itemId !== null) {
      this.crudService.addItem(item);
      this.router.navigate(['/listagem']);
    }
  }

  submitForm(): void {
    if (this.crudForm) {
      this.crudForm.submit();
    }
  }

  cancelar(): void {
    this.crudService.setEditingItem(null);
    this.router.navigate(['/listagem']);
  }
}
