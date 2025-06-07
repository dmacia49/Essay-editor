import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FlagSuggestPanel } from './flag-suggest-panel';
import { By } from '@angular/platform-browser';

describe('FlagSuggestPanel', () => {
    let component: FlagSuggestPanel;
    let fixture: ComponentFixture<FlagSuggestPanel>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FlagSuggestPanel],
            imports: [FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(FlagSuggestPanel);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('canApply() should return false when fields are empty', () => {
        component.flaggedSentence = '';
        component.suggestedImprovement = '';
        expect(component.canApply()).toBeFalse();
    });

    it('canApply() should return false when only one field is filled', () => {
        component.flaggedSentence = 'Something wrong';
        component.suggestedImprovement = '';
        expect(component.canApply()).toBeFalse();

        component.flaggedSentence = '';
        component.suggestedImprovement = 'Improved version';
        expect(component.canApply()).toBeFalse();
    });

    it('canApply() should return true when both fields are filled', () => {
        component.flaggedSentence = 'Bad sentence';
        component.suggestedImprovement = 'Better sentence';
        expect(component.canApply()).toBeTrue();
    });

    it('should emit apply event with trimmed values when applySuggestion is called', () => {
        spyOn(component.apply, 'emit');

        component.flaggedSentence = '  Bad sentence  ';
        component.suggestedImprovement = '  Better sentence  ';
        component.applySuggestion();

        expect(component.apply.emit).toHaveBeenCalledWith({
            flagged: 'Bad sentence',
            suggestion: 'Better sentence'
        });
        expect(component.flaggedSentence).toBe('');
        expect(component.suggestedImprovement).toBe('');
    });

    it('should not emit apply event if canApply is false', () => {
        spyOn(component.apply, 'emit');
        component.flaggedSentence = '';
        component.suggestedImprovement = 'Some suggestion';
        component.applySuggestion();
        expect(component.apply.emit).not.toHaveBeenCalled();
    });
});
