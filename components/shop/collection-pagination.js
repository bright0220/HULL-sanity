import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import ProductCard from './product-card'

const CollectionPagination = ({ products, paginated }) => {
  const pmax = paginated
  const [hasMore, setMore] = useState(products.length > pmax)
  const [pagination, setPagination] = useState([...products.slice(0, pmax)])

  const loadMore = () => {
    const curPage = pagination.length
    const nextPage = products.slice(curPage, curPage + pmax)
    const newPage = [...pagination, ...nextPage]

    if (hasMore) {
      setPagination(newPage)
      setMore(newPage.length < products.length ? true : false)
    }
  }

  // uncomment below for auto-loading on scroll

  const [ref, inView] = useInView({
    rootMargin: '-100px 0px',
  })

  // useEffect(() => {
  //   if (inView) {
  //     loadMore()
  //   }
  // }, [inView])

  const productItems = paginated ? pagination : products

  return (
    <div className="collection--content">
      <div className="grid collection--list">
        {productItems.map((product, key) => (
          <ProductCard key={key} product={product} index={key} />
        ))}
      </div>
      {paginated && (
        <div className="collection--pagination">
          {hasMore && (
            <button className="btn is-accent" ref={ref} onClick={loadMore}>
              Load More Shows
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CollectionPagination
