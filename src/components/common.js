import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { COLOURS } from '@/constants'
import { smoothTransition } from '@/animations'

export const MotionLink = motion(Link, { forwardMotionProps: true })
export const MotionImage = motion(Image, { forwardMotionProps: true })

export const MotionIconButton = ({ children, onClick, activated = false, disabled = false }) => (
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

export const SidebarHeading = ({ title, subtitle, dark = true }) => {
    const src = dark ? '/way-finder-primary-light.png' : '/way-finder-primary-dark.png'
    const bgColor = dark ? 'bg-primary-dark' : 'bg-primary-light'
    const textColor = dark ? 'text-white' : 'text-primary-dark'

    return (
        <div className={`w-full px-8 py-6 flex flex-col justify-end relative h-[140px] ${bgColor}`}>
            <Image
                className="absolute top-0 left-7 w-auto h-auto opacity-50"
                src={src}
                alt="way-finder"
                width={47.3}
                height={36}
                priority
            />
            <h3 className={`font-black text-4xl ${textColor}`}>{title}</h3>
            {!!subtitle && <div className={`text-xs ${textColor}`}>{subtitle}</div>}
        </div>
    )
}
