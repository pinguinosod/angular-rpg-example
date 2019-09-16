import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StateService } from '../state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public amountOfHeroes: number = this.stateService.getAmountOfHeroes();
  private amountOfHeroesUpdated$: Subscription;

  public coins: number = this.stateService.getCoins();
  private coinsUpdated$: Subscription;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.amountOfHeroesUpdated$ = this.stateService
    .amountOfHeroesUpdated
    .subscribe(
      (newAmountOfHeroes: number) => this.amountOfHeroes = newAmountOfHeroes);

    this.coinsUpdated$ = this.stateService
    .coinsUpdated
    .subscribe(
      (newCoins: number) => this.coins = newCoins);
  }

  ngOnDestroy() {
    this.amountOfHeroesUpdated$.unsubscribe();
    this.coinsUpdated$.unsubscribe();
  }

}
