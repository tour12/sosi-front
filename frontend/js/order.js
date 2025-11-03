
async function fetchJSON(url){ const r=await fetch(url, { credentials: 'include' }); if(!r.ok) throw new Error('Network'); return r.json(); }
const code = new URLSearchParams(location.search).get('code');
const box = document.getElementById('box');

async function render(){
  if (!code){ box.innerHTML = 'No order code provided.'; return; }
  try{
    const { data } = await fetchJSON(`${API_BASE}/orders/${encodeURIComponent(code)}`);
    box.innerHTML = `
      <div><strong>Order:</strong> ${data.order_code}</div>
      <div><strong>Status:</strong> ${data.status}</div>
      <div><strong>Total:</strong> ETB ${data.total}</div>
      <div style="margin-top:8px;color:#6b7280">We will call you to confirm delivery.</div>`;
  }catch(e){
    box.innerHTML = 'Order not found.';
  }
}
render();
