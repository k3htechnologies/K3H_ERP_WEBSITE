import { Toast } from './Toast'
import type { ToastProps } from './Toast'

export interface ToastContainerProps {
    toasts: ToastProps[]
    onRemoveToast: (id: string) => void
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {

    return (
        <div
            style={{
                position: 'fixed',
                top: '36px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                pointerEvents: 'none'
            }}
        >
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    style={{
                        pointerEvents: 'auto'
                    }}
                >
                    <Toast
                        {...toast}
                        onClose={onRemoveToast}
                    />
                </div>
            ))}
        </div>
    )



}

export default ToastContainer
