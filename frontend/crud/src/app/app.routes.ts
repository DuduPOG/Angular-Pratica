import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login.component';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';
import { InclusaoComponent } from './pages/inclusao/inclusao.component';
import { AtualizacaoComponent } from './pages/atualizacao/atualizacao.component';

export const routes: Routes = [
  // Pública
  { path: 'login', component: LoginComponent },

  // Protegidas por JWT
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'listagem', pathMatch: 'full' },
      { path: 'listagem', component: ListagemComponent },
      { path: 'detalhe/:id', component: DetalheComponent },
      { path: 'incluir', component: InclusaoComponent },
      { path: 'atualizar/:id', component: AtualizacaoComponent },
    ],
  },

  // Fallback
  { path: '**', redirectTo: 'listagem' },
];
