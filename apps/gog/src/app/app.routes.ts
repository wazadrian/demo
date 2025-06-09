import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@game-of-the-week').then((m) => m.GameOfTheWeekComponent),
  },
];
