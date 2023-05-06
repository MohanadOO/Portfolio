import { HiEye } from 'react-icons/hi'
import { SanityDocument } from 'sanity'
import Iframe from 'sanity-plugin-iframe-pane'
import type { DefaultDocumentNodeResolver } from 'sanity/desk'

function getPreviewUrl(doc: any) {
  const slug = doc?.slug?.current
  const http = window.location.host.startsWith('localhost')
  return slug
    ? `${http ? 'http' : 'https'}://${
        window.location.host
      }/api/preview?callback=blog/${slug}?show=false`
    : window.location.host
}

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          // Required: Accepts an async function
          url: (doc: SanityDocument) => getPreviewUrl(doc),

          // OR a string
          // url:`https://sanity.io`,
          // Optional: Set the default size
          defaultSize: `desktop`, // default `desktop`
          // Optional: Add a reload button, or reload on new document revisions
          reload: {
            button: true,
            revision: 3600000, // boolean | number. default `undefined`. If a number is provided, add a delay (in ms) before the automatic reload on document revision
          },
          // Optional: Pass attributes to the underlying `iframe` element:
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
          // attributes: {
          //   allow: 'fullscreen' // string, optional
          //   referrerPolicy: 'strict-origin-when-cross-origin' // string, optional
          //   sandbox: 'allow-same-origin' // string, optional
          // }
        })
        .title('Preview')
        .icon(HiEye),
    ])
  }
}
