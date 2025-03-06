// // src/app/models/admin.model.ts
// export class Admin {
//   aId: string;
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   createdAt: string;

//   constructor(
//     aId: string,
//     name: string,
//     email: string,
//     password: string,
//     phone: string,
//     createdAt: string
//   ) {
//     this.aId = aId;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//     this.phone = phone;
//     this.createdAt = createdAt;
//   }
// }


// src/app/models/admin.model.ts
export class Admin {
  aId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  // createdAt: string;

  constructor(
    aId: string = '',
    name: string = '',
    email: string = '',
    password: string = '',
    phone: string = '',
    // createdAt: string = ''
  ) {
    this.aId = aId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    // this.createdAt = createdAt;
  }
}
