import withModificator from '@/withClass'
import React from 'react'
import Popup from 'reactjs-popup'

const blockClassName = 'modal'

type TModalError = {
    open: boolean
    title: string
    text: string
    className: string
    onClose?: () => void
}
const ModalApp: React.FC<TModalError> = props => {
    const { open, title, text, className, onClose } = props

    return (
        <Popup open={open} modal onClose={() => onClose && onClose()}>
            {(close: Function) => (
                <div className={className}>
                    <h2 className={blockClassName + '__title'}>{title}</h2>
                    <p className={blockClassName + '__error'}>{text}</p>
                    <div className={blockClassName + '__actions'}>
                        <button
                            className="btn"
                            onClick={() => {
                                close()
                            }}
                        >
                            ОК
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default withModificator(ModalApp, blockClassName)
