export async function getCategories() {
  const responseApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const dataApi = responseApi.json();
  console.log(dataApi);
  return dataApi;
}

export async function getProductsFromCategoryAndQuery(...infos) {
  const [categoryId, query] = infos;
  if (infos.length === 2) {
    const categoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
    return categoryAndQuery.json();
  }
  const idCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  return idCategory.json();
}

export async function getProductById(id) {
  const getId = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await fetch(getId);
  const data = await response.json();
  return data;
}
