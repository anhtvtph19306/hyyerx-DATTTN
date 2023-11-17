import { css } from "@emotion/react"
import { FC } from "react"

interface IButton {
    title?: String
    handelColor?: any
    className?: any
    onClick?: any
    type?: any
}
const ButotnComponent: FC<IButton> = ({ title, handelColor, className, onClick, type }) => {
    return (
        <button css={cssButotn(handelColor)} type={type} className={className} onClick={onClick}>{title}</button>
    )
}

export default ButotnComponent
const cssButotn = (handelColor: any) => css`
    
    text-decoration: none;
    display: inline-block;
    border: 1px solid #fff;
    padding:5px 0px;
    color: #fff;
    ${handelColor ? (`background:#BF0000`) : (`background:#595959`)}
// :hover{
//     background:#fff;
//     color: #595959;
//     border: 2px solid #595959;
// }
`
