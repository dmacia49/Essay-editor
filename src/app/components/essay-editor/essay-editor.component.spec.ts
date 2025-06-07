import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EssayEditor } from './essay-editor';


describe('EssayEditor', () => {
    let component: EssayEditor;
    let fixture: ComponentFixture<EssayEditor>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EssayEditor]
        }).compileComponents();

        fixture = TestBed.createComponent(EssayEditor);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear text on clearEssay()', () => {
        component.essayText = 'This is some test text.';
        component.clearText();
        expect(component.essayText).toBe('');
    });

    it('should normalize text correctly', () => {
        const input = "Hello, World!";
        const output = component.normalize(input);
        expect(output).toBe("hello world");
    });

    it('should match partial sentence in essay text', () => {
        component.essayText = "We must act on climate change debate now.";
        const pattern = component.getRegexPattern("climate change");

        const matches = component.essayText.match(pattern);
        expect(matches?.length).toBeGreaterThan(0);
    });

    it('should save and undo essay text', () => {
        component.essayText = "Version 1";
        component.saveToHistory();

        component.essayText = "Version 2";
        component.undoLastChange();

        expect(component.essayText).toBe("Version 1");
    });

    it('should not undo if history is empty', () => {
        component.essayText = "Only version";
        component.undoLastChange();
        expect(component.essayText).toBe("Only version"); // Should remain unchanged
    });


    it('should update word count correctly', () => {
        component.essayText = 'One two three';
        component.updateWordCount();
        expect(component.wordCount).toBe(3);
    });




});
