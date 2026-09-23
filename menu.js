document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-card form');
  const whatsappLink = document.querySelector('.whatsapp-float');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nome = form.querySelector('input[type="text"]')?.value?.trim() || '';
      const email = form.querySelector('input[type="email"]')?.value?.trim() || '';
      const mensagem = form.querySelector('textarea')?.value?.trim() || '';

      const text = encodeURIComponent(
        `Olá, quero falar com o Café Varanda.\nNome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`
      );

      window.open(`https://wa.me/5511987654321?text=${text}`, '_blank', 'noopener');
    });
  }

  if (whatsappLink) {
    whatsappLink.setAttribute(
      'href',
      'https://wa.me/5511987654321?text=Ol%C3%A1%2C%20quero%20fazer%20um%20pedido%20no%20Caf%C3%A9%20Varanda.'
    );
  }
});
