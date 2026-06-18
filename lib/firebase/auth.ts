import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const ALLOWED_EMAILS = ["sunbloom412@gmail.com", "guntas7347@gmail.com"];

const provider = new GoogleAuthProvider();

export async function loginWithGoogleRestricted() {
  const res = await signInWithPopup(auth, provider);
  const user = res.user;

  const email = user.email;
  if (!email || !ALLOWED_EMAILS.includes(email)) {
    await signOut(auth);
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

export async function logout() {
  await signOut(auth);
}
