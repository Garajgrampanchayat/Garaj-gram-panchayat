function showSection(id){document.querySelectorAll('.admin-section').forEach(sec=>sec.style.display='none');document.getElementById(id).style.display='block';}
document.addEventListener('DOMContentLoaded',()=>{
  const cForm=document.getElementById('complaintForm');
  if(cForm){cForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const name=document.getElementById('c_name').value;
    const mobile=document.getElementById('c_mobile').value;
    const msg=document.getElementById('c_message').value;
    const res=await fetch('/api/complaint',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,mobile,msg})});
    if(res.ok){document.getElementById('complaintStatus').innerText='तक्रार यशस्वीरीत्या नोंद झाली';cForm.reset();}
  });}
});
