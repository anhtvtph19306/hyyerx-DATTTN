import React, { useEffect } from 'react'
import LinkDetail from './component/link-detail/link-detail.component'
import InfoDetail from './component/info-detail/info-detail.component'
import IdentityComponent from './component/Identity/Identity.component'
import RobertsComponent from './component/roberts/roberts.component'
import ReviewComponent from '~/app/component/parts/review/review.component'
import AllReviewBook from './component/all-review-book/all-review-book.component'

const DetailComponent = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, [])
    return (
        <div className='sm:w-[1140px] m-auto max-sm:px-3'>
            <div className='mt-3'>
                <LinkDetail />
            </div>
            <div>
                <InfoDetail />
            </div>
            <div>
                <IdentityComponent />
            </div>

            <div>
                <RobertsComponent />
            </div>
            <div>
                <AllReviewBook />
            </div>
            <div>
                <ReviewComponent />
            </div>
        </div>
    )
}

export default DetailComponent