// ==========================================
// Alternância de Temas de Cores
// ==========================================
var themeSwitcherBtn = document.getElementById('theme-switcher');
var bodyElement = document.body;

var themes = ['theme-default', 'theme-blue-orange', 'theme-red-cyan', 'theme-yellow-green-indigo'];
var currentThemeIndex = 0;

var savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && themes.includes(savedTheme)) {
    bodyElement.classList.add(savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
} else {
    bodyElement.classList.add(themes[0]);
}

themeSwitcherBtn?.addEventListener('click', function () {
    bodyElement.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    var newTheme = themes[currentThemeIndex];
    bodyElement.classList.add(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
});

// ==========================================
// Menu de Navegação Mobile
// ==========================================
var mobileMenuToggle = document.getElementById('mobile-menu-toggle');
var navLinksContainer = document.getElementById('nav-links');

mobileMenuToggle?.addEventListener('click', function () {
    var isOpened = navLinksContainer ? navLinksContainer.classList.toggle('nav-open') : false;
    mobileMenuToggle.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
    var icon = mobileMenuToggle.querySelector('i');
    if (icon) {
        icon.className = isOpened ? 'fas fa-times' : 'fas fa-bars';
    }
});

// Fechar menu mobile ao clicar em um link
navLinksContainer?.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        if (navLinksContainer) {
            navLinksContainer.classList.remove('nav-open');
        }
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        var icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    });
});

// ==========================================
// Visualizador Modal de Certificados
// ==========================================
var certModal = document.getElementById('cert-modal');
var certModalTitle = document.getElementById('cert-modal-title');
var certModalIframe = document.getElementById('cert-modal-iframe');
var certModalDownload = document.getElementById('cert-modal-download');
var certModalCloseBtn = document.getElementById('cert-modal-close-btn');
var certButtons = document.querySelectorAll('.btn-open-cert');

function openCertModal(src, title) {
    if (!certModal || !certModalIframe) return;

    if (certModalTitle) {
        certModalTitle.textContent = title || 'Visualizar Certificado';
    }

    if (certModalDownload) {
        certModalDownload.href = src;
    }

    // Adiciona parâmetros para ajustar automaticamente a visualização do PDF à largura do container
    var pdfSrc = (typeof src === 'string' && src.endsWith('.pdf') && !src.includes('#'))
        ? src + '#view=FitH&toolbar=1'
        : src;

    certModalIframe.src = pdfSrc;
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    bodyElement.classList.add('modal-open');
}

function closeCertModal() {
    if (!certModal || !certModalIframe) return;

    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    bodyElement.classList.remove('modal-open');

    // Limpa o src após a transição para liberar memória
    setTimeout(function () {
        if (!certModal.classList.contains('active')) {
            certModalIframe.src = '';
        }
    }, 300);
}

// Event Listeners nos botões de certificados
certButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-cert-src');
        var title = btn.getAttribute('data-cert-title') || 'Visualizar Certificado';
        if (src) {
            openCertModal(src, title);
        }
    });
});

// Botão de fechar
certModalCloseBtn?.addEventListener('click', closeCertModal);

// Fechar ao clicar no overlay de fundo
certModal?.addEventListener('click', function (event) {
    if (event.target === certModal) {
        closeCertModal();
    }
});

// Fechar com a tecla ESC
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && certModal?.classList.contains('active')) {
        closeCertModal();
    }
});

// ==========================================
// Categorias de Projetos Recolhíveis (Accordion)
// ==========================================
var categoryToggleBtns = document.querySelectorAll('.category-toggle-btn');

categoryToggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        var isExpanded = btn.getAttribute('aria-expanded') === 'true';
        var controlsId = btn.getAttribute('aria-controls');
        var targetContainer = controlsId
            ? document.getElementById(controlsId)
            : btn.closest('.project-category-title')?.nextElementSibling;

        if (targetContainer) {
            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                targetContainer.classList.add('collapsed');
            } else {
                btn.setAttribute('aria-expanded', 'true');
                targetContainer.classList.remove('collapsed');
            }
        }
    });
});

