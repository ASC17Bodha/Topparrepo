// generic is a template for a class, function / method of a class, interface, type alias
interface IDetailedName {
    manufacturer: string;
    base: string;
}

interface IDetailedPrice {
    base: number;
    tax: number;
}

// interface IProduct {
//     name: string;
//     price: number;
// }

// interface IProductDetailedName {
//     name: IDetailedName;
//     price: number;
// }

// interface IProductDetailedNameAndPrice {
//     name: IDetailedName;
//     price: IDetailedPrice;
// }

// generic interface (not an actual or concrete interface) - it is simply a template
interface IProduct<NameType, PriceType> {
    name: NameType;
    price: PriceType;
}

type IProductSimple = IProduct<string, number>;

const pen: IProductSimple = {
    name: "Camlin Pen",
    price: 50,
};

const pencil: IProduct<IDetailedName, number> = {
    name: {
        manufacturer: "Natraj",
        base: "HB",
    },
    price: 10,
    // xyz: "Abcd", // declaration merging example
};

/**
 * The non-generic version of the map function
 * 1. Works only with number[] - we generalized to T[]
 *
 */

type MapperFunction<T, U> = (item: T) => U;

const map = <T, U>(arr: T[], mapper: MapperFunction<T, U>) => {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const val = mapper(arr[i]);
        result.push(val);
    }

    return result;
};

export {};

// returns a new array [ 2, 4, 6, 8, 10 ]
// map<number, number>(
//     [1, 2, 3, 4, 5], // arr -> number[] - so what is T here? It is number
//     (item) => item * 2 // mapper
// );
map(
    [1, 2, 3, 4, 5], // arr -> number[] - so what is T here? It is number
    (item) => item * 2 // mapper
);

// returns a new array [ 5, 3, 2, 3, 7 ]
// T -> string
// U -> number (item is of T type, i.e. string, string length is therefore number - this is the type for U)
// map<string, number>(["Hello", "how", "is", "the", "weather"], (item) => item.length);
map(["Hello", "how", "is", "the", "weather"], (item) => item.length);
