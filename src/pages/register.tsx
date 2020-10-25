import Auth from '@/components/auth/auth'
import { thunkRegister } from '@/store/actions/authActions'
import { createControl } from '@/utils'
import React from 'react'

const Register: React.FC = () => {
    return (
        <Auth
            thunkMethod={thunkRegister}
            bindTo="/login"
            textHelper="Уже зарегистрированы?"
            textBtn="Зарегистрироваться"
            controls={{
                register: createControl(
                    {
                        type: 'text',
                        placeholder: 'Введите ID, не менее 6 символов',
                        errorMessage: 'Поле ID не может быть пустым',
                        typeField: 'Id',
                    },
                    {
                        required: true,
                        minLength: 6,
                    }
                ),
            }}
        />
    )
}

export default Register
