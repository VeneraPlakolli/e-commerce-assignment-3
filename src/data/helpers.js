import ShopifyBuy from 'shopify-buy';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '0n1krvaa',
  dataset: 'production',
  useCdn: true 
});

export { client }

export const shopifyBuy = ShopifyBuy.buildClient({
  domain: process.env.GATSBY_ACCESS_DOMAIN,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
});
