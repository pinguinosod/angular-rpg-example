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

  public combatLog: string[] = ['Combat started...'];

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  fight() {
    const fighters: Fighter[] = [];

    fighters.push(...
      [...this.monsters.map(monster => {
        return {
          id: monster.id,
          name: monster.name,
          party: Party.ENEMY,
          minAttack: monster.minAttack,
          maxAttack: monster.maxAttack
        };
      }),
      ...this.heroes.map(hero => {
        return {
          id: hero.getId(),
          name: hero.getName(),
          party: Party.FRIEND,
          minAttack: hero.getMinAttack(),
          maxAttack: hero.getMaxAttack()
        };
      })
      ]
    );

    console.log(fighters);

    fighters.map(fighter => {
      const rndAttackBlow = Math.random();
      console.log(typeof fighter.minAttack);
      console.log(typeof fighter.maxAttack);
      console.log(fighter.minAttack, fighter.maxAttack, rndAttackBlow);
      const dmg = fighter.minAttack + Math.floor(rndAttackBlow * fighter.maxAttack);
      console.log('dmg:', dmg);
      if (fighter.party === Party.FRIEND) {
        const monsterToAttackIndex = Math.floor(Math.random() * this.monsters.length);
        this.monsters[monsterToAttackIndex].hp -= dmg;
        this.combatLog.push(`${fighter.name} attacks ${this.monsters[monsterToAttackIndex].name} and does ${dmg} damage.`);
      } else {
        const heroToAttackIndex = Math.floor(Math.random() * this.heroes.length);
        this.heroes[heroToAttackIndex].receiveDamage(dmg);
        this.combatLog.push(`${fighter.name} attacks ${this.heroes[heroToAttackIndex].getName()} and does ${dmg} damage.`);
      }
    });

  }

  run() {
    this.stateService.partyEmbark();
  }

}
