
// Simple header/footer component injection
const header = document.getElementById('site-header');
if (header) {
  header.innerHTML = `
    <div class="nav container">
      <a class="logo" href="/sosi-hair-store/frontend/index.html">Sosi Hair Store</a>
      <nav class="nav-links">
        <a href="/sosi-hair-store/frontend/pages/shop.html">Shop</a>
        <a href="/sosi-hair-store/frontend/pages/cart.html">Cart</a>
        <a href="/sosi-hair-store/frontend/pages/order.html">Track Order</a>
        <a href="/sosi-hair-store/frontend/pages/admin/login.html">Admin</a>
      </nav>
    </div>`;
}
const footer = document.getElementById('site-footer');
if (footer) {
  footer.innerHTML = `
    <div class="foot container">
      <small>© ${new Date().getFullYear()} Sosi Hair Store</small>
      <small><a href="#">Privacy</a> · <a href="#">Returns</a> · <a href="#">Contact</a></small>
    </div>`;
}
// Base API URL
window.API_BASE = (location.hostname === 'localhost')
  ? 'http://localhost:3008/api'
  : '/api';
