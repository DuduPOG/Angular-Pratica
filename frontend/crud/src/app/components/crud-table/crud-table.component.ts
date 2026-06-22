import { Component, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ItemCrud } from '../../models/item-crud.model';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [TableModule, ButtonModule, TooltipModule, TagModule],
  template: `
    <p-table
      [value]="items()"
      [paginator]="true"
      [rows]="5"
      [rowsPerPageOptions]="[5, 10, 20]"
      responsiveLayout="scroll"
      stripedRows
    >
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="nome">Nome <p-sortIcon field="nome" /></th>
          <th pSortableColumn="descricao">Descrição <p-sortIcon field="descricao" /></th>
          <th pSortableColumn="nota">Nota <p-sortIcon field="nota" /></th>
          <th pSortableColumn="trabalho">Trabalhoso <p-sortIcon field="trabalho" /></th>
          <th class="text-center">Ações</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-item>
        <tr>
          <td>{{ item.nome }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.nota }}</td>
          <td>
            <p-tag
              [value]="item.trabalho ? 'Sim' : 'Não'"
              [severity]="item.trabalho ? 'danger' : 'success'"
            />
          </td>
          <td>
            <div class="flex gap-2 justify-center">
              <p-button
                icon="pi pi-eye"
                [rounded]="true"
                [text]="true"
                severity="info"
                (onClick)="onDetail.emit(item)"
                pTooltip="Detalhar"
                tooltipPosition="top"
              />
              <p-button
                icon="pi pi-pen-to-square"
                [rounded]="true"
                [text]="true"
                severity="warn"
                (onClick)="onEdit.emit(item.id!)"
                pTooltip="Editar"
                tooltipPosition="top"
              />
              <p-button
                icon="pi pi-trash"
                [rounded]="true"
                [text]="true"
                severity="danger"
                (onClick)="onDelete.emit(item.id!)"
                pTooltip="Excluir"
                tooltipPosition="top"
              />
            </div>
          </td>
        </tr>
      </ng-template>

      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="5" class="text-center py-8 text-gray-500">
            Nenhum item encontrado. Adicione um novo item ao CRUD!
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class CrudTableComponent {
  items = input.required<ItemCrud[]>();
  /** Emite o id do item a editar */
  onEdit = output<number>();
  /** Emite o id do item a excluir */
  onDelete = output<number>();
  /** Emite o item completo para exibição de detalhe */
  onDetail = output<ItemCrud>();
}
