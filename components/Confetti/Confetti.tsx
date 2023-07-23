import { useLottie } from 'lottie-react'
import confettiAnimation from '../../public/confetti.json'

export const ConfettiAnimation = () => {
    const animationOptions = {
        animationData: confettiAnimation,
        loop: false,
    }

    const { View } = useLottie(animationOptions)

    return <>{View}</>
}
