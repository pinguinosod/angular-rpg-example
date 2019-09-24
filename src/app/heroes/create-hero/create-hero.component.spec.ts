import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { StateService } from 'src/app/state.service';

import { CreateHeroComponent } from './create-hero.component';

describe('CreateHeroComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule
      ],
      providers: [StateService],
      declarations: [
        CreateHeroComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CreateHeroComponent);
    const componentInstance = fixture.debugElement.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const fixture = TestBed.createComponent(CreateHeroComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Hire New Hero (100 coins)');
  });

  it('should render an input without text on it', () => {
    const fixture = TestBed.createComponent(CreateHeroComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').value).toBe('');
  });

  it('should render a button with label Hire', () => {
    const fixture = TestBed.createComponent(CreateHeroComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Hire');
  });
});
