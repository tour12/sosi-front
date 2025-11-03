
async function fetchJSON(url, options){ options = options || {}; if (!('credentials' in options)) options.credentials = 'include'; const r=await fetch(url, options); if(!r.ok) throw new Error('Network'); return r.json(); }
const el = document.getElementById('cart');

function getCartId(){ return localStorage.getItem('cartId'); }

function row(i){
  return `<tr>
    <td>${i.title} (${i.variant_label})</td>
    <td>ETB ${i.unit_price_snapshot}</td>
    <td>${i.qty}</td>
    <td>ETB ${i.line_total}</td>
  </tr>`;
}

async function render(){
  const cartId = getCartId();
  if (!cartId){
    el.innerHTML = '<div class="section">Your cart is empty.</div>'; return;
  }
  const { data } = await fetchJSON(`${API_BASE}/cart?cartId=${encodeURIComponent(cartId)}`);
  if (!data || !data.items || !data.items.length){
    el.innerHTML = '<div class="section">Your cart is empty.</div>'; return;
  }
  const rows = data.items.map(row).join('');
  el.innerHTML = `<div class="section">
    <table class="table">
      <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div style="text-align:right;margin-top:8px"><strong>Subtotal: ETB ${data.subtotal}</strong></div>
  </div>`;
}
render();
