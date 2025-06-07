import { Component, ViewChild } from '@angular/core';
import { EssayEditor } from './components/essay-editor/essay-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'app';
  @ViewChild('editor') editorComponent!: EssayEditor;

  onApplySuggestion(data: { flagged: string; suggestion: string }) {
    const { flagged, suggestion } = data;
    const editor = this.editorComponent;

    if (!flagged.trim()) return;

    this.editorComponent.saveToHistory();
    const rawText = editor.essayText;

    const pattern = this.editorComponent.getRegexPattern(flagged)

    // Replace matches
    const updatedText = rawText.replace(pattern, suggestion);

    editor.essayText = updatedText;
    editor.editor.nativeElement.textContent = updatedText;
    editor.updateWordCount();
    editor.clearHighlights();
  }

  onFlaggedSentenceChanged(sentence: string) {
    this.editorComponent.highlightMatches(sentence);
  }
}
