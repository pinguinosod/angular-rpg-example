import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { StateService } from './../../state.service';
import { Hero } from './../../Hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() hero: Hero;

  private partyEmbarked$: Subscription;
  public partyEmbarked: boolean = this.stateService.getPartyEmbarked();

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.partyEmbarked$ = this.stateService
    .embarkedUpdated
    .subscribe(
      (partyEmbarked: boolean) => this.partyEmbarked = partyEmbarked);
  }

  deleteThisHero() {
    this.stateService.removeHero(this.hero.getId());
  }

  ngOnDestroy() {
    this.partyEmbarked$.unsubscribe();
  }

}
