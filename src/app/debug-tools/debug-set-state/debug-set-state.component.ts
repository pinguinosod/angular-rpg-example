import { Component, OnInit } from '@angular/core';

import { StateService } from './../../state.service';

@Component({
  selector: 'app-debug-set-state',
  templateUrl: './debug-set-state.component.html',
  styleUrls: ['./debug-set-state.component.scss']
})
export class DebugSetStateComponent implements OnInit {

  public newState = JSON.stringify({
    heroes:
      [
        { id: 1, name: 'Stuart', role: 0, INT: 10, DEX: 12, STR: 13, health: 100, mana: 100, experience: 0 },
        { id: 2, name: 'Bob', role: 1, INT: 9, DEX: 9, STR: 14, health: 100, mana: 100, experience: 0 }
      ],
    lastHeroId: 3,
    embarked: true,
    coins: 200
  });

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  setNewState() {
    this.stateService.debugSetNewState(this.newState);
  }

}
