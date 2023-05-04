import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { COLOURS } from '@/constants'
import { smoothTransition } from '@/animations'

export const MotionLink = motion(Link, { forwardMotionProps: true })
export const MotionImage = motion(Image, { forwardMotionProps: true })

export const MotionIconButton = ({ children, onClick, activated = false, disabled = false }) => {
    return (
        <motion.button
            className="py-2 px-4 border outline-none disabled:pointer-events-none "
            animate={{
                backgroundColor: disabled ? COLOURS.GRAY_100 : activated ? COLOURS.PRIMARY_DARK : COLOURS.WHITE,
                color: disabled || activated ? COLOURS.WHITE : COLOURS.PRIMARY_DARK,
                borderColor: disabled ? COLOURS.GRAY_100 : COLOURS.PRIMARY_DARK,
            }}
            transition={smoothTransition}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </motion.button>
    )
}
