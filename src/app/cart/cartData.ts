export type CartItem = {
  id: number;
  name: string;
  title?: string;
  category: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  gradient?: string;
  image?: string;
  badge?: string;
  subtitle?: string;
  message?: string;
};

export const CART_STORAGE_KEY = "bgs_cart_items";

export const initialCartItems: CartItem[] = [];

export function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(
      CART_STORAGE_KEY,
    );

    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error(
      "Failed to read cart:",
      error,
    );

    return [];
  }
}

export function saveCart(
  items: CartItem[],
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items),
    );

    window.dispatchEvent(
      new CustomEvent("bgs-cart-updated", {
        detail: {
          cart: items,
        },
      }),
    );
  } catch (error) {
    console.error(
      "Failed to save cart:",
      error,
    );
  }
}

export function addCartItem(
  product: Omit<CartItem, "quantity">,
  quantity = 1,
) {
  const cart = readCart();

  const existing = cart.find(
    (item) => item.id === product.id,
  );

  const nextCart: CartItem[] = existing
    ? cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + quantity,
                10,
              ),
            }
          : item,
      )
    : [
        ...cart,
        {
          ...product,
          quantity,
        },
      ];

  saveCart(nextCart);

  return nextCart;
}

export function removeCartItem(
  productId: number,
) {
  const nextCart = readCart().filter(
    (item) => item.id !== productId,
  );

  saveCart(nextCart);

  return nextCart;
}

export function updateCartQuantity(
  productId: number,
  quantity: number,
) {
  if (quantity <= 0) {
    return removeCartItem(productId);
  }

  const nextCart = readCart().map(
    (item) =>
      item.id === productId
        ? {
            ...item,
            quantity: Math.min(
              quantity,
              10,
            ),
          }
        : item,
  );

  saveCart(nextCart);

  return nextCart;
}

export function clearCart() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(
    CART_STORAGE_KEY,
  );

  window.dispatchEvent(
    new CustomEvent("bgs-cart-updated", {
      detail: {
        cart: [],
      },
    }),
  );
}

export function getCartCount() {
  return readCart().reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );
}

export function getCartSubtotal() {
  return readCart().reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0,
  );
}
