import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-flag-suggest-panel',
  standalone: false,
  templateUrl: './flag-suggest-panel.html',
  styleUrl: './flag-suggest-panel.scss'
})
export class FlagSuggestPanel {

  flaggedSentence: string = '';
  suggestedImprovement: string = '';

  @Output() apply = new EventEmitter<{ flagged: string; suggestion: string }>();
  @Output() flaggedSentenceChange = new EventEmitter<string>();


  canApply(): boolean {
    return (
      this.flaggedSentence.trim().length > 0 &&
      this.suggestedImprovement.trim().length > 0
    );
  }

  applySuggestion() {
    if (this.canApply()) {
      this.apply.emit({
        flagged: this.flaggedSentence.trim(),
        suggestion: this.suggestedImprovement.trim(),
      });
      // Optional: Clear inputs after applying
      this.flaggedSentence = '';
      this.suggestedImprovement = '';
    }
  }

}
