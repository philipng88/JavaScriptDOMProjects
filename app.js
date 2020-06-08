const projectsList = document.getElementById('projects');
const projectCount = document.getElementById('projectCount');

// Populate projects list
const getProjects = async () => {
  const response = await fetch('./projects.json');
  const data = await response.json();
  data.forEach(({ directory, title }) =>
    projectsList.insertAdjacentHTML(
      'beforeend',
      `
      <li class='collection-item'>
        <a href=${directory}/index.html>${title}</a>
      </li>
      `
    )
  );
  // show project count
  projectCount.textContent = data.length || projectsList.childElementCount;
};
getProjects();

// Search filter
const filterInput = document.getElementById('filterInput');
const filterProjects = () => {
  const filterValue = filterInput.value.toUpperCase();
  const projects = projectsList.querySelectorAll('li.collection-item');
  projects.forEach(project => {
    const projectName = project.firstElementChild.innerText;
    projectName.toUpperCase().includes(filterValue)
      ? project.classList.remove('hide')
      : project.classList.add('hide');
  });
};
filterInput.addEventListener('keyup', filterProjects);

// Scroll to top
const scrollTopBtnContainer = document.querySelector('.fixed-action-btn');
const breakpoint = 20;
window.onscroll = () => {
  document.body.scrollTop > breakpoint ||
  document.documentElement.scrollTop > breakpoint
    ? scrollTopBtnContainer.classList.remove('hide')
    : scrollTopBtnContainer.classList.add('hide');
};
const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
document
  .getElementById('ScrollToTopBtn')
  .addEventListener('click', scrollToTop);
