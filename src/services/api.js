export async function getCategories() {
  const responseApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const dataApi = responseApi.json();
  return dataApi;
}

export async function catById(id) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
  const data = response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const categoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  return categoryAndQuery.json();
}

export async function getProductById(id) {
  const getId = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await fetch(getId);
  const data = await response.json();
  return data;
}
