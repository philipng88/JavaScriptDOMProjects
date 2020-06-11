const canvas = document.getElementById('pdf-render');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageNumDisplay = document.getElementById('page-num');
const pageCountDisplay = document.getElementById('page-count');
const topBar = document.querySelector('.top-bar');

const url = './pdf.pdf';
const scale = 1.5;
const ctx = canvas.getContext('2d');

let pdfDoc = null;
let pageNum = 1;
let pageIsRendering = false;
let pageNumIsPending = null;

const renderPage = num => {
  pageIsRendering = true;
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale });
    const renderContext = { canvasContext: ctx, viewport };
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render(renderContext).promise.then(() => {
      pageIsRendering = false;
      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });
    pageNumDisplay.textContent = num;
  });
};

const queueRenderPage = num => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

const showPrevPage = () => {
  if (pageNum <= 1) return;
  pageNum--;
  queueRenderPage(pageNum);
};

const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  queueRenderPage(pageNum);
};

// eslint-disable-next-line no-undef
pdfjsLib
  .getDocument(url)
  .promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    pageCountDisplay.textContent = pdfDoc.numPages;
    renderPage(pageNum);
  })
  .catch(err => {
    canvas.insertAdjacentHTML(
      'beforebegin',
      `<div class='error'>${err.message}</div>`
    );
    topBar.style.display = 'none';
  });

prevBtn.addEventListener('click', showPrevPage);
nextBtn.addEventListener('click', showNextPage);
