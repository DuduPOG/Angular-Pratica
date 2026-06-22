import { Routes } from '@angular/router';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';
import { InclusaoComponent } from './pages/inclusao/inclusao.component';
import { AtualizacaoComponent } from './pages/atualizacao/atualizacao.component';

export const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'listagem', component: ListagemComponent },
  { path: 'detalhe/:id', component: DetalheComponent },
  { path: 'incluir', component: InclusaoComponent },
  { path: 'atualizar/:id', component: AtualizacaoComponent },
  { path: '**', redirectTo: 'listagem' },
];
