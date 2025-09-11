
// Definição dos Elementos e Temas
const themeSwitcherBtn = document.getElementById('theme-switcher');
const body = document.body;

// Classes de temas
const themes: string[] = ['theme-default', 'theme-blue-orange', 'theme-red-cyan', 'theme-yellow-green-indigo'];

// Lógica para carregar o tema salvo
let currentThemeIndex = 0;

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && themes.includes(savedTheme)) {
    body.classList.add(savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
} else {
    body.classList.add(themes[0]);
}

// Adiciona o Event Listener para o clique
themeSwitcherBtn?.addEventListener('click', () => {
    body.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    body.classList.add(newTheme);

    // Salva a nova escolha no localStorage
    localStorage.setItem('portfolio-theme', newTheme);
});