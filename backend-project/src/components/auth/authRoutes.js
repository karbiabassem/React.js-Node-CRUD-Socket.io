import { signUp, signIn, isLoggedIn } from "./authController";

export default function(router) {
  router.post("/api/auth/signup", signUp);
  router.post("/api/auth/signin", signIn);
  router.get("/api/auth/verifAccess", isLoggedIn);
}
