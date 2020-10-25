import Input from '@/components/input/input'
import ModalApp from '@/components/modal/modal'
import { setIsErrorAuth } from '@/store/actions/fetchErrorActions'
import { AppThunkAction, AppThunkDispatch, RootState } from '@/store/types'
import { TUidType } from '@/store/types/authTypes'
import { IFormControls, validate, validateForm } from '@/utils/'
import withModificator from '@/withClass/'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'

const blockClassName = 'auth'

type TPropsAuth = {
    error: boolean
    msg: string
    className: string
    thunkMethod: (field: TUidType) => AppThunkAction
    bindTo: string
    textHelper: string
    textBtn: string
    titleModal: string
    controls: IFormControls
}

const Auth: React.FC<TPropsAuth> = props => {
    const {
        className,
        thunkMethod,
        textHelper,
        textBtn,
        bindTo,
        controls,
    } = props
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer
    const { isErrorAuth } = useSelector(fetchErrorReducer)
    const thunkDispatch: AppThunkDispatch = useDispatch()
    const [field, setField] = useState<string>('')
    const dispatch: Dispatch = useDispatch()

    const [isFormValid, setFormValid] = useState<boolean>(false)
    const [formControls, setFormControls] = useState<IFormControls>({})

    useEffect(() => {
        setFormControls(controls)
    }, [])

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (field !== '') {
            thunkDispatch(thunkMethod(field))
            setField('')
            setFormValid(false)
            setFormControls(controls)
        }
    }

    const changeHandler = (value: string, controlName: string) => {
        const updatedFormControls = { ...formControls }
        const control = { ...formControls[controlName] }
        setField(value)
        control.touched = true
        control.value = value
        const { isValid, optionErrorMessage } = validate(control)

        control.valid = isValid
        control.errorMessage = optionErrorMessage

        updatedFormControls[controlName] = control

        setFormValid(validateForm(updatedFormControls))

        setFormControls(updatedFormControls)
    }

    const controlsToRender = Object.keys(formControls).map(
        (controlName: string, index: number) => {
            const control = formControls[controlName]

            return (
                <div className={blockClassName + '__field'} key={index}>
                    <Input
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        placeholder={control.placeholder}
                        errorMessage={control.errorMessage}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                            changeHandler(ev.target.value, controlName)
                        }
                    />
                </div>
            )
        }
    )

    const clearError = () => {
        dispatch(
            setIsErrorAuth({
                error: false,
                msg: '',
            })
        )
    }

    return (
        <>
            {isErrorAuth.error && (
                <ModalApp
                    open={isErrorAuth.error}
                    title="Ошибка авторизации"
                    text={isErrorAuth.msg}
                    onClose={clearError}
                />
            )}
            <form className={className} onSubmit={handleSubmit}>
                <div className={blockClassName + '__list'}>
                    {controlsToRender}

                    <div className={blockClassName + '__field'}>
                        <button
                            className="btn btn_wide"
                            disabled={!isFormValid}
                        >
                            {textBtn}
                        </button>
                    </div>
                </div>
                <div className={blockClassName + '__center'}>
                    <Link to={bindTo} className={blockClassName + '__to'}>
                        {textHelper}
                    </Link>
                </div>
            </form>
        </>
    )
}

export default withModificator(Auth, blockClassName)
