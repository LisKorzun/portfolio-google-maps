import Link from 'next/link'
import Image from 'next/image'
import { MotionImage } from '@/components/common'
import { ContentWrapper } from '@/components/wrappers'

export default function Home() {
    return (
        <ContentWrapper>
            <div className="w-full md:w-1/2 lg:w-2/3 h-[50vh] bg-primary-dark overflow-hidden relative md:h-[70vh] md:mr-4">
                <MotionImage
                    src="/continents.png"
                    alt="Logo"
                    width={1002}
                    height={1002}
                    priority
                    className="absolute top-0 right-0 w-full h-auto "
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ type: 'linear', delay: 0.2, duration: 1.5 }}
                />
            </div>

            <div className="w-full sm:flex sm:mb-4 md:flex-col md:w-1/2 lg:w-1/3 md:mb-0">
                <Link
                    href="/locations"
                    className="bg-primary-dark p-10 pt-32 mb-2 flex flex-col justify-end relative sm:mr-2 sm:mb-0 sm:w-1/2 md:w-full md:h-1/2 md:mb-2"
                >
                    <Image
                        src="/way-finder-primary-light.png"
                        alt="way-finder"
                        width={71}
                        height={54}
                        priority
                        className="absolute top-0 left-9 w-auto h-auto opacity-50"
                    />
                    <h3 className="font-black text-white text-6xl sm:text-4xl xl:text-6xl">Locations</h3>
                    <p className="text-accent-sky text-xl pt-3 sm:text-sm xl:text-xl">We are everywhere</p>
                </Link>
                <Link
                    href="/routes"
                    className="bg-primary-light p-10 pt-32 mb-2 flex flex-col justify-end relative sm:mb-0 sm:w-1/2 md:w-full md:h-1/2"
                >
                    <Image
                        src="/way-finder-primary-dark.png"
                        alt="way-finder"
                        width={71}
                        height={54}
                        priority
                        className="absolute top-0 left-9 w-auto h-auto opacity-50"
                    />
                    <h3 className="font-black text-primary-dark text-6xl sm:text-4xl xl:text-6xl">Routes</h3>
                    <p className=" text-white text-xl pt-3 sm:text-sm xl:text-xl">There are lots of ways to reach us</p>
                </Link>
            </div>
        </ContentWrapper>
    )
}
