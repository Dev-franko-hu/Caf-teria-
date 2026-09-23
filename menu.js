const products = {
  salgados: [
    { id: 1, name: 'Coxinha', price: 12, desc: 'Clássica e crocante.' },
    { id: 2, name: 'Pastel de queijo', price: 14, desc: 'Frito e delicioso.' },
    { id: 3, name: 'Pão de queijo', price: 10, desc: 'Quentinho e macio.' },
    { id: 4, name: 'Esfiha', price: 16, desc: 'Saborosa e bem recheada.' },
    { id: 5, name: 'Kibe', price: 15, desc: 'Uma opção muito pedida.' },
    { id: 6, name: 'Salgado de frango', price: 13, desc: 'Ótimo para acompanhar café.' }
  ],
  cafes: [
    { id: 7, name: 'Café expresso', price: 6, desc: 'Intenso e aromático.' },
    { id: 8, name: 'Café preto', price: 7, desc: 'Forte e tradicional.' },
    { id: 9, name: 'Cappuccino', price: 14, desc: 'Creme e sabor suave.' },
    { id: 10, name: 'Mocha', price: 16, desc: 'Com toque de chocolate.' },
    { id: 11, name: 'Café com leite', price: 12, desc: 'Clássico e acolhedor.' },
    { id: 12, name: 'Café gelado', price: 13, desc: 'Refrescante e saboroso.' }
  ],
  bebidas: [
    { id: 13, name: 'Refrigerante lata', price: 8, desc: 'Coca, Guaraná, Sprite e Fanta.' },
    { id: 14, name: 'Água mineral', price: 5, desc: 'Fresca e gelada.' },
    { id: 15, name: 'Suco natural', price: 10, desc: 'Refrescante e natural.' },
    { id: 16, name: 'Chá gelado', price: 9, desc: 'Leve e refrescante.' }
  ]
};

const categories = document.querySelectorAll('.category-tab');
const productsGrid = document.getElementById('productsGrid');
const orderItems = document.getElementById('orderItems');
const orderCount = document.getElementById('orderCount');
const orderTotal = document.getElementById('orderTotal');
const contactForm = document.getElementById('contactForm');
const whatsappOrder = document.querySelector('.whatsapp-order');

let selectedCategory = 'salgados';
let order = [];

function money(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProducts() {
  productsGrid.innerHTML = products[selectedCategory].map(product => `
    <article class="product-card">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="product-footer">
        <span class="product-price">${money(product.price)}</span>
        <button class="product-add" type="button" data-id="${product.id}">Adicionar</button>
      </div>
    </article>
  `).join('');
}

function updateOrder() {
  if (!order.length) {
    orderItems.innerHTML = '<p>Adicione itens do cardápio.</p>';
    orderCount.textContent = '0 itens';
    orderTotal.textContent = money(0);
    return;
  }

  const total = order.reduce((sum, item) => sum + item.price, 0);
  orderItems.innerHTML = order.map(item => `
    <div class="order-item"><span>${item.name}</span><strong>${money(item.price)}</strong></div>
  `).join('');
  orderCount.textContent = `${order.length} ${order.length === 1 ? 'item' : 'itens'}`;
  orderTotal.textContent = money(total);
}

function orderMessage() {
  const total = order.reduce((sum, item) => sum + item.price, 0);
  const items = order.length ? order.map(item => `- ${item.name}: ${money(item.price)}`).join('\n') : 'Ainda não selecionei itens.';
  return `Olá, quero fazer um pedido no Café Varanda.\n\n${items}\n\nTotal estimado: ${money(total)}`;
}

categories.forEach(button => {
  button.addEventListener('click', () => {
    categories.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    selectedCategory = button.dataset.category;
    renderProducts();
  });
});

productsGrid.addEventListener('click', event => {
  const button = event.target.closest('.product-add');
  if (!button) return;
  const item = Object.values(products).flat().find(product => product.id === Number(button.dataset.id));
  if (!item) return;
  order.push(item);
  updateOrder();
  whatsappOrder.href = `https://wa.me/5511987654321?text=${encodeURIComponent(orderMessage())}`;
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = contactForm.querySelector('input[type="text"]').value.trim();
  const phone = contactForm.querySelector('input[type="tel"]').value.trim();
  const message = contactForm.querySelector('textarea').value.trim();
  const text = encodeURIComponent(`Olá, quero falar com o Café Varanda. Nome: ${name}. Telefone: ${phone}. Mensagem: ${message}`);
  window.open(`https://wa.me/5511987654321?text=${text}`, '_blank', 'noopener');
});

renderProducts();
updateOrder();
