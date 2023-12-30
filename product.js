let product=localStorage.getItem("name");
const proDetails=document.getElementById("single-product-container");
const productContainer = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-container");
console.log(product)


//Single Product details
async function singleProduct()
{
    const response=await fetch(`https://dummyjson.com/products/search?q=${product}`)
    const data = await response.json();
    console.log(data);
    displaySingleProduct(data.products[0])
}


singleProduct();

function displaySingleProduct(product)
{
    proDetails.innerHTML="";
    productContainer.innerHTML="";
    const productimage=document.createElement("div");
    productimage.className="pro-image"
    productimage.innerHTML=`
    <img src=${product.thumbnail} alt="" width="100%" id="MainImg">
   
    <div class="small-image-group">
        <div class="small-img-col">
            <img src=${product.images[0]} alt="" width="100%" class="small-img">
        </div>
        <div class="small-img-col">
            <img src=${product.images[1]} alt="" width="100%" class="small-img">
        </div>
        <div class="small-img-col">
            <img src=${product.images[2]} alt="" width="100%" class="small-img">
        </div>           
    </div>`
    proDetails.appendChild(productimage);

const MainImg=document.getElementById("MainImg");
const SmallImg=document.getElementsByClassName("small-img");

for(let img of SmallImg)
{
    img.addEventListener("click",()=>
    {
      MainImg.src=img.src
    })
}

const singleProDetails=document.createElement("div");
singleProDetails.className="single-pro-details";
singleProDetails.innerHTML=`

<h5>${product.brand}</h5>
<h3>${product.title}</h3>
<h2>$${product.price}</h2>

<button onclick="addTocart(${product.id})" class="normal">Add to Cart</button>
<button onclick='window.location.href="cart.html"' class="normal">Go to Cart</button>
<h4>Product Details</h4>
<div id="pro-details">
<p>${product.description}</p>
</div>
<h3 >${product.stock} <span style="color: green;">On stock</span></h3>
<h3>${product.rating} <span style="color: red;">Reviews</span></h3>`

proDetails.appendChild(singleProDetails)
 let category=product.category;
 getCategory(category)
 window.scrollTo({
    top:0,
    behavior:"smooth"
 })

}

//Get category
async function getCategory(category)
{
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data= await response.json();
    displayCategory(data.products)
   
}

function displayCategory(data){
    productList = [...data]
    
    data.map((item)=>{
        const product = document.createElement('div');
        product.className = "product-details"

    product.innerHTML = `
    <img src=${item.thumbnail} />
    <div class="details">
        <p>${item.brand}</p>
        <h4>${item.title}</h4>
        <i class="fa-solid fa-star checked"></i><span>  ${item.rating}</span>
        <h5>$ ${item.price}</h5>
    </div>
    `
    product.onclick=()=>displaySingleProduct(item)
    productContainer.appendChild(product);

   })
}

// Add cart
 
function addTocart(id){
    console.log(id);
    alert("Item added to cart")

    fetch(`https://dummyjson.com/products/${id}`)
    .then((response)=> response.json())
    .then(data =>{
        console.log("single",data);

        const productCart = JSON.parse(localStorage.getItem('productCart')) || [];
        productCart.push(data);
        localStorage.setItem("productCart", JSON.stringify(productCart));       
    })
    const data = JSON.parse(localStorage.getItem('productCart'))
    displayCart();
}
 
function delElement(id){
    const productCart = JSON.parse(localStorage.getItem('productCart'))
    const filtered = productCart.filter((data)=> data.id != id);
    const ele = document.querySelector(".cart-details");
    ele.remove();
    setTimeout(()=>{
        document.location.reload();
    },0)
    localStorage.setItem("productCart", JSON.stringify(filtered));
    console.log(filtered)
    displayCart();
}

function displayCart(){
    let total = 0;
    const data = JSON.parse(localStorage.getItem('productCart'))
    document.getElementById("count").innerHTML=data.length;
    const tableDataCart = document.getElementById('cart-container');


    if(data.length===0){
        document.getElementById('subtotal').innerHTML = "Your cart is empty";
        document.getElementById('cart').style.display = "none";
        document.getElementById('checkout-btn').style.display = "none";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        data.map((item,i) =>{
            
            let tableRow = document.createElement('div');
            tableRow.innerHTML = `
            <img src=${item.thumbnail} />
            <h2 id="title"><span>${item.title}</span></h2>
            <h2 class="price">$ ${item.price}</h2>
            <input type="number" value="0"  class="cart-input" oninput="handleprice(${item.price})"></h2>
            <span class="sub-tot">${item.price}</span>
            <i class="far fa-times-circle"  onclick='delElement(${item.id})'></i>`;
        
            tableRow.classList.add('cart-details');
            tableDataCart.appendChild(tableRow);
            
            // total = total + Number(`${data.price}`);
            // document.getElementById("total").innerHTML = total;
          })
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click',()=>{
       
        checkoutBtn.innerHTML = " Your order placed successfully";
        setTimeout(()=>{
            checkoutBtn.innerHTML = "Proceed to checkout";
        },2000)
    })

}
displayCart()


document.getElementById("total").innerHTML = `$ ${0.00}`;

function handleprice(price){
    let total = 0, newPrice=0;
    let cartValue = document.querySelector(".cart-input").value;
    console.log("cartValue",cartValue);
    console.log("price",price);

   if(cartValue > 0){
    newPrice = newPrice +  Number(price) *  Number(cartValue);  

    document.querySelector(".sub-tot").innerHTML = newPrice;
    
   }
   
       total = total + newPrice ;
       document.getElementById("total").innerHTML = total;
}

