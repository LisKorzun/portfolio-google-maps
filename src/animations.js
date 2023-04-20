export const smoothTransition = { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }

export const scaleInfinity = {
    initial: { scale: 0.7 },
    animate: { scale: 1.2 },
    transition: {
        ease: 'linear',
        duration: 1.3,
        repeat: Infinity,
        repeatType: 'mirror',
    },
}
