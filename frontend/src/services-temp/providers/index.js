import AxiosProvider from "./AxiosProvider";
import { useAuthStore } from "@/stores";

const httpProvider = new AxiosProvider();

httpProvider.addInterceptor({
  onError: async (status) => {
    if (status === 401) {
      const authStore = useAuthStore();
      if (authStore.isAuthorised) {
        await authStore.logout();
      }
    }
  },
});

export default httpProvider;
