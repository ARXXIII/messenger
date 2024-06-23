import MobileFooter from "./MobileFooter";
import DesktopSidebar from "./DesktopSidebar";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Sidebar({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser()

    return (
        <div className="lg:relative lg:flex lg:justify-between lg:gap-x-12 h-full">
            <DesktopSidebar
                currentUser={currentUser!}
            />
            <MobileFooter />
            <main className="w-full h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar