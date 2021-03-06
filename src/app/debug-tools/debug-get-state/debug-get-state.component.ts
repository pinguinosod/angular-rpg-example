import { Component, OnInit } from '@angular/core';

import { StateService } from './../../state.service';

@Component({
  selector: 'app-debug-get-state',
  templateUrl: './debug-get-state.component.html',
  styleUrls: ['./debug-get-state.component.scss']
})
export class DebugGetStateComponent implements OnInit {

  public currentStateAsJSON: string;

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  getStateAsJSON() {
    this.currentStateAsJSON = JSON.stringify({
      heroes: this.stateService.getHeroes(),
      lastHeroId: this.stateService.getLastHeroId(),
      embarked: this.stateService.getPartyEmbarked(),
      coins: this.stateService.getCoins()
    });
  }

}
