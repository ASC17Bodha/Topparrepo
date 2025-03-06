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
    name: string; // must be public - enforced by the interface
    age: number;
    // private nationality = "Indian";

    // automatically defines and initializes the nationality property
    constructor(name: string, age: number, private nationality: string) {
        this.name = name;
        this.age = age;

        // automatically initializes the nationality property
        // this.nationality = nationality;
    }

    celebrateBirthday() {
        return ++this.age;
    }
}

class Employee extends Person {
    // role: string;
    // department: string;

    constructor(
        name: string,
        age: number,
        nationality: string,
        private role: string,
        private department: string
    ) {
        super(name, age, nationality);

        this.role = role;
        this.department = department;
    }

    // add more methods
    // ...
}

export { IPerson };
