// primitive types - number, string, boolean, null, undefined, symbol, void
let price: number = 99.95;
let message: string = "Hello, world!";
let isAvailable: boolean = true;

// We generally do not use null on its own, but rather as a union type with other types. Same with undefined.
// let y: null = null;
// y = "Hello, world";

let product: string | null = null;

export {}; // Make this a module
