// document.querySelector('body').addEventListener('click', function(event) {
//     console.log(event.target);
//     if (event.target.matches('.item-swatch li label img')) {
//       console.log('test');
//       let clickedLabel = event.target.closest('label');
//       let selectedLabelTitle = clickedLabel.getAttribute('data-title').trim();
//       let parentGridItem = clickedLabel.closest('.grid__item');
//       let itemSwatch = clickedLabel.closest('.item-swatch');
//       itemSwatch.querySelectorAll('li label').forEach(function(label) {
//         label.classList.remove('active');
//       });
//       clickedLabel.classList.add('active');
//       let productItem = clickedLabel.closest('.product-item');
//       let productData = productItem ? productItem.dataset.jsonProduct : null;
//       let filteredMedia = [];
//       let selectedProductId = clickedLabel.dataset.idProduct;
//       if (productData) {
//         if (checkStatusSwatchQs(clickedLabel.closest('.product-item')));
//         filteredMedia = productData.media.filter(function(media) {
//           return media.alt === selectedLabelTitle;
//         });
//       }
//       if (filteredMedia.length && 'variant_grouped' === window.color_swatch_style) {
//         let imageCount = filteredMedia.length > 1 ? 2 : filteredMedia.length;
//         for (let i = 0; i < imageCount; i++) {
//           let picture = parentGridItem.querySelector('picture[data-index="' + i + '"]');
//           picture.querySelectorAll('*').forEach(function(child) {
//             child.setAttribute('srcset', filteredMedia[i].src);
//           });
//         }
//       } else {
//         let selectedImage = clickedLabel.dataset.img;
//         console.log(selectedImage);
//         if (selectedImage) {
//           parentGridItem.querySelector('.card__media > div img').setAttribute('srcset', selectedImage);
//           event.preventDefault();
//         }
//       }
//     } else if (event.target.matches('.item-swatch-more a')) {
//       event.preventDefault();
//       let cardContent = event.target.closest('.card__content');
//       cardContent.classList.toggle('show--more');
//     }
//   });
document.querySelector('body').addEventListener('click', event => {
  const { target } = event;
  const swatchLabel = target.matches('.item-swatch li label img');
  const moreLink = target.matches('.item-swatch-more a');
  if (swatchLabel) {
    const clickedLabel = target.closest('label');
    const selectedLabelTitle = clickedLabel.getAttribute('data-title').trim();
    const varientId = clickedLabel.getAttribute('data-id-product');
    const parentGridItem = clickedLabel.closest('.grid__item');
    const itemSwatch = clickedLabel.closest('.item-swatch');
    itemSwatch.querySelectorAll('li label').forEach(label => label.classList.remove('active'));
    clickedLabel.classList.add('active');
    const link = parentGridItem.querySelector('.do__featured-collection-card-content a').getAttribute('data-link');
    parentGridItem.querySelector('.do__featured-collection-card-content a').setAttribute('href', `${link}?variant=${varientId}`);
    const productData = clickedLabel.closest('.product-item')?.dataset.jsonProduct;
    const filteredMedia = productData?.media.filter(media => media.alt === selectedLabelTitle) || [];
    if (filteredMedia.length && 'variant_grouped' === window.color_swatch_style) {
      const imageCount = filteredMedia.length > 1 ? 2 : filteredMedia.length;
      for (let i = 0; i < imageCount; i++) {
        const picture = parentGridItem.querySelector(`picture[data-index="${i}"]`);
        picture.querySelectorAll('*').forEach(child => child.setAttribute('srcset', filteredMedia[i].src));
      }
    } else {
      const selectedImage = clickedLabel.dataset.img;
      selectedImage && parentGridItem.querySelector('.card__media > div img').setAttribute('srcset', selectedImage);
      event.preventDefault();
    }
  } else if (moreLink) {
    event.preventDefault();
    target.closest('.card__content').classList.toggle('show--more');
  }
});
