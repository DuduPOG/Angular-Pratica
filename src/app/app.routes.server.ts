import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Todas as rotas com dados dinâmicos do backend são renderizadas no cliente
 * para evitar que o servidor SSR tente chamar o Django durante o build.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
