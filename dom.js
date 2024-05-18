function loadProducts(){
    fetch("https://fakestoreapi.com/products")
        .then(res=>res.json())
        .then(products=>{
            console.log(products);
            displayProduct(products);
        })
}

loadProducts();

function displayProduct(products){
    let productContainer = document.getElementById("product-container");
    products.forEach((product)=>{
        console.log(product);
        let pname = product.title.replace("'", "")
        let div = document.createElement("div");
        div.setAttribute("class","card");
        div.innerHTML=`
            <img src=${product.image} alt="" width="30%"/>
            <h5>${product.title}</h5>
            <h5>Price: ${product.price}</h5>
            <p>${product.description.slice(0,100)}...</p>
            <button onclick="detailsProduct(${product.id})" data-bs-toggle="modal" data-bs-target="#details">details</button> 
            <button onclick='handleAddToCart("${pname}","${product.price}")'>Add to cart</button> 
        `;
        productContainer.appendChild(div);

    })
}


function handleAddToCart(title,price){
    let container = document.getElementById("cart-main-container");
    let div = document.createElement("div");
    div.classList.add("product-list")
    div.innerHTML = `
    <p>${title}</p>
    <h3 class="price">${price}</h3>
    
    `
    container.appendChild(div);
    let total = document.querySelector(".total");
    let pPrice = parseFloat(price);
    let newTotal = parseFloat(total.innerText) + pPrice;
    total.innerText=newTotal.toFixed(2)

    let totalItems = document.querySelector(".total-items");
    totalItems.innerText = parseInt(totalItems.innerText)+1;

}

function detailsProduct(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
    .then(product=>{
        let modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `
        <img src=${product.image} alt="" width="30%"/>
        <h5>${product.title}</h5>
        <h5>Price: ${product.price}</h5>
        <p>${product.description.slice(0,100)}...</p>
        `
    })
}