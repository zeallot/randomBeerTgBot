const axios = require("axios");

const parseName = (name) => {
  return name.split("ПАСТЕР.")[0];
};

const formatData = (beers) => {
  return beers.map((beer) => ({
    id: beer.id,
    name: parseName(beer.name),
    country: beer.country_of_origin,
    price: beer.prices.show_where_to_buy_price,
    strength: beer.strength,
    photo: beer.main_photo,
    type: beer.color,
  }));
};

const headers = {
  BristolApiToken: "token",
};

const defaultParams = {
  consumer: "website",
  community_id: "22",
  products_without_shop: true,
  sort: "new_first",
  count: 24,
  volume_minmax: "0.33,0.53",
};

const url =
  "https://demo.api.mobile.bristol.ru/api/v2/regular/catalog/products/by_category";

const getRussianBeer = async (page) => {
  const beer = await axios.get(`${url}/128`, {
    headers,
    params: {
      page,
      ...defaultParams,
    },
  });

  return formatData(beer.data.promo_products);
};

const getImportBeer = async (page) => {
  const beer = await axios.get(`${url}/127`, {
    headers,
    params: {
      page,
      ...defaultParams,
    },
  });

  return formatData(beer.data.promo_products);
};

const parseBeerFromBristole = async () => {
  const promises = [];

  for (let i = 1; i <= 50; i++) {
    promises.push(getRussianBeer(i));
    promises.push(getImportBeer(i));
  }

  return await Promise.all(promises).then((data) => data.flatMap((d) => d));
};

module.exports = {
  parseBeerFromBristole,
};
