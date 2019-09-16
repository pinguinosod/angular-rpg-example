import { Injectable } from '@angular/core';
import { Hero } from './Hero';
import { Subject } from 'rxjs';

const HIRE_HERO_COST = 100;
const REQUIRED_PARTY_SIZE = 2;

@Injectable()
export class StateService {

  private heroes: Hero[] = [];
  private lastHeroId = 0;
  private embarked = false;
  private coins: number = HIRE_HERO_COST * (REQUIRED_PARTY_SIZE + 2);

  public heroesUpdated: Subject<Hero[]>;
  public amountOfHeroesUpdated: Subject<number>;
  public embarkedUpdated: Subject<boolean>;
  public coinsUpdated: Subject<number>;

  constructor() {
    this.heroesUpdated = new Subject<Hero[]>();
    this.amountOfHeroesUpdated = new Subject<number>();
    this.embarkedUpdated = new Subject<boolean>();
    this.coinsUpdated = new Subject<number>();
  }

  public getHeroes(): Hero[] {
    return this.heroes;
  }

  public getAmountOfHeroes(): number {
    return this.heroes.length;
  }

  public getLastHeroId(): number {
    return this.lastHeroId;
  }

  public getPartyEmbarked(): boolean {
    return this.embarked;
  }

  public getCoins(): number {
    return this.coins;
  }

  public getRequiredPartySize(): number {
    return REQUIRED_PARTY_SIZE;
  }

  public addHero(name: string): void {
    if (name
      && this.getAmountOfHeroes() < REQUIRED_PARTY_SIZE
      && this.coins >= HIRE_HERO_COST) {

      const newHero: Hero = new Hero(
        ++this.lastHeroId,
        name,
        Hero.getRandomRole(),
        Math.ceil(7 + Math.random() * 6),
        Math.ceil(7 + Math.random() * 6),
        Math.ceil(7 + Math.random() * 6)
      );

      this.heroes.push(newHero);
      this.coins = this.coins -= HIRE_HERO_COST;
      this.amountOfHeroesUpdated.next(this.getAmountOfHeroes());
      this.heroesUpdated.next(this.getHeroes());
      this.coinsUpdated.next(this.getCoins());
    }
  }

  public removeHero(id: number): void {
    this.heroes = this.heroes.filter(hero => hero.getId() !== id);
    this.amountOfHeroesUpdated.next(this.getAmountOfHeroes());
    this.heroesUpdated.next(this.getHeroes());
  }

  public partyEmbark(): void {
    this.embarked = !this.embarked;
    this.embarkedUpdated.next(this.getPartyEmbarked());
  }

  // DEBUG TOOLS
  public debugSetNewState(newStateString: string): void {
    const newState = JSON.parse(newStateString);

    console.log(newState);

    const newHeroesList = newState.heroes.map(hero => {
      return new Hero(
        hero.id,
        hero.name,
        hero.role,
        hero.INT,
        hero.DEX,
        hero.STR
      );
    });

    this.heroes = newHeroesList;
    this.lastHeroId = newState.lastHeroId;
    this.embarked = newState.embarked;
    this.coins = newState.coins;

    this.amountOfHeroesUpdated.next(this.getAmountOfHeroes());
    this.heroesUpdated.next(this.getHeroes());
    this.embarkedUpdated.next(this.getPartyEmbarked());
    this.coinsUpdated.next(this.getCoins());
  }

}
