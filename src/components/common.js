import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export const MotionLink = motion(Link, { forwardMotionProps: true })
export const MotionImage = motion(Image, { forwardMotionProps: true })
