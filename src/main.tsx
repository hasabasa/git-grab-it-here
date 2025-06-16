
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Обеспечиваем, что корневой элемент существует
const rootElement = document.getElementById("root");
if (!rootElement) {
  const rootDiv = document.createElement("div");
  rootDiv.id = "root";
  document.body.appendChild(rootDiv);
}

// Функция для удаления initial loader
const removeInitialLoader = () => {
  const initialLoader = document.getElementById('initial-loader');
  if (initialLoader) {
    initialLoader.classList.add('fade-out');
    setTimeout(() => {
      initialLoader.remove();
    }, 500);
  }
};

// Рендерим React приложение
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Удаляем initial loader после монтирования React
setTimeout(removeInitialLoader, 100);
