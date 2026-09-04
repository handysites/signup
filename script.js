const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('lead-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`HandySites inquiry from ${data.get('business')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nBusiness: ${data.get('business')}\nTrade: ${data.get('trade')}\nPhone or email: ${data.get('contact')}\n\nI'm interested in a new HandySites website.`);
  form.querySelector('.form-status').textContent = 'Opening your email app…';
  window.location.href = `mailto:handysites.web@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();

// Remove the photographed paper background from the supplied logo in-browser.
const brandLogo = document.getElementById('brand-logo');
const makeLogoTransparent = () => {
  const canvas = document.createElement('canvas');
  canvas.width = brandLogo.naturalWidth;
  canvas.height = brandLogo.naturalHeight;
  const context = canvas.getContext('2d');
  context.drawImage(brandLogo, 0, 0);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < image.data.length; index += 4) {
    const red = image.data[index];
    const green = image.data[index + 1];
    const blue = image.data[index + 2];
    const lightest = Math.max(red, green, blue);
    const darkest = Math.min(red, green, blue);
    if (darkest > 170 && lightest - darkest < 35) image.data[index + 3] = 0;
  }

  context.putImageData(image, 0, 0);
  const transparentLogo = canvas.toDataURL('image/png');
  brandLogo.src = transparentLogo;
  document.querySelectorAll('.brand-logo-copy').forEach(logo => {
    logo.src = transparentLogo;
    logo.classList.add('is-processed');
  });
  brandLogo.classList.add('is-processed');
};

if (brandLogo.complete) makeLogoTransparent();
else brandLogo.addEventListener('load', makeLogoTransparent, { once: true });
