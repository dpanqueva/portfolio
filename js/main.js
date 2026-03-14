/**
 * Main entry point for the portfolio application.
 * Initializes theme, loads content, and sets up scroll behaviors.
 */

import { initTheme } from './theme.js';
import { loadPerfil, loadExperiencia, loadEstudios, loadHabilidades, loadContacto } from './loader.js';

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => observer.observe(el));
}

function initNavbar() {
  const navbar = document.querySelector('.pf-navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  const navLinks = document.querySelectorAll('.pf-nav-link');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => sectionObserver.observe(section));
}

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();

  await Promise.all([
    loadPerfil(),
    loadExperiencia(),
    loadEstudios(),
    loadHabilidades(),
    loadContacto()
  ]);

  initReveal();
  initNavbar();
});
