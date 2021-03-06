let products = [];

class Cart {
    // get cart from localStorage
    static getLocal() {
        var cart = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            cart.push({ id: key, amount: value });
        }

        return cart;
    }

    static showCart(cart) {
        //display Cart in the browser
        let result = "";
        let total = 0;
        cart.forEach(cartItem => {
            let product = products.find(product => product.id === cartItem.id);
            let subTotal =
                parseFloat(cartItem.amount) * parseFloat(product.price);
            total += subTotal;

            result += `
                    <div class="container">
                    <div class="d-flex my-4 flex-column flex-md-row align-items-center justify-content-around ">
                        <!-- product 1 img -->
                        <div class="product-item text-center">
                            <img src='${product.image}' alt="mall" />
                        </div>
                        <!-- product 1 title -->
                        <div class="product-item text-center">
                            <p class="item-title my-4">
                            '${product.name}'
                            </p>
                        </div>
                        <!-- product 1 quantity and unit price -->
                        <div class="product-item">
                            <div class="d-flex flex-row align-items-center justify-content-center">
                                <p class="price mx-4">$${product.price} x ${
                cartItem.amount
            }</p>

                            </div>
                        </div>
                        <!-- product 1 subtotal -->
                        <div class="product-item">
                            <p class="price my-5 mx-3 item-total">$${subTotal.toFixed(
                                2
                            )}</p>
                        </div>  
                    </div>  
                </div>      
                `;
        });

        if (result.length) {
            result += `<div class="line"></div>`;
            result += `

                <div class="container">
                <div class="d-flex my-4 flex-column flex-md-row align-items-center justify-content-around ">
                    <!-- product 1 img -->
                    <div class="product-item text-center">
                    </div>
                    <!-- product 1 title -->
                    <div class="product-item text-center">
                    </div>
                    <!-- product 1 quantity and unit price -->
                    <div class="product-item">
                        <div class="d-flex flex-row align-items-center justify-content-center">
                            <p class="price mx-4">Total</p>
                        </div>
                    </div>
                    <!-- product 1 subtotal -->
                    <div class="product-item">
                        <p class="price my-5 mx-3 item-total">$${total.toFixed(
                            2
                        )}</p>
                    </div>  
                </div>  
            </div>            
            `;
        }

        var outputDOM = document.querySelector(".cart-checkout");
        outputDOM.innerHTML = result;
    }
}

class Products {
    // get Product from product.json file
    async get() {
        try {
            var loc = window.location.pathname;
            let result = await fetch("./scripts/products.json");
            return await result.json();
        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Products().get().then(tempProducts => {
        // get products from products.json file and save it to the global variable products
        products = tempProducts;

        // display shopping cart
        Cart.showCart(Cart.getLocal());

        //clear local storage on submitting the form
        addSubmitListener();
    });
});
