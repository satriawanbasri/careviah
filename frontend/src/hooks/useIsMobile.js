import { useState, useEffect } from 'react'

export default (maxWidth = 767) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [maxWidth])

    return isMobile
}
