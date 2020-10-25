import { Ifield } from '@/utils'
import withModificator from '@/withClass'
import React from 'react'

const blockClassName = 'input'

interface IPropsField extends Ifield {
    innerRef?: () => void
    shouldValidate: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function isInvalid(props: IPropsField): boolean {
    const { valid, touched, shouldValidate } = props
    return !valid && shouldValidate && touched
}

const Input: React.FC<IPropsField> = props => {
    const {
        name,
        placeholder,
        type,
        autoComplete,
        onChange,
        errorMessage,
        value,
        innerRef,
    } = props

    return (
        <div
            className={`${blockClassName} ${
                isInvalid(props) ? 'is-error' : ''
            }`}
        >
            <input
                ref={innerRef && innerRef}
                name={name}
                className={blockClassName + '__field'}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                type={type}
                autoComplete={autoComplete}
            />
            {isInvalid(props) ? (
                <span className={blockClassName + '__error'}>
                    {errorMessage || 'Введите верное значение'}
                </span>
            ) : null}
        </div>
    )
}

export default withModificator(Input, blockClassName)
