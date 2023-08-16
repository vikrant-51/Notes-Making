showNotes();

//If user clicks on addbtn, add input text to localStorage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt"); //for main note
  let addTitle = document.getElementById("addTitle"); //for title of note
  let toast = document.getElementById("toast"); // Reference to the toast message element
  
  // Check if either title or text is empty
  if (addTitle.value.trim() === "" || addTxt.value.trim() === "") {
    toast.textContent = "Fields cannot be empty"; // Set toast message text
    toast.classList.add("show"); // Show the toast
    setTimeout(() => {
      toast.classList.remove("show"); // Hide the toast after a delay
    }, 3000); // 3000 milliseconds (3 seconds)
    return;
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addTxt.value = "";
  showNotes();
});

//Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="note-card">
                <h3 class="note-title">${element.title}</h3>
                <p class="note-content">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="delete-btn">Delete</button>
              </div>`;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//Search for note
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let searchVal = search.value.toLowerCase();
  let cards = document.querySelectorAll(".note-card");
  cards.forEach(function (card) {
    let title = card.querySelector(".note-title").textContent.toLowerCase();
    let content = card.querySelector(".note-content").textContent.toLowerCase();
    
    if (title.includes(searchVal) || content.includes(searchVal)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
