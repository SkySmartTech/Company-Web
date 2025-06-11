document.addEventListener("DOMContentLoaded", () => {
  const helpButton = document.getElementById('helpButton');
  const pdfModal = document.getElementById('pdfModal');
  const closeModal = document.getElementById('closeModal');
  const docSelect = document.getElementById('docSelect');
  const pdfViewer = document.getElementById('pdfViewer');
  const videoViewer = document.getElementById('videoViewer');
  const downloadLink = document.getElementById('downloadLink');

  if (!helpButton || !pdfModal || !docSelect) {
    console.warn("Help modal elements not found.");
    return;
  }

  helpButton.addEventListener('click', () => {
    pdfModal.classList.remove('hidden');

    // Automatically load the first option when modal opens
    if (docSelect.options.length > 0) {
      docSelect.selectedIndex = 0;
      docSelect.dispatchEvent(new Event('change'));
    }
  });

  closeModal.addEventListener('click', () => {
    pdfModal.classList.add('hidden');
    videoViewer.pause();
  });

  docSelect.addEventListener('change', () => {
    const selected = docSelect.value;

    // Reset all viewers
    pdfViewer.classList.add('hidden');
    videoViewer.classList.add('hidden');
    downloadLink.classList.add('hidden');

    if (selected.endsWith('.pdf')) {
      pdfViewer.src = selected;
      pdfViewer.classList.remove('hidden');
      downloadLink.href = selected;
      downloadLink.classList.remove('hidden');
    } else if (selected.includes('youtube.com')) {
      window.open(selected, '_blank');
      docSelect.selectedIndex = 0;
    } else if (selected.endsWith('.mp4')) {
      videoViewer.querySelector('source').src = selected;
      videoViewer.load();
      videoViewer.play();
      videoViewer.classList.remove('hidden');
    }
  });
});
