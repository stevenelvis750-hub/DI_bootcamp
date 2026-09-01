const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

// Bubble Sort - descending order
for (let i = 0; i < numbers.length; i++) {

    // Compare neighboring numbers
    for (let j = 0; j < numbers.length - 1; j++) {

        // If the left number is smaller,
        // swap the two numbers
        if (numbers[j] < numbers[j + 1]) {

            let temporary = numbers[j];

            numbers[j] = numbers[j + 1];

            numbers[j + 1] = temporary;
        }

        // Show the array after each comparison
        console.log(numbers);
    }
}

console.log("Final result:", numbers);              
    