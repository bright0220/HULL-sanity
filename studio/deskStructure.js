import S from '@sanity/desk-tool/structure-builder'

import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

import {
  FiHome,
  FiMusic,
  FiSettings,
  FiGlobe,
  FiAlertOctagon,
  FiMenu,
  FiRepeat,
  FiGift,
  FiCopy
} from 'react-icons/fi'

import SeoPreview from './components/previews/seo/seo-preview'

const remoteURL = 'https://insane.codes'
const localURL = 'http://localhost:8000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

const hiddenDocTypes = listItem =>
  ![
    'homePage',
    'samplePage',
    'errorPage',
    'page',
    'product',
    'productVariant',

    'generalSettings',
    'seoSettings',

    'menu',
    'siteSettings',
    'redirect'
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('General')
                .child(
                  S.editor()
                    .id('generalSettings')
                    .schemaType('generalSettings')
                    .documentId('generalSettings')
                )
                .icon(FiSettings),
              S.listItem()
                .title('Error Page')
                .child(
                  S.editor()
                    .id('errorPage')
                    .schemaType('errorPage')
                    .documentId('errorPage')
                )
                .icon(FiAlertOctagon),
              S.listItem()
                .title('Global SEO')
                .child(
                  S.editor()
                    .id('seoSettings')
                    .schemaType('seoSettings')
                    .documentId('seoSettings')
                )
                .icon(FiGlobe),
              S.listItem()
                .title('Menus')
                .child(S.documentTypeList('menu').title('Menus'))
                .icon(FiMenu),
              S.listItem()
                .title('Redirects')
                .child(S.documentTypeList('redirect').title('Redirects'))
                .icon(FiRepeat)
            ])
        )
        .icon(FiSettings),
      S.divider(),
      S.listItem()
        .title('Home')
        .child(
          S.editor()
            .title('Home Page')
            .id('homePage')
            .schemaType('homePage')
            .documentId('homePage')
        )
        .icon(FiHome),
      S.divider(),
      S.listItem()
        .title('Sample Page')
        .child(
          S.editor()
            .title('Sample Page')
            .id('samplePage')
            .schemaType('samplePage')
            .documentId('samplePage')
        )
        .icon(FiMusic),
      S.divider(),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('page')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(SeoPreview)
                    .options({ previewURL })
                    .icon(EyeIcon)
                    .title('SEO Preview')
                ])
            )
        ),
      S.divider(),
      S.listItem()
        .title('Products')
        .icon(FiGift)
        .child(
          S.documentTypeList('product')
            .title('Products')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('product')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(SeoPreview)
                    .options({ previewURL })
                    .icon(EyeIcon)
                    .title('SEO Preview')
                ])
            )
        ),
      S.listItem()
        .title('Product Variants')
        .icon(FiCopy)
        .child(
          S.documentTypeList('product')
            .title('By Product')
            .menuItems(S.documentTypeList('product').getMenuItems())
            .filter('_type == $type')
            .params({ type: 'product' })
            .child(productID =>
              S.documentList()
                .title('Variants')
                .menuItems(S.documentTypeList('productVariant').getMenuItems())
                .filter('_type == $type && productID == $id')
                .params({
                  type: 'productVariant',
                  id: Number(productID.replace('product-', ''))
                })
                .child(documentId =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('productVariant')
                    .views([
                      S.view.form().icon(EditIcon),
                      S.view
                        .component(SeoPreview)
                        .options({ previewURL })
                        .icon(EyeIcon)
                        .title('SEO Preview')
                    ])
                )
            )
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
