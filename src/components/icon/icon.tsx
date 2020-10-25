import withModificator from '@/withClass'
import React, { FC } from 'react'
interface IIcon {
    className: string
}
const Icon: FC<IIcon> = props => {
    return <i className={props.className}></i>
}

export default withModificator(Icon, 'icon')
