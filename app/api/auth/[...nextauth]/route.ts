import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// @ts-expect-error NextAuth type issues
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };