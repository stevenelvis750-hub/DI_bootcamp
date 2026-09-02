function printWordInStar(word = "BOOTCAMP") {
  const border = "*".repeat(word.length + 4);

  console.log(border);
  console.log(`~ ${word} ~`);
  console.log(border);
}

printWordInStar("BOOTCAMP");
printWordInStar("HELLO");
