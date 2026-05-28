// Maneja el evento de progreso para la barra de progreso en <model-viewer>
const onProgress = (event) => {
  // Selecciona la barra de progreso y la barra que se actualiza dentro del model-viewer
  const progressBar = event.target.shadowRoot.querySelector('.progress-bar');
  const updatingBar = progressBar ? progressBar.querySelector('.update-bar') : null;

  if (updatingBar) {
    // Actualiza el ancho de la barra de progreso en base al progreso
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  }

  if (event.detail.totalProgress === 1) {
    // Oculta la barra de progreso tras completar la carga
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

// Asegura que el DOM esté listo antes de añadir el listener
window.addEventListener('DOMContentLoaded', () => {
  const modelViewer = document.querySelector('model-viewer');
  if (modelViewer) {
    modelViewer.addEventListener('progress', onProgress);
  }
});
