import withModificator from '@/withClass'
import { yupResolver } from '@hookform/resolvers/yup'
import parsePhoneNumber from 'libphonenumber-js'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
const blockClassName = 'operation'

type TPropsOperation = {
    id?: string
    className: string
    title: string
    formData: {
        [key: string]: any
    }
    onSubmit: () => void
}

let schema = yup.object().shape({
    name: yup
        .string()
        // .matches(/^([^0-9]*)$/, 'Поле имя не должно содержать цифры')
        .required('Поле имя не должно быть пустым'),
    email: yup
        .string()
        .email('Поле email должно быть корректным')
        .required('Поле email не должно быть пустым'),
    tel: yup
        .string()
        .matches(
            /\+7 \d{3} \d{3} \d{2} \d{2}$/,
            'Поле телефон должно быть корректным'
        )
        .required('Поле телефон не должно быть пустым'),
})

export const normalizePhoneNumber = (value: string) => {
    const tel = parsePhoneNumber(value, 'RU')
    if (!tel) {
        return value
    }

    return tel.formatInternational()
}

const Operation: FC<TPropsOperation> = props => {
    const { className, title, formData, id, onSubmit } = props

    const {
        register,
        handleSubmit,
        errors,
        setValue,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm({
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (id) {
            setValue('tel', normalizePhoneNumber(formData.tel))
        }
    }, [])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful])

    return (
        <div className={className}>
            <h2 className={blockClassName + '__title'}>{title}</h2>
            <form
                className={blockClassName + '__form'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={blockClassName + '__list'}>
                    <div className={blockClassName + '__field input'}>
                        <input
                            type="text"
                            name="name"
                            className="input__field"
                            placeholder="Введите имя"
                            ref={register}
                            autoComplete="off"
                        />
                        <span className="input__error">
                            {errors.name && errors.name.message}
                        </span>
                    </div>
                    <div className={blockClassName + '__field input'}>
                        <input
                            type="email"
                            name="email"
                            className="input__field"
                            placeholder="Введите email"
                            ref={register}
                            autoComplete="off"
                        />
                        <span className="input__error">
                            {errors.email && errors.email.message}
                        </span>
                    </div>

                    <div className={blockClassName + '__field input'}>
                        <input
                            ref={register}
                            type="tel"
                            name="tel"
                            className="input__field"
                            placeholder="Введите телефон"
                            autoComplete="off"
                            onChange={event => {
                                event.target.value = normalizePhoneNumber(
                                    event.target.value
                                )
                            }}
                        />

                        <span className="input__error">
                            {errors.tel && errors.tel.message}
                        </span>
                    </div>

                    <div className={blockClassName + '__field'}>
                        <button className="btn btn_wide">Сохранить</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default withModificator(Operation, blockClassName)
