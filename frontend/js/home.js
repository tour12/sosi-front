
async function fetchJSON(url){ const r=await fetch(url, { credentials: 'include' }); if(!r.ok) throw new Error('Network'); return r.json(); }

async function initHome(){
  // categories
  try{
    const cats = await fetchJSON(`${API_BASE}/categories`);
    const grid = document.getElementById('cat-grid');
    grid.innerHTML = cats.data.map(c => `
      <a class="card p" href="pages/shop.html?category=${encodeURIComponent(c.slug)}">
        <div class="p">
          <div class="badge">${c.name}</div>
          <p style="color:#6b7280;margin-top:8px">Shop ${c.name}</p>
        </div>
      </a>`).join('');
  }catch(e){}

  // best sellers
  try{
    const prods = await fetchJSON(`${API_BASE}/products?sort=popular&limit=8`);
    const grid = document.getElementById('best-grid');
    grid.innerHTML = prods.data.map(p => productCard(p)).join('');
  }catch(e){}
}

function productCard(p){
  const img = (p.images && p.images[0]) ? p.images[0].image_url : '../assets/images/placeholder.png';
  return `
  <a class="card" href="pages/product.html?slug=${encodeURIComponent(p.slug)}">
    <img src="${img}" alt="${p.title}" style="width:100%;height:180px;object-fit:cover;background:#e5e7eb">
    <div class="p">
      <div class="badge">${p.type}</div>
      <h3 style="margin:8px 0">${p.title}</h3>
      <div class="price">ETB ${p.base_price}</div>
    </div>
  </a>`;
}

initHome();
