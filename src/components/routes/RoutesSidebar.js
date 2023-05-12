import Accordion from '@/components/Accordion'
import { SidebarHeading } from '@/components/common'
import { COLOURS } from '@/constants'
import { ROUTES_TABS } from '@/components/routes/constants'

export const RoutesSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <>
            <SidebarHeading title="Routes" dark={false} />

            {ROUTES_TABS.map(({ Component, title, id }, i) => (
                <div key={i} className="overflow-hidden text-primary-dark">
                    <Accordion
                        tabId={id}
                        expanded={activeTab}
                        setExpanded={setActiveTab}
                        title={title}
                        expandedBgColor={COLOURS.PRIMARY_DARK}
                    >
                        <Component />
                    </Accordion>
                </div>
            ))}
        </>
    )
}
