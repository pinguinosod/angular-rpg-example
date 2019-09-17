import { Party } from './party.enum';

export interface Fighter {
  id: number;
  name: string;
  party: Party;
  minAttack: number;
  maxAttack: number;
  hpCurrent: number;
  hpMax: number;
}
