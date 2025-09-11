// Definição dos Elementos e Temas
var themeSwitcherBtn = document.getElementById('theme-switcher');
var body = document.body;
// Classes de temas
var themes = ['theme-default', 'theme-blue-orange', 'theme-red-cyan', 'theme-yellow-green-indigo'];
// Lógica para carregar o tema salvo
var currentThemeIndex = 0;
var savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && themes.includes(savedTheme)) {
    body.classList.add(savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
}
else {
    body.classList.add(themes[0]);
}
// Adiciona o Event Listener para o clique
themeSwitcherBtn === null || themeSwitcherBtn === void 0 ? void 0 : themeSwitcherBtn.addEventListener('click', function () {
    body.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    var newTheme = themes[currentThemeIndex];
    body.classList.add(newTheme);
    // Salva a nova escolha no localStorage
    localStorage.setItem('portfolio-theme', newTheme);
});
