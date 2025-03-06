// src/app/components/authors/authors.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { Author } from '../../models/author.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  currentAuthor: Author = new Author();
  isEditing: boolean = false;
  searchTerm: string = ''; // For searching the authors by name or email

  constructor(
    private authorsService: AuthorsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorsService.getAllAuthors().subscribe((data) => {
      this.authors = data;
      this.filteredAuthors = data; // Initially display all authors
    });
  }

  // Filter authors based on the search term
  filterAuthors(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredAuthors = this.authors; // If search term is empty, show all authors
    } else {
      this.filteredAuthors = this.authors.filter(
        author =>
          author.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          author.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  viewAuthor(authorId: string): void {
    this.authorsService.getAuthorById(authorId).subscribe((data) => {
      this.currentAuthor = data;
      this.isEditing = true;
    });
  }

  addNewAuthor(): void {
    this.currentAuthor = new Author();
    this.isEditing = false;
  }

  saveAuthor(): void {
    this.authorsService.saveAuthor(this.currentAuthor).subscribe(() => {
      this.loadAuthors();
      this.isEditing = false;
      this.currentAuthor = new Author();
    });
  }

  deleteAuthor(authorId: string): void {
    this.authorsService.deleteAuthor(authorId).subscribe(() => {
      this.loadAuthors();
    });
  }
}
