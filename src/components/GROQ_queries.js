import { client } from '../data/helpers';
import groq from 'groq';

export const fetchProducts = async () => {
    const query = groq`*[_type == "product"] {
    _id,
    store {
      variants[]-> {
        store {
          ...
        }
      },
      title,
      previewImageUrl,
      priceRange {
        maxVariantPrice
      },
     
    }
    }`;

    try {
      const response = await client.fetch(query);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  export const fetchProductById = async (productId) => {
    const query = groq`*[_type == "product" && _id == $productId] {
        _id,
        store {
        variants[]-> {
          store {
            ...
          }
        },
          id,
          title,
          previewImageUrl,
          priceRange {
            maxVariantPrice
          }
        }
      }`;

    try {
      const response = await client.fetch(query, { productId });
      console.log(response);
      return response[0];
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
