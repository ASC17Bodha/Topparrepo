interface IPerson {
    name: string;
    age: number;
    celebrateBirthday: () => number; // the updated age should be returned
}

// Assign objects to the IPerson interface type
const john: IPerson = {
    name: "John Doe",
    age: 32,
    celebrateBirthday() {
        return ++this.age;
    },
};

// Implement IPerson interface in Person class
class Person implements IPerson {
    name: string;
    age: number;
    nationality = "Indian";

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    celebrateBirthday() {
        return ++this.age;
    }
}

export { IPerson };
