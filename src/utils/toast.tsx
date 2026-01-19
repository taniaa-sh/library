import Toast from '@/components/Toast'
import { createRoot } from 'react-dom/client'

const showToast = (
    text: string,
    color: 'success' | 'error',
    pauseOnHover?: boolean,
    timeWait?: number,
    isAdmin?: boolean
) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)

    const handleClose = () => {
        root.unmount()
        container.remove()
    }

    root.render(
        <Toast
            text={text}
            color={color}
            timeWait={timeWait}
            pauseOnHover={pauseOnHover}
            onClose={handleClose}
            isAdmin={isAdmin}
        />
    )
}

export default showToast