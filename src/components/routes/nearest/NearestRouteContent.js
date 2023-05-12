import { motion } from 'framer-motion'
import { STATUS } from '@/constants'
import { scaleInfinity, smoothTransition } from '@/animations'
import { useMapNearestRoute, TravelModeSwitcher } from '@/components/routes/nearest'

export const NearestRouteContent = () => {
    const { status, error, buildRoute } = useMapNearestRoute()

    return (
        <div className="py-6 px-6 text-slate-600 text-sm flex flex-col justify-center items-center text-center h-full">
            {status === STATUS.INITIAL && <p className="mb-6">We will find an easy way to get to us.</p>}
            {status === STATUS.ERROR && (
                <>
                    <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={smoothTransition}
                        className="text-lg text-primary-dark font-black mb-2"
                    >
                        Ooops...
                    </motion.p>
                    <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={smoothTransition}
                        className="mb-6"
                    >
                        {error}
                    </motion.p>
                </>
            )}
            {(status === STATUS.INITIAL || status === STATUS.ERROR) && (
                <motion.button
                    type="button"
                    onClick={buildRoute}
                    whileHover={{ scale: 1.05 }}
                    transition={smoothTransition}
                    className="text-white bg-primary-dark font-bold text-sm px-4 py-2 shadow-inner"
                >
                    Start the Journey
                </motion.button>
            )}
            {status === STATUS.SEARCHING && (
                <>
                    <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={smoothTransition}
                        className="mb-6"
                    >
                        Searching ...
                    </motion.p>
                    <div className="text-primary-light">
                        <motion.svg
                            {...scaleInfinity}
                            className="w-12 h-12 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.9056439,14.3198574 C11.5509601,15.3729184 9.84871145,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,9.84871145 15.3729184,11.5509601 14.3198574,12.9056439 L19.6568542,18.2426407 L18.2426407,19.6568542 L12.9056439,14.3198574 Z M8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 Z"
                            ></path>
                        </motion.svg>
                    </div>
                </>
            )}

            {status === STATUS.DONE && <TravelModeSwitcher />}
        </div>
    )
}
