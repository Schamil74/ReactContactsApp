import React, { FC } from 'react'

export interface IProps {
    [key: string]: any
}

const withModificator = (
    Component: Function,
    classname: string
): FC<IProps> => props => {
    const { modificator, addClazz, ...elemProps } = props
    const cls = [classname]
    if (modificator) {
        cls.push(`${classname}_${modificator}`)
    }

    if (addClazz) {
        cls.push(addClazz)
    }

    const newProps = {
        className: cls.join(' '),
        ...elemProps,
    }
    return <Component {...newProps} />
}

export default withModificator
