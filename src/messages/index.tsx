interface TMessages {
    [key: string]: string
}

const messages: TMessages = {
    'Request failed with status code 404': 'Пользователь не найден',
    'Request failed with status code 500':
        'Пользователь с таким ID уже зарегистрирован',
}

export default messages
