import { Component, OnInit, Input } from '@angular/core';

import { StateService } from '../../state.service';
import { Monster } from '../monster';
import { Hero } from '../../Hero';
import { Fighter } from './fighter';
import { Party } from './party.enum';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css']
})
export class EncounterComponent implements OnInit {
  @Input() monsters: Monster[];
  @Input() heroes: Hero[];

  public friendlyParty: Fighter[] = [];
  public enemyParty: Fighter[] = [];
  public combatLog: string[] = ['Combat started...'];

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.enemyParty.push(...
      this.monsters.map(monster => {
        return {
          id: monster.id,
          name: monster.name,
          party: Party.ENEMY,
          minAttack: monster.minAttack,
          maxAttack: monster.maxAttack,
          hpCurrent: monster.hp,
          hpMax: monster.hp
        };
      }));

    this.friendlyParty.push(...
      this.heroes.map(hero => {
        return {
          id: hero.getId(),
          name: hero.getName(),
          party: Party.FRIEND,
          minAttack: hero.getMinAttack(),
          maxAttack: hero.getMaxAttack(),
          hpCurrent: hero.getHP(),
          hpMax: hero.getHP()
        };
      }));
  }

  fight() {
    this.friendlyParty.map(attacker => this.attack(attacker));
    this.enemyParty.map(attacker => this.attack(attacker));
  }

  attack(attacker: Fighter): void {
    const rndAttackBlow = Math.random();
    console.log(attacker.minAttack, attacker.maxAttack, rndAttackBlow);
    const dmg = attacker.minAttack + Math.floor(rndAttackBlow * attacker.maxAttack);
    console.log('dmg:', dmg);
    const defendingParty = (attacker.party === Party.FRIEND) ? this.enemyParty : this.friendlyParty;
    const defendingUnitIndex = Math.floor(Math.random() * defendingParty.length);
    defendingParty[defendingUnitIndex].hpCurrent -= dmg;
    this.combatLog.push(`${attacker.name} attacks ${defendingParty[defendingUnitIndex].name} and does ${dmg} damage.`);
  }

  run() {
    this.stateService.partyEmbark();
  }

}
