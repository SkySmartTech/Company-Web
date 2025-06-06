document.addEventListener("DOMContentLoaded", () => {
  const helpButton = document.getElementById('helpButton');
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');
  const docSelect = document.getElementById('docSelect');
  const pdfViewer = document.getElementById('pdfViewer');
  const videoViewer = document.getElementById('videoViewer');
  const downloadLink = document.getElementById('downloadLink');

  if (!helpButton || !pdfModal) return; // Exit if modal isn't on the page

  helpButton.addEventListener('click', () => {
    pdfModal.classList.remove('hidden');
  });

  closeModal.addEventListener('click', () => {
    pdfModal.classList.add('hidden');
    videoViewer.pause();
  });

  docSelect.addEventListener('change', () => {
    const selected = docSelect.value;

    if (selected.endsWith('.pdf')) {
      pdfViewer.classList.remove('hidden');
      videoViewer.classList.add('hidden');
      pdfViewer.src = selected;
      downloadLink.href = selected;
      downloadLink.classList.remove('hidden');
    } else if (selected.endsWith('.mp4') || selected.startsWith('http')) {
      videoViewer.classList.remove('hidden');
      pdfViewer.classList.add('hidden');
      videoViewer.querySelector('source').src = selected;
      videoViewer.load();
      videoViewer.play();
      downloadLink.classList.add('hidden');
    }
  });
});
