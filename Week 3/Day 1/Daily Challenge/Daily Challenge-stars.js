// Using ONE loop
for (let i = 1; i <= 6; i++) {
    console.log("* ".repeat(i));
}

// Using TWO nested loops
for (let i = 1; i <= 6; i++) {
    let stars = "";

    for (let j = 1; j <= i; j++) {
        stars += "* ";
    }

    console.log(stars);
}