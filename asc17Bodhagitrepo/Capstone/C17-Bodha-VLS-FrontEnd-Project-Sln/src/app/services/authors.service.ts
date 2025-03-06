// src/app/services/authors.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiUrl = 'http://localhost:8080/api/author'; // Adjust this URL if needed

  constructor(private http: HttpClient) {}

  // Get all authors
  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  // Get an author by ID
  getAuthorById(authorId: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${authorId}`);
  }

  // Create or Update an author
  saveAuthor(author: Author): Observable<Author> {
    if (author.authorId) {
      return this.http.put<Author>(`${this.apiUrl}/${author.authorId}`, author);
    } else {
      return this.http.post<Author>(this.apiUrl, author);
    }
  }

  // Delete an author by ID
  deleteAuthor(authorId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${authorId}`);
  }
}
