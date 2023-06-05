import ShopifyBuy from 'shopify-buy';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '0n1krvaa',
  dataset: 'production',
  useCdn: true 
});

export { client }

export const shopifyBuy = ShopifyBuy.buildClient({
  domain: 'venera-sgd.myshopify.com',
  storefrontAccessToken: 'f36ad3eca2e9d60ed3cb36c65c59d835',
});
