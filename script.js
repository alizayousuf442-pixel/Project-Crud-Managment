
const apiUrl = "http://localhost:5000/api/Product"
let editId = null;
 async function  loadProducts() {
  const res = await  fetch(apiUrl)
  const data = await res.json()
  const table = document.getElementById("tableBody")
  table.innerHTML = data.map((p,i) =>`
   <tr>
    <td>${i + 1}</td>
    <td>${p.name}</td>
    <td>${p.price}</td>
    <td>${p.stock}</td>
      <td>
       
            <button class="btn btn-sm btn-outline-light " onclick="editproduct('${p.id}' , '${p.name}' , '${p.price}' , '${p.stock}')">Edit</button>
       
            <button class="btn btn-sm btn-danger " onclick="deleteProduct(${p.id})">Delete</button>
       
        
        </td>

  </tr>
  
  `).join('')
 }
 loadProducts()
 async function createProduct() {

  const name = document.getElementById("CreateName").value
    const price = parseFloat(document.getElementById("CreatePrice").value)
  const stock = parseInt(document.getElementById("CreateStock").value)
  if(!name) return Swal.fire({
title: "please enter your product details!",
icon: "warning",
draggable: true
});
  

const response =   await fetch(apiUrl , {

    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({name , price, stock})
  })

  if(response.ok){

    Swal.fire( 'Add Product','SucessfullyAddProduct' ,  'success' )
  }
  clearInput()
  loadProducts()
  
 }
 async function clearInput() {
  document.getElementById("CreateName").value = ''
        document.getElementById("CreatePrice").value = ''
        document.getElementById("CreateStock").value = ''
 }
 async function deleteProduct(id) {
Swal.fire({
title: 'Are you sure?',
text: "You won't be able to recover this product!",
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33',
confirmButtonText: 'Yes, delete it!'
}).then(async (result) => {
if (result.isConfirmed) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    Swal.fire(
      'Deleted!',
      'Product has been deleted successfully.',
      'success'
    );
    loadProducts();
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Failed to delete the product.',
      icon: 'error'
    });
  }
}
});
}

 function editproduct(id, name, price, stock){

  editId = id;
  document.getElementById("editproduct").classList.remove('d-none');
  document.getElementById("EditName").value = name;
  document.getElementById("EditPrice").value = price;
  document.getElementById("EditStock").value = stock;

  window.scrollTo({top: 0 , behavior: "smooth"});


 }

 async function StartEdit() {
     const product ={

      id : editId,
     name: document.getElementById("EditName").value,
 price: parseFloat(document.getElementById("EditPrice").value) ,
  stock: parseInt(document.getElementById("EditStock").value),
     }

const response =  await fetch(`${apiUrl}/${editId}` , {

      method: "PUT",
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify(product)
     })
     if(response.ok){

Swal.fire( 'Add Product','SucessfullyAddProduct' ,  'success' , )
}

     loadProducts()
     document.getElementById("editproduct").classList.add('d-none');

    
 }
function CancelEdit(){
    document.getElementById("editproduct").classList.add('d-none');
    Swal.fire('Cancelled', 'Edit Product Cancelled', 'error');

}
 
 loadProducts()


