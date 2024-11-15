import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatPaginator, } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search',
  standalone: true,
  animations: [
    trigger('dropDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ]),
    ]),
  ],
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    FormsModule,
    MatToolbar,
    MatRadioGroup,
    MatRadioButton,
    MatPaginator,
    MatSlider,
    MatSliderThumb,
    MatIcon,
    MatIconButton,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  route: ActivatedRoute  = inject(ActivatedRoute);
  githubApiService: GithubApiService = inject(GithubApiService);
  dialog: MatDialog = inject(MatDialog);
  searchQuery: string = '';
  selectedOption: string = 'issues'; // Set the default option here
  pageSize: number = 20;
  currentPage: number = 1;

  // Mat Slider values
  sliderDisabled: boolean = false;
  sliderMax: number = 999;
  sliderMin: number = 0;
  sliderStep: number = 1;
  sliderThumbLabel: boolean = true;
  sliderValue: number = 200;

  // Toggle Flags
  isRadioGroupExpanded: boolean = false;
  isSliderExpanded: boolean = false;

  // Error Flag
  showError: boolean = false;
  allowError: boolean = false;

  // Emit search results to parent component
  @Output() searchResult = new EventEmitter<{
    data: any[],
    type: string,
    currentPage: number,
    pageSize: number,
    totalResults: number,
    query: string
  }>();

  @Output() sliderValueChange = new EventEmitter<number>();

  ngOnInit(): void {
    // Initialise pagination values
    this.searchQuery = this.githubApiService.getStoredQuery() || '';
    this.pageSize = this.githubApiService.getStoredPageSize();
    this.currentPage = this.githubApiService.getStoredPage();
    this.selectedOption = this.githubApiService.getStoredSearchOption();
    this.sliderValue = this.githubApiService.getStoredWordLimit();

    const currentPath = this.route.snapshot.routeConfig?.path;
    if ( currentPath === '' ) {
      this.onSearch();
    }
  }

  onSliderChange(): void {
    sessionStorage.setItem('wordLimit', String(this.sliderValue));
    this.sliderValueChange.emit(this.sliderValue); // Emit the slider value whenever it changes
  }

  onSearch(): void {
    if (this.searchQuery && this.searchQuery.trim().length > 0) {

      this.githubApiService.searchRequest(
        this.searchQuery,
        this.selectedOption,
        this.currentPage,
        this.pageSize
      ).subscribe((data: any): void => {

        this.searchResult.emit({
          data: data.items,
          type: this.selectedOption,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          totalResults: data.total_count,
          query: this.searchQuery
        }); // Emit results to AppComponent

      });

    } else {
      if ( this.allowError ) {
        this.showError = true;

        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
      this.allowError = true;
    }
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000).toString();
    }

    return `${value}`;
  }

  toggleRadioGroup() {
    this.isRadioGroupExpanded = !this.isRadioGroupExpanded;
    sessionStorage.setItem('showSearchOptions', String(this.isRadioGroupExpanded));
  }

  toggleSlider() {
    this.isSliderExpanded = !this.isSliderExpanded;
    sessionStorage.setItem('showSlider', String(this.isRadioGroupExpanded));
  }

  openInfoDialog(): void {
    this.dialog.open(InfoDialogComponent, {
      width: '300px',
      data: { message: 'Additional information about this section.' }
    });
  }
}
