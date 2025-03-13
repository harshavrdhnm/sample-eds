import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Extract selector from URL
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');

  if (idParam) {
    try {
      // Hit the API with the selector
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${idParam}/comments`);
      
      const data = await response.json();

      // Display the API response in the footer
      const apiResponseElement = document.createElement('div');
      apiResponseElement.textContent = JSON.stringify(data);
      footer.append(apiResponseElement);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  }

  block.append(footer);
}
