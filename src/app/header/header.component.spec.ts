import { TestBed, async } from '@angular/core/testing';

import { StateService } from './../state.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
      declarations: [
        HeaderComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const componentInstance = fixture.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should render title in h1 tag', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('RPG Heroes');
  });

  it('should render 3600 as coins', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentInstance.coins = 3600;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div')[0].textContent).toContain('Coins:3600');
  });

  it('should render 20 as coins', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentInstance.coins = 20;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div')[0].textContent).toContain('Coins:20');
  });

  it('should render 3 as party members', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentInstance.amountOfHeroes = 3;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div')[1].textContent).toContain('Party size:3');
  });

  it('should render 12 as party members', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentInstance.amountOfHeroes = 12;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div')[1].textContent).toContain('Party size:12');
  });
});
