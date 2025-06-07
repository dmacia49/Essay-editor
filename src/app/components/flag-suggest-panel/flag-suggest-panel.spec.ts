import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FlagSuggestPanel } from './flag-suggest-panel';

describe('FlagSuggestPanel', () => {
  let component: FlagSuggestPanel;
  let fixture: ComponentFixture<FlagSuggestPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlagSuggestPanel],
      imports: [FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlagSuggestPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
