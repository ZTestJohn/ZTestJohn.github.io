import getGithubToken from "./token/github_token.js";

const { github_token } = getGithubToken();

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

async function fetchRepositories() {
  const username = "ZTestJohn";
  const projectsContainer = document.querySelector(".projects");
  const token = github_token; 

  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`Erro na API: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    for (const repo of repos) {
      const languagesResponse = await fetch(repo.languages_url);
      const languages = await languagesResponse.json();

      const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
      const mainLanguage = Object.keys(languages)[0] || "N/A";
      const mainLanguagePercentage = totalBytes
        ? ((languages[mainLanguage] / totalBytes) * 100).toFixed(2)
        : "0";

      const card = document.createElement("div");
      card.classList.add("card-project");

      card.innerHTML = `
        <a class="repository-name" href="${repo.html_url}" target="_blank">${
        repo.name
      }</a>
        <p class="project-description">${
          repo.description || "Sem descrição disponível"
        }</p>
        <p class="project-language">${mainLanguage} - ${mainLanguagePercentage}%</p>
      `;
      projectsContainer.appendChild(card);
    }
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRepositories();
});