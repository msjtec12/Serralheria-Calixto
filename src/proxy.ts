import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pdv/:path*",
    "/products/:path*",
    "/categories/:path*",
    "/customers/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};
