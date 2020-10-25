import Auth from '@/components/auth/auth'
import { thunkLogin } from '@/store/actions/authActions'
import { createControl } from '@/utils'
import React from 'react'

const Login: React.FC = () => {
    return (
        <Auth
            thunkMethod={thunkLogin}
            bindTo="/register"
            textHelper="Еще не зарегистрированы?"
            textBtn="Войти"
            controls={{
                login: createControl(
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

export default Login
