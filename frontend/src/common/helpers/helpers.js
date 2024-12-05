export const getImage = (image) => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};

export const getPublicImage = (path) => {
  const publicUrl = "/api";
  return `${publicUrl}/${path}`;
};

export function generateUniqId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}
