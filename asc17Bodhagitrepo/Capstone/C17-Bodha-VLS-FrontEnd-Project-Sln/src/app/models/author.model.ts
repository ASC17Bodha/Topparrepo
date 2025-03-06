// src/app/models/author.model.ts

export class Author {
  authorId: string;
  name: string;
  email: string;
  phone: string;
  biography: string;

  constructor(
    authorId: string = '',
    name: string = '',
    email: string = '',
    phone: string = '',
    biography: string = ''
  ) {
    this.authorId = authorId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.biography = biography;
  }
}
