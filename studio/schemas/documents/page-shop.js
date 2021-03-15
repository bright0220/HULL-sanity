import { FiShoppingCart } from 'react-icons/fi'

export default {
  title: 'Shop All Page',
  name: 'shopPage',
  type: 'document',
  icon: FiShoppingCart,
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Page Modules',
      name: 'modules',
      type: 'array',
      of: [{ type: 'collectionGrid' }, { type: 'grid' }, { type: 'marquee' }],
      validation: Rule =>
        Rule.custom(blocks => {
          const collectionGrids = blocks.filter(
            block => block._type === 'collectionGrid'
          )

          const collectionGridItems = collectionGrids.map(
            (item, index) => [{ _key: item._key }] || [index]
          )

          return collectionGrids.length === 1
            ? true
            : {
                message:
                  'You must have one "Collection Grid" module on the page',
                paths: collectionGridItems
              }
        })
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Shop Page'
      }
    }
  }
}
