import { MotionLink } from '@/components/common'
import Image from 'next/image'

export default function Locations() {
    return (
        <>
            <div className="col-span-8 border-b-slate-100 border-l-slate-100 border-b border-l bg-primary-dark relative"></div>
            <div className="col-span-4">
                <MotionLink
                    href="/locations"
                    className="bg-primary-dark p-8 pt-12 flex items-center relative"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 18,
                    }}
                >
                    <Image
                        src="/way-finder-blue.png"
                        alt="way-finder"
                        width={40}
                        height={28.6}
                        priority
                        className="absolute top-0 left-7 w-auto h-auto"
                    />
                    <h3 className="font-black text-accent-green text-3xl">Locations</h3>
                </MotionLink>
            </div>
        </>
    )
}
