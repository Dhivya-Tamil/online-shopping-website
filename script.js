const productContainer = document.getElementById("product-container");
const search = document.getElementById("search-input");
let productList = [];


//Fetching default products
function fetchProduts(){
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => displayProducts(data.products));
}
fetchProduts()


function displayProducts(data){
    productList = [...data]
    
    productContainer.innerHTML="";
    data.map((item)=>{
        const product = document.createElement('div');

    product.innerHTML = `
    <img src=${item.thumbnail} />
    <div class="details">
        <p>${item.brand}</p>
        <h4>${item.title}</h4>
        <i class="fa-solid fa-star checked"></i><span>  ${item.rating}</span>
        <h5>$ ${item.price}</h5>
    </div>
    `
    product.onclick=()=>sendName(item.title)
    product.className = "product-details"
    productContainer.appendChild(product);

   })
}

function sendName(product){
        
    let name=localStorage.getItem("name")
    if(name!=null)
    {
        localStorage.removeItem("name")
    }

    localStorage.setItem("name",product)
    window.location.href="product.html";
}

// Search functionality
search.addEventListener('keyup',(e)=>{
    const searchValue = e.target.value;
    if(searchValue == "" || searchValue == null){
        fetchProduts();
    }
    else{
     let searchResult = productList.filter(item =>(item.title.toLowerCase().includes(searchValue.toLowerCase())) || (item.brand.toLowerCase().includes(searchValue.toLowerCase())))
     productContainer.innerHTML="";
     displayProducts(searchResult);
    }
})
const productCart = JSON.parse(localStorage.getItem('productCart'))
document.getElementById("count").innerHTML=productCart.length;

