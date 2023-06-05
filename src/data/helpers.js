import ShopifyBuy from '@shopify/buy-button-js';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '0n1krvaa',
  dataset: 'production',
  useCdn: true 
});

export { client }

export const shopifyBuy = ShopifyBuy.buildClient({
  domain: process.env.ACCESS_DOMAIN,
  storefrontAccessToken: process.env.STOREFRONT_ACCESS_TOKEN,
});
