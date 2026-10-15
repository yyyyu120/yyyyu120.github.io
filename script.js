const navigationLinks = [...document.querySelectorAll('.site-header nav a[data-section]')];
const trackedSections = ['about', 'news', 'publications', 'service']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function updateActiveSection() {
  const marker = window.scrollY + Math.min(180, window.innerHeight * 0.32);
  let activeId = 'about';

  for (const section of trackedSections) {
    if (section.offsetTop <= marker) activeId = section.id;
  }

  for (const link of navigationLinks) {
    if (link.dataset.section === activeId) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

let updateScheduled = false;
window.addEventListener('scroll', () => {
  if (updateScheduled) return;
  updateScheduled = true;
  requestAnimationFrame(() => {
    updateActiveSection();
    updateScheduled = false;
  });
}, { passive: true });

window.addEventListener('resize', updateActiveSection);
updateActiveSection();
