
async function fetchJSON(url){ const r=await fetch(url, { credentials: 'include' }); if(!r.ok) throw new Error('Network'); return r.json(); }
const list = document.getElementById('list');
const catSel = document.getElementById('category');
const params = new URLSearchParams(location.search);

async function loadCategories(){
  const cats = await fetchJSON(`${API_BASE}/categories`);
  catSel.innerHTML = '<option value="">All</option>' + cats.data.map(c=>`<option value="${c.slug}">${c.name}</option>`).join('');
  if (params.get('category')) catSel.value = params.get('category');
}

function card(p){
  const img = (p.images && p.images[0]) ? p.images[0].image_url : '../assets/images/placeholder.png';
  return `
  <a class="card" href="product.html?slug=${encodeURIComponent(p.slug)}">
    <img src="${img}" style="width:100%;height:180px;object-fit:cover;background:#e5e7eb">
    <div class="p">
      <div class="badge">${p.type}</div>
      <h3 style="margin:8px 0">${p.title}</h3>
      <div class="price">ETB ${p.base_price}</div>
    </div>
  </a>`;
}

async function loadProducts(){
  const q = document.getElementById('q').value;
  const type = document.getElementById('type').value;
  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;
  const category = catSel.value;
  const url = new URL(`${API_BASE}/products`);
  if (q) url.searchParams.set('q', q);
  if (type) url.searchParams.set('type', type);
  if (minPrice) url.searchParams.set('minPrice', minPrice);
  if (maxPrice) url.searchParams.set('maxPrice', maxPrice);
  if (category) url.searchParams.set('category', category);
  url.searchParams.set('limit','24');
  const data = await fetchJSON(url.toString());
  list.innerHTML = data.data.map(card).join('');
}

document.getElementById('apply').addEventListener('click', loadProducts);
loadCategories().then(loadProducts);
