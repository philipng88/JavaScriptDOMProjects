const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

const limit = 5;
let page = 1;

const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
};

const showPosts = async () => {
  const posts = await getPosts();
  posts.forEach(post => {
    postsContainer.insertAdjacentHTML(
      'beforeend',
      `
      <div class="post">
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
      </div>
    `
    );
  });
};

const showLoading = () => {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};

const filterPosts = event => {
  const searchValue = event.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    if (title.indexOf(searchValue) > -1 || body.indexOf(searchValue) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) showLoading();
});

filter.addEventListener('input', filterPosts);
