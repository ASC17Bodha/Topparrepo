// data type for function - approach 1
function sum1(
    x: number,
    y: number
) /* we usually do not specify the return type explicitly */ {
    if (x != 0) {
        return x + y;
    } else {
        return "Unsupported type";
    }
}

// data type for function - approach 2
// works with function expressions
let sum2 = (x: number, y: number) /*: number */ => {
    return x + y;
};

type BinaryFunction = (x: number, y: number) => number;

let sum3: BinaryFunction = (x, y) => {
    return x + y;
};

let multiply: BinaryFunction = (x, y) => x * y;

// We do not expect ant specific return from the function
type CallbackFunction = (response: string) => void;

// a function that accepts another function as an argument
function makeHttpRequest(url: string, callback: CallbackFunction) {
    console.log(`Making a request to ${url}`);
    const response = "Response data from the server";
}

makeHttpRequest("http://localhost:8080", function (response: string) {
    console.log("Request completed");
    console.log(response);

    return 100;
});

// sum2("hello", "world"); // error
