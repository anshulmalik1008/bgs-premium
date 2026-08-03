export interface NavLink {
  title: string;
  href: string;
  description?: string;
  mega?: boolean;
}

export const navLinks: NavLink[] = [
  {
    title: "Shop",
    href: "/shop",
    description: "Explore all premium gifts",
    mega: true,
  },
  {
    title: "Wishlist",
    href: "/wishlist",
    description: "View your saved gifts",
    mega: false,
  },
  {
    title: "Track Order",
    href: "/track-order",
    description: "Track your latest order",
    mega: false,
  },
  {
    title: "Account",
    href: "/account",
    description: "Manage profile and orders",
    mega: false,
  },
  {
    title: "Cart",
    href: "/cart",
    description: "Review selected products",
    mega: false,
  },
  {
  title: "Account",
  href: "/auth",
  description: "Sign in or create account",
  mega: false,
},

];
