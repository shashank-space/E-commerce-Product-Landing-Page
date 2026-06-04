/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

});

/* =========================
   HAMBURGER MENU
========================= */

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

/* =========================
   DARK MODE
========================= */

const themeBtn =
document.getElementById("themeBtn");

if (themeBtn) {
    if (
        localStorage.getItem("theme")
        === "dark"
    ) {
        document.body.classList.add(
            "dark-mode"
        );
        themeBtn.innerHTML = "☀️";

    }
    themeBtn.addEventListener(
        "click",
        () => {
            document.body.classList.toggle(
                "dark-mode"
            );
            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {
                localStorage.setItem(
                    "theme",
                    "dark"
                );
                themeBtn.innerHTML = "☀️";
            }
            else {
                localStorage.setItem(
                    "theme",
                    "light"
                );
                themeBtn.innerHTML = "🌙";
            }
        }
    );
}

/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    const counter =
    document.getElementById(
        "cartCount"
    );

    if (counter) {

        counter.innerText = count;
    }
}
updateCartCount();

/* =========================
   ADD TO CART
========================= */

const buyButtons =
document.querySelectorAll(
    ".buy-btn"
);

buyButtons.forEach(button => {

    button.addEventListener(
        "click",() => {
            const product = {

                name:button.dataset.name,
                price:Number(button.dataset.price),
                image:button.dataset.image,
                quantity: 1
            };

            let cart =
            JSON.parse(
                localStorage.getItem(
                    "cart"
                )
            ) || [];

            const existing =
            cart.find(item =>
                item.name ===
                product.name
            );

            if (existing) {

                existing.quantity++;

            }

            else {

                cart.push(product);

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            alert(
                product.name +
                " added to cart!"
            );

        }
    );

});

/* =========================
   PRODUCT SEARCH
========================= */

const searchInput =
document.getElementById(
    "searchInput"
);

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        () => {

            const filter =
            searchInput.value
            .toLowerCase();

            const cards =
            document.querySelectorAll(
                ".card"
            );

            cards.forEach(card => {

                if (
                    card.innerText
                    .toLowerCase()
                    .includes(filter)
                ) {

                    card.style.display =
                    "block";

                }

                else {

                    card.style.display =
                    "none";
                }
            });
        }
    );

}

/* =========================
   CONTACT FORM
========================= */

const contactForm =
document.getElementById(
    "contactForm"
);

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const name =
            document
            .getElementById("name")
            .value.trim();

            const email =
            document
            .getElementById("email")
            .value.trim();

            const message =
            document
            .getElementById("message")
            .value.trim();

            const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === "") {

                alert(
                    "Please enter your name"
                );

                return;

            }

            if (
                !emailPattern.test(email)
            ) {
                alert(
                    "Please enter a valid email"
                );
                return;
            }
            if (message === "") {

                alert(
                    "Please enter your message"
                );

                return;
            }
            alert(
                "Message sent successfully!"
            );

            contactForm.reset();
        }
    );
}

/* =========================
   NEWSLETTER
========================= */

const subscribeForm =
document.getElementById(
    "subscribeForm"
);

if (subscribeForm) {

    subscribeForm.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            alert(
                "Thank you for subscribing!"
            );

            subscribeForm.reset();

        }
    );

}

/* =========================
   BACK TO TOP
========================= */

const topBtn =
document.getElementById(
    "topBtn"
);

window.addEventListener(
    "scroll",
    () => {

        if (!topBtn) return;

        if (
            window.scrollY > 300
        ) {

            topBtn.style.display =
            "block";
        }
        else {

            topBtn.style.display =
            "none";

        }
    }
);

if (topBtn) {

    topBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                "smooth"

            });
        }
    );

}

/* =========================
   SCROLL REVEAL
========================= */

const hiddenElements =
document.querySelectorAll(
    ".hidden"
);

const observer =
new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (
                entry.isIntersecting
            ) {
                entry.target.classList.add(
                    "show"
                );
            }
        });
    }
);

hiddenElements.forEach(
    element => {

        observer.observe(
            element
        );

    }
);

/* =========================
   CART PAGE
========================= */

const cartContainer =
document.getElementById(
    "cartItems"
);

if (cartContainer) {

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    renderCart();

    function renderCart() {

        cartContainer.innerHTML =
        "";

        let subtotal = 0;

        const emptyCart =
        document.getElementById(
            "emptyCart"
        );

        if (cart.length === 0) {

            if (emptyCart) {

                emptyCart.style.display =
                "block";

            }
            document.getElementById(
                "subtotal"
            ).innerText = "₹0";

            document.getElementById(
                "gst"
            ).innerText = "₹0";
            document.getElementById(
                "total"
            ).innerText = "₹0";
            return;
        }

        if (emptyCart) {
            emptyCart.style.display =
            "none";
        }

        cart.forEach(
            (item, index) => {

                subtotal +=
                item.price *
                item.quantity;

                cartContainer.innerHTML += `

                <div class="cart-item">
                    <img 
                        src="${item.image}" 
                        alt="${item.name}"
                        class="cart-product-image">

                    <div class="item-details">

                        <h3>${item.name}</h3>

                        <p>
                            ₹${item.price.toLocaleString()}
                        </p>

                        <div class="quantity">

                            <button onclick="decreaseQty(${index})">
                                -
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button onclick="increaseQty(${index})">
                                +
                            </button>

                            <button
                                class="remove-btn"
                                onclick="removeItem(${index})">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                `;
            }
        );

        const gst =
        Math.round(
            subtotal * 0.18
        );

        const shipping =
        subtotal > 0
        ? 499
        : 0;

        const total =
        subtotal +
        gst +
        shipping;

        document.getElementById(
            "subtotal"
        ).innerText =
        "₹" +
        subtotal.toLocaleString();

        document.getElementById(
            "gst"
        ).innerText =
        "₹" +
        gst.toLocaleString();

        document.getElementById(
            "total"
        ).innerText =
        "₹" +
        total.toLocaleString();
    }

    window.increaseQty =
    function(index) {

        cart[index].quantity++;

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        renderCart();
        updateCartCount();
    }

    window.decreaseQty =
    function(index) {

        if (
            cart[index].quantity > 1
        ) {
             cart[index].quantity--;
        }
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        renderCart();

        updateCartCount();
    }

    window.removeItem =
    function(index) {

        cart.splice(index, 1);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        renderCart();

        updateCartCount();
    }

}

/* =========================
   CHECKOUT
========================= */

const checkoutBtn =
document.querySelector(
    ".checkout-btn"
);

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            alert(
                "Order placed successfully!"
            );

        }
    );

}

console.log( "TechStore Loaded Successfully");