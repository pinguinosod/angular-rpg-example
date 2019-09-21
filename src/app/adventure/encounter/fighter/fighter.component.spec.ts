import { TestBed, async } from '@angular/core/testing';

import { FighterComponent } from './fighter.component';
import { Party } from './../party.enum';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        FighterComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FighterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render fighter with name Stuart in a h3 tag', () => {
    const fixture = TestBed.createComponent(FighterComponent);
    fixture.componentInstance.fighter = {
      id: 1, name: 'Stuart', party: Party.FRIEND, minAttack: 10, maxAttack: 20, hpCurrent: 50, hpMax: 100
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Stuart');
  });

  it('should render fighter with name Camila in a h3 tag', () => {
    const fixture = TestBed.createComponent(FighterComponent);
    fixture.componentInstance.fighter = {
      id: 1, name: 'Camila', party: Party.FRIEND, minAttack: 10, maxAttack: 20, hpCurrent: 50, hpMax: 100
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Camila');
  });

  it('should render fighter with hp 20/60 in a td tag', () => {
    const fixture = TestBed.createComponent(FighterComponent);
    fixture.componentInstance.fighter = {
      id: 1, name: 'Dani', party: Party.FRIEND, minAttack: 10, maxAttack: 20, hpCurrent: 20, hpMax: 60
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('td').textContent).toContain('20 / 60');
  });
});
