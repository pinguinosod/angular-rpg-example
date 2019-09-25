
import { StateService } from 'src/app/state.service';

describe('StateService', () => {
  let stateService: StateService;
  beforeEach(() => { stateService = new StateService(); });

  it('should return empty heroes list if no hero is created yet', () => {
    expect(stateService.getHeroes()).toEqual([]);
  });

  it('should be able to store heroes and return the list of heroes', () => {
    stateService.addHero('Tito');
    stateService.addHero('Seba');

    const heroesNames = stateService.getHeroes().map(hero => hero.getName());

    expect(heroesNames).toEqual(['Tito', 'Seba']);
  });

  it('should return the amount of money the party has', () => {
    expect(stateService.getCoins()).toBeGreaterThan(0);
  });

  it('should return required amount of money to hire a new hero', () => {
    expect(stateService.getHireHeroCost()).toBeGreaterThan(0);
  });

  it('should return required amount of party members to embark', () => {
    expect(stateService.getRequiredPartySize()).toBeGreaterThan(0);
  });

  it('should return the correct amount of heroes', () => {
    expect(stateService.getAmountOfHeroes()).toBe(0);
    stateService.addHero('Sam');
    expect(stateService.getAmountOfHeroes()).toBe(1);
    stateService.addHero('Frodo');
    expect(stateService.getAmountOfHeroes()).toBe(2);
  });

  it('should return the last hero id', () => {
    expect(stateService.getLastHeroId()).toBe(0);
    stateService.addHero('Harry');
    expect(stateService.getLastHeroId()).toBe(1);
    stateService.addHero('Voldemort');
    expect(stateService.getLastHeroId()).toBe(2);
  });

  it('should keep incrementing last hero id even if ids in between are removed', () => {
    expect(stateService.getLastHeroId()).toBe(0);
    stateService.addHero('Goku');
    expect(stateService.getLastHeroId()).toBe(1);
    stateService.addHero('Krillin');
    expect(stateService.getLastHeroId()).toBe(2);
    stateService.removeHero(2);
    expect(stateService.getLastHeroId()).toBe(2);
    stateService.addHero('Yamcha');
    expect(stateService.getLastHeroId()).toBe(3);
  });

  it('should be able to dismiss heroes', () => {
    stateService.addHero('Tito');
    stateService.addHero('Seba');

    expect(stateService.getAmountOfHeroes()).toBe(2);

    const heroesIds = stateService.getHeroes().map(hero => hero.getId());

    stateService.removeHero(heroesIds[1]);
    expect(stateService.getAmountOfHeroes()).toBe(1);

    stateService.removeHero(heroesIds[0]);
    expect(stateService.getAmountOfHeroes()).toBe(0);
  });

  it('should not do anything if the dismissing hero id does not exists', () => {
    stateService.addHero('Frank');
    stateService.addHero('Guille');

    expect(stateService.getAmountOfHeroes()).toBe(2);

    stateService.removeHero(999);
    expect(stateService.getAmountOfHeroes()).toBe(2);
  });

  it('should be able to embark the party', () => {
    expect(stateService.getPartyEmbarked()).toBeFalsy();
    stateService.partyEmbark();
    expect(stateService.getPartyEmbarked()).toBeTruthy();
  });

  it('should not be able to hire more heroes if the party does not have enough money', () => {
    stateService.addHero('4ever all one');
    while (stateService.getCoins() >= stateService.getHireHeroCost()) {
      stateService.addHero('why you do this to me');
      stateService.removeHero(stateService.getLastHeroId());
    }
    expect(stateService.getAmountOfHeroes()).toBe(1);
    stateService.addHero('you cannot afford me');
    expect(stateService.getAmountOfHeroes()).toBe(1);
  });

  it('should not be able to hire more heroes if the party is full', () => {
    while (stateService.getAmountOfHeroes() < stateService.getRequiredPartySize()) {
      stateService.addHero('Im not unique');
    }
    expect(stateService.getAmountOfHeroes()).toBe(stateService.getRequiredPartySize());
    stateService.addHero('I dont fit');
    expect(stateService.getAmountOfHeroes()).toBe(stateService.getRequiredPartySize());
  });

});
