
// ==========================================
// Alternância de Temas de Cores
// ==========================================
const themeSwitcherBtn = document.getElementById('theme-switcher');
const bodyElement = document.body;

const themes: string[] = ['theme-default', 'theme-blue-orange', 'theme-red-cyan', 'theme-yellow-green-indigo'];
let currentThemeIndex = 0;

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && themes.includes(savedTheme)) {
    bodyElement.classList.add(savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
} else {
    bodyElement.classList.add(themes[0]);
}

themeSwitcherBtn?.addEventListener('click', () => {
    bodyElement.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    bodyElement.classList.add(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
});

// ==========================================
// Menu de Navegação Mobile
// ==========================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle') as HTMLButtonElement | null;
const navLinksContainer = document.getElementById('nav-links') as HTMLElement | null;

mobileMenuToggle?.addEventListener('click', () => {
    const isOpened = navLinksContainer?.classList.toggle('nav-open') ?? false;
    mobileMenuToggle.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
    const icon = mobileMenuToggle.querySelector('i');
    if (icon) {
        icon.className = isOpened ? 'fas fa-times' : 'fas fa-bars';
    }
});

// Fechar menu mobile ao clicar em um link
navLinksContainer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('nav-open');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    });
});

// ==========================================
// Visualizador Modal de Certificados
// ==========================================
const certModal = document.getElementById('cert-modal') as HTMLElement | null;
const certModalTitle = document.getElementById('cert-modal-title') as HTMLElement | null;
const certModalIframe = document.getElementById('cert-modal-iframe') as HTMLIFrameElement | null;
const certModalDownload = document.getElementById('cert-modal-download') as HTMLAnchorElement | null;
const certModalCloseBtn = document.getElementById('cert-modal-close-btn') as HTMLElement | null;
const certButtons = document.querySelectorAll<HTMLButtonElement>('.btn-open-cert');

function openCertModal(src: string, title: string): void {
    if (!certModal || !certModalIframe) return;

    if (certModalTitle) {
        certModalTitle.textContent = title || 'Visualizar Certificado';
    }

    if (certModalDownload) {
        certModalDownload.href = src;
    }

    // Adiciona parâmetros para ajustar automaticamente a visualização do PDF à largura do container
    const pdfSrc = src.endsWith('.pdf') && !src.includes('#') 
        ? `${src}#view=FitH&toolbar=1` 
        : src;

    certModalIframe.src = pdfSrc;
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    bodyElement.classList.add('modal-open');
}

function closeCertModal(): void {
    if (!certModal || !certModalIframe) return;

    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    bodyElement.classList.remove('modal-open');

    // Limpa o src após a transição para liberar memória e evitar consumo desnecessário
    setTimeout(() => {
        if (!certModal.classList.contains('active')) {
            certModalIframe.src = '';
        }
    }, 300);
}

// Event Listeners nos botões de certificados
certButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-cert-src');
        const title = btn.getAttribute('data-cert-title') || 'Visualizar Certificado';
        if (src) {
            openCertModal(src, title);
        }
    });
});

// Botão de fechar
certModalCloseBtn?.addEventListener('click', closeCertModal);

// Fechar ao clicar no overlay de fundo
certModal?.addEventListener('click', (event: MouseEvent) => {
    if (event.target === certModal) {
        closeCertModal();
    }
});

// Fechar com a tecla ESC
document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && certModal?.classList.contains('active')) {
        closeCertModal();
    }
});