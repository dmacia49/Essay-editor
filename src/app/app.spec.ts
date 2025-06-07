import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { EssayEditor } from './components/essay-editor/essay-editor';
import { FlagSuggestPanel } from './components/flag-suggest-panel/flag-suggest-panel';
import { FormsModule } from '@angular/forms';


describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        FormsModule
      ],
      declarations: [
        App,
        EssayEditor,
        FlagSuggestPanel
      ]
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain app-essay-editor component', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-essay-editor')).toBeTruthy();
  });

  it('should contain app-flag-suggest-panel component', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-flag-suggest-panel')).toBeTruthy();
  });
});
