import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GithubSearchResponse } from './github-search-response';
import { environment } from '../environments/environment.development';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  private readonly BASE_URL: string = 'https://api.github.com/search';
  http: HttpClient = inject(HttpClient);

  private cache = new Map<string, any>();
  private CACHE_EXPIRATION_MS = 5 * 60 * 1000; // Set to 2 minutes

  private searchResultsSubject = new BehaviorSubject<GithubSearchResponse | null>(null);
  searchResults$ = this.searchResultsSubject.asObservable();

  // Centralized default values
  readonly DEFAULT_PAGE = 1;
  readonly DEFAULT_PAGE_SIZE = 10;
  readonly DEFAULT_WORD_LIMIT = 200;
  readonly DEFAULT_SEARCH_OPTION = 'issues';

  // Current pagination settings
  page: number = this.DEFAULT_PAGE;
  perPage: number = this.DEFAULT_PAGE_SIZE;

  searchRequest(
    query: string,
    type: string,
    page: number,
    perPage: number
  ) {

    if (!query) {
      throw new Error('A search query is required');
    }

    const url: string = `${this.BASE_URL}/${type}?q=${query}&page=${page}&per_page=${perPage}`;

    if (this.cache.has(url)) {
      const results = this.cache.get(url);
      return of(results.data); // Return cached data as an observable
    }

    let headers: HttpHeaders = new HttpHeaders();
    if ( environment.githubToken ) {
      headers = headers.set('Authorization', `token ${environment.githubToken}`);
    }

    this.page = page;
    this.perPage = perPage;

    return this.http.get<GithubSearchResponse>(url, { headers }).pipe(
      tap(response => {

        const expiration = Date.now() + this.CACHE_EXPIRATION_MS;
        this.cache.set(url, { data: response, expiration }); // Cache the response

        sessionStorage.setItem('searchResults', JSON.stringify(response));
        sessionStorage.setItem('searchQuery', query);
        sessionStorage.setItem('currentPage', String(page));
        sessionStorage.setItem('perPage', String(perPage));
        sessionStorage.setItem('searchOption', String(type));

        this.searchResultsSubject.next(response); // Update the BehaviorSubject with the latest data
      })
    );

  }

  getSearchItemById(id: number): Observable<any> {
    const index = id - (this.page - 1 ) * this.perPage - 1;
    return this.searchResults$.pipe(
      map(currentResults => {
        if (currentResults && currentResults.items && currentResults.items.length > index) {
          return currentResults.items[index];
        } else {
          // Fallback to stored results if searchResults$ has no data
          const storedResults = this.getStoredResults();
          return storedResults && storedResults.items.length > index ? storedResults.items[index] : [];
        }
      })
    );
  }

  // Getter methods to access stored values
  getStoredResults(): GithubSearchResponse | null {
    const storedResults = sessionStorage.getItem('searchResults');
    return storedResults ? JSON.parse(storedResults) : null;
  }

  getStoredQuery(): string | '' {
    return sessionStorage.getItem('searchQuery') || '';
  }

  getStoredPage(): number {
    return Number(sessionStorage.getItem('currentPage')) || this.DEFAULT_PAGE;
  }

  getStoredPageSize(): number {
    return Number(sessionStorage.getItem('perPage')) || this.DEFAULT_PAGE_SIZE;
  }

  getStoredSearchOption(): string {
    return sessionStorage.getItem('searchOption') || this.DEFAULT_SEARCH_OPTION;
  }

  getStoredWordLimit(): number {
    return Number(sessionStorage.getItem('wordLimit')) || this.DEFAULT_WORD_LIMIT;
  }
}
