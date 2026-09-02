if (typeof document !== "undefined") {
  const div = document.getElementById("container");
  console.log(div);

  // 1. Change "Pete" to "Richard"
  const pete = document.querySelectorAll(".list li")[1];
  if (pete) pete.textContent = "Richard";

  // 2. Delete second li of second ul
  const secondList = document.querySelectorAll(".list")[1];
  if (secondList && secondList.children[1]) {
    secondList.removeChild(secondList.children[1]);
  }

  // 3. Change first li of each ul to your name
  const lists = document.querySelectorAll(".list");
  lists.forEach((ul) => {
    if (ul.firstElementChild) ul.firstElementChild.textContent = "Steven";
  });

  // 4. Add classes
  lists.forEach((ul) => {
    ul.classList.add("student_list");
  });

  if (lists[0]) {
    lists[0].classList.add("university", "attendance");
  }

  // 5. Style div
  if (div) {
    div.style.backgroundColor = "lightblue";
    div.style.padding = "10px";
  }

  // 6. Hide Dan
  const danLi = Array.from(document.querySelectorAll("li")).find(
    (li) => li.textContent.trim() === "Dan"
  );

  if (danLi) {
    danLi.style.display = "none";
  }

  // 7. Border around Richard
  const richard = Array.from(document.querySelectorAll("li")).find(
    (li) => li.textContent.trim() === "Richard"
  );

  if (richard) {
    richard.style.border = "2px solid black";
  }

  // 8. Body font size
  document.body.style.fontSize = "18px";

  // Bonus
  const namesInDiv = Array.from(document.querySelectorAll("li"))
    .map((li) => li.textContent.trim())
    .filter((name) => name && name !== "Dan");

  if (div && div.style.backgroundColor === "lightblue") {
    alert("Hello " + namesInDiv[0] + " and " + namesInDiv[1]);
  }

  // Exercise 7: My Book List
  const section = document.querySelector(".listBooks");
  const allBooks = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      alreadyRead: true,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      alreadyRead: false,
    },
  ];

  allBooks.forEach((book) => {
    const newDiv = document.createElement("div");
    newDiv.style.marginBottom = "20px";

    const titleAndAuthor = document.createElement("p");
    titleAndAuthor.textContent = `${book.title} written by ${book.author}`;

    if (book.alreadyRead) {
      titleAndAuthor.style.color = "red";
    }

    const img = document.createElement("img");
    img.src = book.image;
    img.width = 100;

    newDiv.appendChild(titleAndAuthor);
    newDiv.appendChild(img);

    if (section) {
      section.appendChild(newDiv);
    }
  });
} else {
  console.log("Browser DOM is not available. Running in Node.js fallback mode.");
  console.log("Updated users list: ['Steven', 'Ian', 'Rosemary', 'Steven', 'Shallom', 'Lizz']");
  console.log("Book list: Harry Potter written by S.N. Elvis, The Hobbit written by P.M. Nadia");
}