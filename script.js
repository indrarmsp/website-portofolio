/**
 * Indra's Developer Portfolio
 * Vanilla JavaScript + GSAP + GitHub REST API integration + Theme Mode Toggle
 */

const GITHUB_USERNAME = 'indrarmsp';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const MAX_INITIAL_REPOS = 6;

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // Initialize UI components
  initLucideIcons();
  initThemeToggle();
  initMobileNav();
  initEntranceAnimations();

  // Fetch GitHub API data
  fetchGitHubProfile();
  fetchGitHubRepos();
});

/**
 * Initialize Lucide Icons safely
 */
function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/**
 * Dark / Light Mode Toggle Logic with LocalStorage & OS Preference
 */
function initThemeToggle() {
  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const themeLabels = document.querySelectorAll('.theme-toggle-label');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      themeLabels.forEach((label) => {
        label.textContent = 'Dark Mode';
      });
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      themeLabels.forEach((label) => {
        label.textContent = 'Light Mode';
      });
    }
    // Update Lucide SVG icons if needed
    initLucideIcons();
  };

  // Check current applied theme
  const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  applyTheme(currentTheme);

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isCurrentlyLight = document.documentElement.classList.contains('light');
      const newTheme = isCurrentlyLight ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  });

  // Listen to OS preference changes if no manual preference has been set
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Mobile Navigation Logic & Keyboard Accessibility
 */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  let isOpen = false;

  const toggleMenu = (open) => {
    isOpen = typeof open === 'boolean' ? open : !isOpen;
    menuBtn.setAttribute('aria-expanded', isOpen.toString());

    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  };

  menuBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu(false);
      menuBtn.focus();
    }
  });
}

/**
 * GSAP Entrance & ScrollTrigger Animations
 */
function initEntranceAnimations() {
  // Respect reduced-motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero section entrance
  gsap.from('.hero-content > *', {
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
  });

  // About cards reveal
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.from('.about-card', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all',
    });

    // Technical skills categories
    gsap.from('.skill-category', {
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 80%',
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      clearProps: 'all',
    });

    // GitHub stats cards
    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: '#metrics',
        start: 'top 85%',
      },
      opacity: 0,
      y: 15,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'all',
    });
  }
}

/**
 * Fetch GitHub Profile details (public repos, followers, following)
 */
async function fetchGitHubProfile() {
  const reposEl = document.getElementById('stat-repos');
  const followersEl = document.getElementById('stat-followers');
  const followingEl = document.getElementById('stat-following');

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Profile fetch failed: ${response.status}`);
    }

    const data = await response.json();

    if (reposEl) reposEl.textContent = Number(data.public_repos || 0).toLocaleString();
    if (followersEl) followersEl.textContent = Number(data.followers || 0).toLocaleString();
    if (followingEl) followingEl.textContent = Number(data.following || 0).toLocaleString();
  } catch (error) {
    console.warn('Could not load GitHub statistics:', error);
    // Keep fallback indicators or clean defaults
    if (reposEl && reposEl.textContent === '-') reposEl.textContent = '10+';
    if (followersEl && followersEl.textContent === '-') followersEl.textContent = '0';
    if (followingEl && followingEl.textContent === '-') followingEl.textContent = '0';
  }
}

/**
 * Fetch public GitHub repositories
 */
async function fetchGitHubRepos() {
  const container = document.getElementById('projects-container');
  const errorBox = document.getElementById('projects-error');
  const errorMsg = document.getElementById('projects-error-message');
  const footerCta = document.getElementById('projects-footer');

  try {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please view repositories directly on GitHub.');
      }
      throw new Error(`Unable to load repositories (HTTP ${response.status}).`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error('Unexpected data received from GitHub.');
    }

    // Filter out forks
    const ownRepos = repos.filter((repo) => repo.fork === false);

    if (ownRepos.length === 0) {
      showErrorState(
        container,
        errorBox,
        errorMsg,
        'No public non-forked repositories found. Please visit GitHub directly.'
      );
      return;
    }

    // Render repository cards
    renderRepoCards(ownRepos.slice(0, MAX_INITIAL_REPOS), container);

    if (footerCta) {
      footerCta.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    showErrorState(
      container,
      errorBox,
      errorMsg,
      error.message || 'Unable to retrieve projects at this time.'
    );
  }
}

/**
 * Helper to display error banner and remove skeleton
 */
function showErrorState(container, errorBox, errorMsg, message) {
  if (container) container.innerHTML = '';
  if (errorBox) {
    errorBox.classList.remove('hidden');
    if (errorMsg && message) errorMsg.textContent = message;
  }
}

/**
 * Render Project Cards using secure DOM manipulation
 * (Avoids raw innerHTML injection of untrusted user data)
 */
function renderRepoCards(repos, container) {
  if (!container) return;

  // Clear skeletons
  container.innerHTML = '';

  repos.forEach((repo) => {
    // Top-level card wrapper
    const card = document.createElement('article');
    card.className =
      'project-card p-6 rounded-xl bg-surface border border-border flex flex-col justify-between group';

    // Top section: Repo title & link
    const topDiv = document.createElement('div');

    const headerRow = document.createElement('div');
    headerRow.className = 'flex items-start justify-between gap-2 mb-2';

    const titleContainer = document.createElement('div');
    titleContainer.className = 'flex items-center gap-2 overflow-hidden';

    // Folder Icon
    const folderIcon = document.createElement('i');
    folderIcon.setAttribute('data-lucide', 'folder-code');
    folderIcon.className = 'w-4 h-4 text-muted shrink-0';
    titleContainer.appendChild(folderIcon);

    const titleLink = document.createElement('a');
    titleLink.href = repo.html_url;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.className =
      'text-base font-bold font-mono text-text-main group-hover:text-muted transition-colors truncate focus:outline-none focus-visible:ring-1 focus-visible:ring-current rounded';
    titleLink.textContent = repo.name;
    titleContainer.appendChild(titleLink);

    headerRow.appendChild(titleContainer);

    const extLink = document.createElement('a');
    extLink.href = repo.html_url;
    extLink.target = '_blank';
    extLink.rel = 'noopener noreferrer';
    extLink.setAttribute('aria-label', `Visit ${repo.name} repository on GitHub`);
    extLink.className =
      'text-muted hover:text-text-main p-1 rounded hover:bg-elevated transition-colors shrink-0';

    const extIcon = document.createElement('i');
    extIcon.setAttribute('data-lucide', 'arrow-up-right');
    extIcon.className = 'w-4 h-4';
    extLink.appendChild(extIcon);

    headerRow.appendChild(extLink);
    topDiv.appendChild(headerRow);

    // Repo Description
    const desc = document.createElement('p');
    desc.className = 'text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed mb-4';
    desc.textContent = repo.description || 'No description provided for this repository.';
    topDiv.appendChild(desc);

    card.appendChild(topDiv);

    // Bottom section: Metadata (Language, Stars, Forks, Updated Date)
    const bottomDiv = document.createElement('div');
    bottomDiv.className = 'pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted';

    // Left: Language badge
    const leftMeta = document.createElement('div');
    leftMeta.className = 'flex items-center gap-2';

    const langBadge = document.createElement('span');
    langBadge.className =
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-elevated border border-border text-text-main';

    const langDot = document.createElement('span');
    langDot.className = 'w-1.5 h-1.5 rounded-full bg-subtle';
    langBadge.appendChild(langDot);

    const langText = document.createTextNode(repo.language || 'Plain Text');
    langBadge.appendChild(langText);

    leftMeta.appendChild(langBadge);
    bottomDiv.appendChild(leftMeta);

    // Right: Stars & Forks count + Updated
    const rightMeta = document.createElement('div');
    rightMeta.className = 'flex items-center gap-3 font-mono text-[11px]';

    // Stars
    const starSpan = document.createElement('span');
    starSpan.className = 'flex items-center gap-1 text-muted hover:text-text-main transition-colors';
    const starIcon = document.createElement('i');
    starIcon.setAttribute('data-lucide', 'star');
    starIcon.className = 'w-3.5 h-3.5';
    starSpan.appendChild(starIcon);
    starSpan.appendChild(document.createTextNode(repo.stargazers_count.toString()));
    rightMeta.appendChild(starSpan);

    // Forks
    const forkSpan = document.createElement('span');
    forkSpan.className = 'flex items-center gap-1 text-muted hover:text-text-main transition-colors';
    const forkIcon = document.createElement('i');
    forkIcon.setAttribute('data-lucide', 'git-fork');
    forkIcon.className = 'w-3.5 h-3.5';
    forkSpan.appendChild(forkIcon);
    forkSpan.appendChild(document.createTextNode(repo.forks_count.toString()));
    rightMeta.appendChild(forkSpan);

    // Updated date
    const updatedSpan = document.createElement('span');
    updatedSpan.className = 'text-subtle hidden sm:inline';
    updatedSpan.textContent = formatDate(repo.updated_at);
    rightMeta.appendChild(updatedSpan);

    bottomDiv.appendChild(rightMeta);
    card.appendChild(bottomDiv);

    container.appendChild(card);
  });

  // Re-generate icons inside newly mounted cards
  initLucideIcons();

  // Trigger GSAP reveal for project cards if available
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    gsap.from(container.children, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'all',
    });

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }
}

/**
 * Format ISO Date string (e.g. "Updated Jan 2024")
 */
function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  } catch {
    return '';
  }
}
