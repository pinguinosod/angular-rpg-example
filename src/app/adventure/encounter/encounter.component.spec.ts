import { TestBed, async } from '@angular/core/testing';

import { StateService } from './../../state.service';

import { FighterComponent } from './fighter/fighter.component';
import { EncounterComponent } from './encounter.component';

import { Party } from './party.enum';
import { Hero } from 'src/app/Hero';

describe('EncounterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
      declarations: [
        EncounterComponent,
        FighterComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should render encounter with title Battle in a h2 tag', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    componentInstance.monsters = [];
    componentInstance.heroes = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Battle');
  });

  it('should initialize combat log with starting text', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    expect(componentInstance.combatLog).toEqual(['Combat started...']);
  });

  it('should render combat log with combat text', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    componentInstance.monsters = [];
    componentInstance.heroes = [];
    componentInstance.combatLog = ['I like when you get mad', 'I guess I\'m pretty glad', 'that you\'re alone'];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('ul > li')[0].textContent).toContain('I like when you get mad');
    expect(compiled.querySelectorAll('ul > li')[1].textContent).toContain('I guess I\'m pretty glad');
    expect(compiled.querySelectorAll('ul > li')[2].textContent).toContain('that you\'re alone');
  });

  it('should generate fiendly party based on heroes', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    componentInstance.monsters = [];
    const heroMartin: Hero = new Hero(1, 'Martin', 0, 12, 13, 14);
    const heroLucas: Hero = new Hero(2, 'Lucas', 0, 15, 16, 17);
    componentInstance.heroes = [heroMartin, heroLucas];
    fixture.detectChanges();
    expect(componentInstance.friendlyParty).toEqual([
      {
        id: heroMartin.getId(),
        name: heroMartin.getName(),
        party: Party.FRIEND,
        minAttack: heroMartin.getMinAttack(),
        maxAttack: heroMartin.getMaxAttack(),
        hpCurrent: heroMartin.getHP(),
        hpMax: heroMartin.getHP()
      },
      {
        id: heroLucas.getId(),
        name: heroLucas.getName(),
        party: Party.FRIEND,
        minAttack: heroLucas.getMinAttack(),
        maxAttack: heroLucas.getMaxAttack(),
        hpCurrent: heroLucas.getHP(),
        hpMax: heroLucas.getHP()
      }
    ]);
  });

  it('should generate enemy party based on monsters', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    componentInstance.monsters = [
      { id: 1, name: 'Goblin Fighter', minAttack: 5, maxAttack: 10, hp: 30 },
      { id: 2, name: 'Goblin Archer', minAttack: 5, maxAttack: 20, hp: 15 }
    ];
    componentInstance.heroes = [];
    fixture.detectChanges();
    expect(componentInstance.enemyParty).toEqual([
      { id: 1, name: 'Goblin Fighter', party: Party.ENEMY, minAttack: 5, maxAttack: 10, hpCurrent: 30, hpMax: 30 },
      { id: 2, name: 'Goblin Archer', party: Party.ENEMY, minAttack: 5, maxAttack: 20, hpCurrent: 15, hpMax: 15 }
    ]);
  });

  it('should allow heroes to attack monsters', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    componentInstance.monsters = [{ id: 1, name: 'Dummy', minAttack: 0, maxAttack: 0, hp: 50 }];
    componentInstance.heroes = [new Hero(1, 'Kristina', 0, 17, 15, 16)];
    fixture.detectChanges();
    expect(componentInstance.enemyParty[0].hpCurrent).toBe(componentInstance.enemyParty[0].hpMax);
    componentInstance.attack(componentInstance.friendlyParty[0]);
    fixture.detectChanges();
    expect(componentInstance.enemyParty[0].hpCurrent).toBeLessThan(componentInstance.enemyParty[0].hpMax);
  });

  it('should allow monsters to attack heroes', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.componentInstance;
    componentInstance.monsters = [{ id: 1, name: 'Angry Dummy', minAttack: 5, maxAttack: 10, hp: 50 }];
    componentInstance.heroes = [new Hero(1, 'Samara', 0, 14, 14, 14)];
    fixture.detectChanges();
    expect(componentInstance.friendlyParty[0].hpCurrent).toBe(componentInstance.friendlyParty[0].hpMax);
    componentInstance.attack(componentInstance.enemyParty[0]);
    fixture.detectChanges();
    expect(componentInstance.friendlyParty[0].hpCurrent).toBeLessThan(componentInstance.friendlyParty[0].hpMax);
  });

});
