import { motion } from 'framer-motion'
import { useMapNearestRoute } from '@/components/routes/nearest'
import { LocationMarkerIcon } from '@/components/icons'
import { TRAVEL_MODES_ICONS } from '@/components/routes'
import { smoothTransition } from '@/animations'
import { COLOURS } from '@/constants'

export const TravelModeSwitcher = () => {
    const { travelMode, route, availableRoutes, changeTravelMode, routeDetailsIsShown, toggleRoteDetails } = useMapNearestRoute()
    const CurrentModeIcon = TRAVEL_MODES_ICONS[travelMode]

    return (
        <div className="h-full w-full flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-primary-dark items-center">
                    <motion.div
                        key={travelMode}
                        initial={{ x: -80 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <CurrentModeIcon className="w-8 h-8" />
                    </motion.div>
                    <div className="leading-tight text-left">
                        <div className="text-[10px]">From:</div>
                        <div>{route.startAddress}</div>
                    </div>
                </div>
                <div className="flex gap-2 overflow-hidden items-center relative min-h-[100px]">
                    <motion.div
                        className="border-l border-primary-dark border-dashed h-[200px] absolute top-[-30px] left-[15px]"
                        initial={{ y: -50 }}
                        animate={{ y: 1 }}
                        transition={{
                            ease: 'linear',
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'loop',
                        }}
                    ></motion.div>
                    <motion.div
                        key={travelMode}
                        className="ml-10 flex items-stretch text-[10px] h-fit leading-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ ...smoothTransition, delay: 0.1 }}
                    >
                        <div className="text-left py-2 px-4 border border-slate-200 text-primary-dark bg-white">
                            <div className="font-medium">{route.duration}</div>
                            <div>{route.distance}</div>
                        </div>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.08 }}
                            transition={smoothTransition}
                            className="text-white bg-primary-dark py-2 px-4 border-none outline-none"
                            onClick={toggleRoteDetails}
                        >
                            {routeDetailsIsShown ? 'Hide' : 'Show'} details
                        </motion.button>
                    </motion.div>
                </div>
                <div className="flex gap-2 text-primary-dark items-center">
                    <LocationMarkerIcon className="w-8 h-8" />
                    <div className="leading-tight text-left">
                        <div className="text-[10px]">To:</div>
                        <div>{route.endAddress}</div>
                    </div>
                </div>
            </div>
            <motion.div
                key={travelMode}
                className="flex gap-2 w-full justify-start text-slate-700 overflow-auto h-fit mt-6"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ ...smoothTransition, delay: 0.4 }}
            >
                {Object.values(availableRoutes).map((alternativeRoute) => {
                    if (alternativeRoute.mode === route.mode) return
                    const Icon = TRAVEL_MODES_ICONS[alternativeRoute.mode]
                    return (
                        <motion.div
                            key={alternativeRoute.mode}
                            className="flex gap-2 py-2 px-4 border border-slate-200 items-center cursor-pointer min-w-fit min-h-fit"
                            whileHover={{ backgroundColor: COLOURS.GRAY_200 }}
                            initial={{ backgroundColor: COLOURS.WHITE }}
                            transition={smoothTransition}
                            onClick={() => changeTravelMode(alternativeRoute.mode)}
                        >
                            <Icon className="w-6 h-6" />
                            <div className="text-[10px] leading-tight text-left">
                                <div className="font-medium">{alternativeRoute.duration}</div>
                                <div>{alternativeRoute.distance}</div>
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}
