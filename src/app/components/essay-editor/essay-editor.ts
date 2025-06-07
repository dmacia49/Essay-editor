import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-essay-editor',
  standalone: false,
  templateUrl: './essay-editor.html',
  styleUrl: './essay-editor.scss'
})
export class EssayEditor {
  essayText: string = '';
  wordCount: number = 0;
  essayHistory: string[] = [];



  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.editor.nativeElement.focus();
  }

  onContentChange(event: Event): void {
    const target = event.target as HTMLElement;
    this.essayText = target.innerText || '';
    this.updateWordCount();
  }

  updateWordCount() {
    if (!this.essayText.trim()) {
      this.wordCount = 0;
      return;
    }
    // Split by whitespace and filter out empty strings
    this.wordCount = this.essayText
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length;
  }

  clearText() {
    this.essayText = '';
    this.wordCount = 0;
    this.editor.nativeElement.textContent = '';
    this.editor.nativeElement.focus();
  }

  highlightMatches(flaggedSentence: string) {
    const editorEl = this.editor.nativeElement;
    const originalText = this.essayText;


    if (!flaggedSentence.trim()) {
      editorEl.innerHTML = this.escapeHtml(originalText).replace(/\n/g, '<br>');
      return;
    }
    // Escape HTML in essay first
    const escapedEssay = this.escapeHtml(originalText)

    // Build a regex-safe pattern from normalizedFlag
    const pattern = this.getRegexPattern(flaggedSentence)

    // Apply highlighting
    const highlighted = escapedEssay.replace(pattern, (match) => `<mark>${match}</mark>`);

    editorEl.innerHTML = highlighted;

  }

  getRegexPattern(flaggedSentence: string): RegExp {
    const regexSafe = flaggedSentence
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')             // escape regex symbols
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]?]/g, '')  // strip punctuation
      .trim()
      .replace(/\s+/g, '\\s+');                           // allow flexible spacing

    return new RegExp(`${regexSafe}`, 'gi'); // removed word boundaries
  }


  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.innerText = text;
    let escaped = div.innerHTML;

    // Preserve line breaks
    escaped = escaped.replace(/\n/g, '<br>');

    // Preserve multiple spaces
    escaped = escaped.replace(/  /g, ' &nbsp;');

    return escaped;
  }
  clearHighlights() {
    this.editor.nativeElement.innerHTML = this.escapeHtml(this.essayText);
    //this.editor.nativeElement.innerText = this.essayText;
  }

  normalize(text: string): string {
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  saveToHistory() {
    this.essayHistory.push(this.essayText);
  }

  undoLastChange() {
    if (this.essayHistory.length > 0) {
      const last = this.essayHistory.pop()!;
      this.essayText = last;
      this.editor.nativeElement.textContent = last;
      this.updateWordCount();
    }
  }

}

