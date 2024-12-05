import { useAuthStore } from "@/stores/auth.js";

export default function isAuthorised({ to }) {
  const authStore = useAuthStore();

  if (!authStore.isAuthorised) {
    return { path: "/auth", query: { redirect: to.fullPath } };
  }

  return true;
}
