type Person = {
    name: string; // can end with comma as well
    readonly age: number;
    spouse?: string; // optional properties - may or may not be present
};

let john: Person; // no unnecessary repetition of object type definition

john = {
    name: "John",
    age: 32,
    // spouse: "Jane",
};

// we should not be able to modify age
// john.age++; // error -> cannot modify readonly field
console.log(john.age);

// john.age = 40; // error
console.log(john.age);

let jane: Person;

jane = {
    name: "Jane",
    age: 28,
    spouse: "John",
};
