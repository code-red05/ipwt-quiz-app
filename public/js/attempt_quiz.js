'use-strict' /*ANEESH SUBUDHI 19BCT0038 MEHUL RANA 19BCT0033 PRITH SHARMA 19BCT0097*/;

const geographyBtn = document.querySelector('.geography');
const mathsBtn = document.querySelector('.maths');
const computerBtn = document.querySelector('.computer');
const scienceBtn = document.querySelector('.science');
const miscellaneousBtn = document.querySelector('.miscellaneous');
const attemptQuiz = document.querySelector('.main_link');
const categoryTitle = document.querySelector('.category_title');
const quizList = document.querySelector('.quiz_list');
const quizListItems = document.querySelectorAll('.btn-outline-warning');
const chooseCategory = document.querySelector('.choose_category');
let categoryBtns = [
  geographyBtn,
  mathsBtn,
  computerBtn,
  scienceBtn,
  miscellaneousBtn,
];

const hideList = function () {
  quizList.classList.add('hidden');
  for (let i = 0; i < quizListItems.length; i++) {
    quizListItems[i].classList.add('hidden');
  }

  categoryTitle.classList.add('hidden');
  attemptQuiz.classList.add('hidden');
};
hideList();

for (let i = 0; i < categoryBtns.length; i++) {
  categoryBtns[i].addEventListener('click', function () {
    hideList();
    chooseCategory.classList.add('hidden');
    categoryTitle.classList.remove('hidden');
    quizList.classList.remove('hidden');
    for (let i = 0; i < quizListItems.length; i++) {
      quizListItems[i].classList.remove('hidden');
    }
    attemptQuiz.classList.remove('hidden');
  });
}
