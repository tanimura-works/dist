'use strict';
const copyButton = document.getElementById('copy-email');
copyButton.addEventListener('click', async () => {
  const email = 'tanimura0525@gmail.com';
  const status = document.getElementById('copy-status');
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const field = document.createElement('textarea');
      field.value = email;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const success = document.execCommand('copy');
      field.remove();
      copyButton.focus();
      if (!success) throw new Error('Copy unavailable');
    }
    status.textContent = 'メールアドレスをコピーしました。';
  } catch {
    status.textContent = 'コピーできませんでした。上のメールアドレスを選択してコピーしてください。';
  }
});

// Keep the real HTML preview fitted to the available card width.
const portfolioViewport = document.querySelector('.preview-viewport');
if (portfolioViewport) {
  const portfolioFrame = portfolioViewport.querySelector('iframe');
  const fitPortfolioPreview = () => {
    portfolioFrame.style.transform = `scale(${portfolioViewport.clientWidth / 1200})`;
  };
  fitPortfolioPreview();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(fitPortfolioPreview).observe(portfolioViewport);
  } else {
    window.addEventListener('resize', fitPortfolioPreview);
  }
}
