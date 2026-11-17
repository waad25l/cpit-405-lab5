
const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    themeButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    themeButton.setAttribute("aria-pressed", String(isDarkMode));
});

const moreAbout = document.getElementById("more-about");
const showMoreButton = document.getElementById("show-more-button");

showMoreButton.addEventListener("click", function () {
    moreAbout.hidden = !moreAbout.hidden;
    const isExpanded = !moreAbout.hidden;
    showMoreButton.textContent = isExpanded ? "Show Less" : "Show More";
    showMoreButton.setAttribute("aria-expanded", String(isExpanded));
});

const projects = [
    {
        title: "Personal CV Website",
        description: "A personal CV website with education, skills, projects, and contact information. Lab 5 adds interactive features to the original Lab 3 website.",
        category: "Web",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://waad25l.github.io/cpit405-lab3/"
    },
    {
        title: "AI Project Evaluation",
        description: "An AI-powered tool that evaluates student projects using a rubric. Users upload a project and its criteria, and the system provides an evaluation with supporting evidence.",
        category: "Programming",
        technologies: ["Artificial Intelligence", "Document Analysis"],
        link: "https://drive.google.com/drive/folders/1bBwqcu9ouwSlu06m5fX6sP9_wZ_1rbfW"
    }
];

const projectsContainer = document.getElementById("projects-container");
const filterButtons = document.querySelectorAll(".filter-button");
let currentFilter = "All";

function renderProjects(category) {
    projectsContainer.replaceChildren();
    currentFilter = category;

    const visibleProjects = projects.filter(function (project) {
        return category === "All" || project.category === category;
    });

    visibleProjects.forEach(function (project) {
        const card = document.createElement("article");
        card.className = "project-card";

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const categoryText = document.createElement("p");
        categoryText.className = "project-category";
        categoryText.textContent = "Category: " + project.category;

        const technologies = document.createElement("p");
        technologies.textContent = "Technologies: " + project.technologies.join(", ");

        const link = document.createElement("a");
        link.href = project.link;
        link.textContent = "View Project";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(categoryText);
        card.appendChild(technologies);
        card.appendChild(link);

        projectsContainer.appendChild(card);
    });

    filterButtons.forEach(function (button) {
        const isActive = button.dataset.filter === category;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        renderProjects(button.dataset.filter);
    });
});

renderProjects("All");

const printButton = document.getElementById("print-button");
printButton.addEventListener("click", function () {
    window.print();
});

let filterBeforePrint = null;
window.addEventListener("beforeprint", function () {
    filterBeforePrint = currentFilter;
    renderProjects("All");
});

window.addEventListener("afterprint", function () {
    if (filterBeforePrint !== null) {
        renderProjects(filterBeforePrint);
        filterBeforePrint = null;
    }
});
