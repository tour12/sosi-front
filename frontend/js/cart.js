const API_URL = 'http://72.61.91.30:3008';

// Utility function to escape HTML to prevent XSS
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function fetchJSON(url, options) {
  options = options || {};
  if (!('credentials' in options)) options.credentials = 'include';
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch cart data. Please check your connection.');
  }
}

const el = document.getElementById('cart');

function getCartId() {
  return localStorage.getItem('cartId');
}

function row(item) {
  const title = escapeHtml(item.title || 'Unknown Product');
  const variant = escapeHtml(item.variant_label || '');
  const price = item.unit_price_snapshot || 0;
  const quantity = item.qty || 0;
  const lineTotal = item.line_total || 0;

  return `<tr>
    <td>${title}${variant ? ` (${variant})` : ''}</td>
    <td>ETB ${price.toLocaleString()}</td>
    <td>${quantity}</td>
    <td>ETB ${lineTotal.toLocaleString()}</td>
  </tr>`;
}

function showLoading() {
  el.innerHTML = '<div class="section"><p>Loading your cart...</p></div>';
}

function showError(message) {
  el.innerHTML = `<div class="section"><p class="error">${escapeHtml(message)}</p></div>`;
}

function showEmptyCart() {
  el.innerHTML = '<div class="section"><p>Your cart is empty.</p></div>';
}

async function render() {
  if (!el) {
    console.error('Cart element not found');
    return;
  }

  showLoading();

  try {
    const cartId = getCartId();
    if (!cartId) {
      showEmptyCart();
      return;
    }

    const data = await fetchJSON(
      `${API_URL}/cart?cartId=${encodeURIComponent(cartId)}`
    );

    // Handle different response structures
    const cartData = data.data || data;
    
    if (!cartData || !cartData.items || !cartData.items.length) {
      showEmptyCart();
      return;
    }

    const rows = cartData.items.map(row).join('');
    const subtotal = cartData.subtotal || cartData.items.reduce((sum, item) => sum + (item.line_total || 0), 0);
    
    el.innerHTML = `<div class="section">
      <table class="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="text-align: right; margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;">
        <strong>Subtotal: ETB ${subtotal.toLocaleString()}</strong>
      </div>
    </div>`;

  } catch (error) {
    console.error('Render error:', error);
    showError(error.message || 'Failed to load cart. Please try again.');
  }
}

// Initialize cart when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
