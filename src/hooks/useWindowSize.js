import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

export const useWindowSize = (wait = 200) => {
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    })

    useEffect(() => {
        const handleSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        handleSize()

        const onResize = debounce(handleSize, wait, { leading: true })
        window.addEventListener('resize', onResize)

        return () => window.removeEventListener('resize', onResize)
    }, [wait])

    return size
}
