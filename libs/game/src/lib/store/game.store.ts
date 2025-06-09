import { signalStore, withState } from '@ngrx/signals';
import { Game } from '../models/game.model';

interface GameState {
  items: Record<string, Game>;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  items: {
    '1': {
      id: '1',
      image: '1.png',
      title: "ODDWORLD: STRANGER'S WRATH",
      price: 9.99,
      discount: 50,
      isOwned: false,
    },
    '2': {
      id: '2',
      image: '2.png',
      title: 'CHAOS ON DEPONIA',
      price: 9.99,
      discount: 40,
      isOwned: true,
    },
    '3': {
      id: '3',
      image: '3.png',
      title: 'The settlers 2: gold edition',
      price: 5.99,
      discount: 30,
      isOwned: false,
    },
    '4': {
      id: '4',
      image: '4.png',
      title: 'NEVERWINTER NIGHTS',
      price: 19.99,
      discount: 20,
      isOwned: false,
    },
    '5': {
      id: '5',
      image: '5.png',
      title: 'ASSASSIN’S CREED®: DIRECTOR’S CUT',
      price: 14.99,
      discount: 0,
      isOwned: false,
    },
  },
  loading: false,
  error: null,
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);
