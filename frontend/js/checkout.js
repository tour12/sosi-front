
async function place(){
  const cartId = localStorage.getItem('cartId');
  if(!cartId){ alert('Cart is empty'); return; }
  const payload = {
    cartId,
    customer:{
      name:document.getElementById('name').value,
      phone:document.getElementById('phone').value,
      city:document.getElementById('city').value,
      address:document.getElementById('address').value,
    },
    payment_method: document.getElementById('payment').value
  };
  const res = await fetch(`${API_BASE}/checkout`,{
    method:'POST', credentials: 'include', headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
  });
  const data = await res.json();
  if (data.success){
    localStorage.removeItem('cartId');
    location.href = `order.html?code=${encodeURIComponent(data.order_code)}`;
  } else {
    alert(data.message||'Failed');
  }
}
document.getElementById('place').addEventListener('click', place);
