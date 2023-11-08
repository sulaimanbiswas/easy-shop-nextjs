const commonNavData = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/blogs",
    name: "Blogs",
  },
  {
    path: "/products",
    name: "Products",
  },
];

export const afterLoginNavData = [
  ...commonNavData,
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/logout",
    name: "Logout",
  },
];

export const beforeLoginNavData = [
  ...commonNavData,
  {
    path: "/login",
    name: "Login",
  },
  {
    path: "/signup",
    name: "Signup",
  },
];
