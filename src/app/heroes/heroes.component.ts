import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StateService } from './../state.service';
import { Hero } from './../Hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {

  public heroes: Hero[] = this.stateService.getHeroes();
  private heroesUpdated$: Subscription;
  public requiredPartySize = this.stateService.getRequiredPartySize();

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.heroesUpdated$ = this.stateService
      .heroesUpdated
      .subscribe(
        (newHeroes: Hero[]) => this.heroes = newHeroes);
  }

  ngOnDestroy() {
    this.heroesUpdated$.unsubscribe();
  }

  embark() {
    this.stateService.partyEmbark();
  }

}
