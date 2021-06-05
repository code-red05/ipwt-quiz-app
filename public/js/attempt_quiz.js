"use-strict" /*ANEESH SUBUDHI 19BCT0038 MEHUL RANA 19BCT0033 PRITH SHARMA 19BCT0097*/;

const geographyBtn = document.querySelector(".geography");
const mathsBtn = document.querySelector(".maths");
const computerBtn = document.querySelector(".computer");
const scienceBtn = document.querySelector(".science");
const miscellaneousBtn = document.querySelector(".miscellaneous");
const attemptQuiz = document.querySelector(".main_link");
const categoryTitle = document.querySelector(".category_title");
const quizList = document.querySelector(".quiz_list");
const quizListItems = document.querySelectorAll(".btn-outline-warning");
const chooseCategory = document.querySelector(".choose_category");
let categoryBtns = [
  geographyBtn,
  mathsBtn,
  computerBtn,
  scienceBtn,
  miscellaneousBtn,
];

//to deselect button
const deselect = () => {
  let qlist = quizList.children;
  console.log(quizList.children);
  for (let i = 0; i < qlist.length; i++) {
    if (qlist[i].style.backgroundColor === "#ffc107") {
      console.log("Hi");
      qlist[i].style.backgroundColor = "";
      qlist[i].style.color = "#ffc107";
    }
  }
};

//to destroy quiz btns and hide the quiz list div
const hideList = function () {
  if (quizList.hasChildNodes()) {
    console.log(quizList.children);
    let num = quizList.children.length;
    console.log(num);
    for (let i = 0; i < num; i++) {
      const quizListItem = document.querySelector(".btn-outline-warning");
      quizList.removeChild(quizListItem);
    }
  }
  quizList.classList.add("hidden");
  categoryTitle.classList.add("hidden");
  attemptQuiz.classList.add("hidden");
};
hideList();
let quizID;
let ctg;
let defbgcolor;
let defcolor;

//adding eventlisteners for category btns
for (let i = 0; i < categoryBtns.length; i++) {
  categoryBtns[i].addEventListener("click", function () {
    const cattext = categoryBtns[i].textContent.trim();
    hideList();
    if (!chooseCategory.classList.contains("hidden")) {
      chooseCategory.classList.add("hidden");
    }
    categoryTitle.classList.toggle("hidden");
    quizList.classList.toggle("hidden");
    categoryTitle.textContent = `Category : ${cattext}`;
    attemptQuiz.classList.toggle("hidden");

    //to fetch quizzes for the category selected
    fetch(`/quizcat?category=${cattext}`)
      .then((response) => {
        response
          .json()
          .then((quizzes) => {
            if (quizzes.error) {
              console.log(quizzes.error);
            } else {
              console.log(quizzes);

              //adding quiz buttons
              for (let i = 0; i < quizzes.length; i++) {
                let quizItem = "";
                let quizBtn = document.createElement("button");
                quizBtn.style.width = "450px";
                quizBtn.style.height = "20px";
                quizBtn.className = "btn btn-outline-warning btn-lg";

                quizBtn.addEventListener("click", () => {
                  deselect();
                  console.log(quizBtn.style.backgroundColor);
                  console.log(quizBtn.style.color);
                  quizBtn.style.backgroundColor = "#ffc107";
                  quizBtn.style.color = "black";
                  quizID = quizzes[i].quizid;
                  cat = cattext;
                });

                quizBtn.textContent = quizzes[i].quizname;
                quizList.appendChild(quizBtn);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // console.log(response.json());
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

attemptQuiz.addEventListener("click", () => {
  console.log(quizID);
  window.location.href = `/attempt_quiz/${cat}/${quizID}`;
  // if (quizid !== "") {
  //   fetch("");
  // }
});
