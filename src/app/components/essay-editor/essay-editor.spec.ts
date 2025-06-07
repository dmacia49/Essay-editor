import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayEditor } from './essay-editor';

describe('EssayEditor', () => {
  let component: EssayEditor;
  let fixture: ComponentFixture<EssayEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EssayEditor]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EssayEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
