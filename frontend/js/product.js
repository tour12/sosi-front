
async function fetchJSON(url){ const r=await fetch(url, { credentials: 'include' }); if(!r.ok) throw new Error('Network'); return r.json(); }
const el = document.getElementById('product');
const slug = new URLSearchParams(location.search).get('slug');

function saveCartId(id){ localStorage.setItem('cartId', id); }
function getCartId(){ return localStorage.getItem('cartId'); }

function variantOption(v){ return `<option value="${v.id}">${v.length_label || (v.length_cm+'cm')} — ${v.color_name} — ETB ${v.price || v.base_price}</option>`; }

async function render(){
  const { data } = await fetchJSON(`${API_BASE}/products/${slug}`);
  const img = (data.images && data.images[0]) ? data.images[0].image_url : '../assets/images/placeholder.png';
  el.innerHTML = `
    <div class="section">
      <div class="row">
        <img src="${img}" style="width:360px;height:360px;object-fit:cover;border-radius:12px;background:#e5e7eb">
        <div style="flex:1;min-width:260px">
          <div class="badge">${data.type}</div>
          <h1 style="margin:8px 0">${data.title}</h1>
          <p style="color:#6b7280">${data.description||''}</p>
          <div class="row" style="margin:10px 0">
            <div style="flex:1">
              <label>Variant</label>
              <select id="variant">${data.variants.map(variantOption).join('')}</select>
            </div>
            <div style="width:120px">
              <label>Qty</label>
              <input id="qty" type="number" class="input" value="1" min="1">
            </div>
          </div>
          <div class="row">
            <button class="btn" id="add">Add to Cart</button>
            <a class="btn-outline" href="cart.html">Go to Cart</a>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById('add').addEventListener('click', addToCart);
}

async function addToCart(){
  const variantId = document.getElementById('variant').value;
  const qty = parseInt(document.getElementById('qty').value||'1',10);
  const cartId = getCartId();
  const res = await fetch(`${API_BASE}/cart/items`, {
    method:'PUT',
    credentials: 'include',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ cartId, item:{ variantId, qty } })
  });
  const data = await res.json();
  if (data.success){
    if (data.cartId) saveCartId(data.cartId);
    alert('Added to cart');
  } else {
    alert('Failed to add to cart');
  }
}

render();
