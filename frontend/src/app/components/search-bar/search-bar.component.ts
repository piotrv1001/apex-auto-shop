import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() label: string = 'Search';
  @Output() searchQueryChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchQueryChange(event: any): void {
    this.searchQueryChange.emit(event.target.value);
  }

}
