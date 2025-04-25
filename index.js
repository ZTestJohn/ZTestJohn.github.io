const texts = [
  "Eu realmente gosto de programar",
  "React é uma ótima invenção humana",
  "Fullstack um dia chegará",
  "Estudar é investir no futuro",
  "Como se alinha uma div?",
  "Um dia eu vi uma margem negativa...",
];
let count = 0;
let index = 0;
let currentText = "";
let isDeleting = false;

(function type() {
  if (count === texts.length) {
    count = 0;
  }

  currentText = texts[count];

  if (isDeleting) {
    index--;
  } else {
    index++;
  }

  document.querySelector(".typing-effect").textContent = currentText.slice(
    0,
    index
  );

  if (!isDeleting && index === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    count++;
    setTimeout(type, 500);
  } else {
    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
  }
})();
