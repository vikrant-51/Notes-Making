showNotes();

//If user clicks on addbtn, add input text to localStorage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt"); //for main note
  let addTitle = document.getElementById("addTitle"); //for title of note
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text: addTxt.value
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
  notesObj.forEach(function(element, index) {
    html += `<div class="card">
                           <div id="title">
                                <h3 class="card-title">${element.title}</h3>
                           </div>
                           <div id="main-note">
                                <p class="card-text">${element.text}</p> 
                           </div>
                           <div id="del-btn">
                                <button id="${index}" onclick="deleteNote(this.id)" class="delete-btn">Delete Note</button>
                           </div>
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
search.addEventListener("input", function() {
  let searchVal = search.value;
  let card = document.getElementsByClassName("card");
  Array.from(card).forEach(function(element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.toUpperCase().indexOf(filter) > -1){
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
