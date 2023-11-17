import { css } from '@emotion/react'

const LinkDetail = () => {
    return (
        <div css={cssLink}>
            <span className='text-[0.9rem]'>
                <a href="#" className='underline'>Home </a>/
                <a href="#" className='underline'>eBooks </a>/
                <a href="#" className='underline'> Fiction & Literature </a>/
                <a href="#" className='text-gray-600'> 12 Months to Live </a></span>
        </div>
    )
}

export default LinkDetail

const cssLink = css`
a{
    font: inherit;
    vertical-align: baseline;
    cursor: pointer;
    font-weight:600;
    padding:0 2px;
}
`

