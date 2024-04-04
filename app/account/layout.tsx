/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/HJuaG0lAsWs
 */
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faBell,
    faCheck,
    faCog,
    faEye,
    faFileCirclePlus,
    faFolder,
    faHome,
} from '@fortawesome/free-solid-svg-icons'
import { OrganizationSwitcher, UserButton, auth } from '@clerk/nextjs'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { redirect } from 'next/navigation'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { orgRole } = auth()

    if (orgRole !== 'org:admin') return redirect('/account')

    return (
        <div className="grid min-h-screen w-full dark:bg-slate-950   lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100 dark:bg-slate-950 lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-3">
                        <OrganizationSwitcher
                            afterCreateOrganizationUrl={'/account'}
                        />
                        <Button
                            className="ml-auto h-8 w-8"
                            size="icon"
                            variant="outline"
                        >
                            <FontAwesomeIcon
                                icon={faBell}
                                className="h-3 w-3"
                            />

                            <span className="sr-only">
                                Toggle notifications
                            </span>
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50"
                                href="/account"
                            >
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className="h-3 w-3"
                                />
                                Home
                            </Link>
                            <Accordion type="multiple" className="w-full">
                                <AccordionItem
                                    value="item-1"
                                    className="mb-2 border-none"
                                >
                                    <AccordionTrigger className="  flex items-center gap-3 rounded-lg  px-3 pb-0 text-gray-500  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                        <span className="flex items-center">
                                            <FontAwesomeIcon
                                                icon={faFolder}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />{' '}
                                            Entity groups
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col pb-0">
                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/entity-group">
                                                View all
                                            </Link>
                                        </div>

                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faFileCirclePlus}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/entity-group/create">
                                                Create
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type="multiple" className="w-full">
                                <AccordionItem
                                    value="item-1"
                                    className="mb-2 border-none"
                                >
                                    <AccordionTrigger className="  flex items-center gap-3 rounded-lg  px-3 pb-0 text-gray-500  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                        <span className="flex items-center">
                                            <FontAwesomeIcon
                                                icon={faFolder}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />{' '}
                                            Entities
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col pb-0">
                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/entity">
                                                View all
                                            </Link>
                                        </div>

                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faFileCirclePlus}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/entity/create">
                                                Create
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type="multiple" className="w-full">
                                <AccordionItem
                                    value="item-1"
                                    className="mb-2 border-none"
                                >
                                    <AccordionTrigger className="  flex items-center gap-3 rounded-lg  px-3 pb-0 text-gray-500  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                        <span className="flex items-center">
                                            <FontAwesomeIcon
                                                icon={faFolder}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />{' '}
                                            Chapters
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col pb-0">
                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/chapter">
                                                View all
                                            </Link>
                                        </div>

                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faFileCirclePlus}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/chapter/create">
                                                Create
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type="multiple" className="w-full">
                                <AccordionItem
                                    value="item-1"
                                    className="mb-2 border-none"
                                >
                                    <AccordionTrigger className="  flex items-center gap-3 rounded-lg  px-3 pb-0 text-gray-500  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                        <span className="flex items-center">
                                            <FontAwesomeIcon
                                                icon={faFolder}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />{' '}
                                            Steps
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col pb-0">
                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/step">
                                                View all
                                            </Link>
                                        </div>

                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faFileCirclePlus}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/step/create">
                                                Create
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type="multiple" className="w-full">
                                <AccordionItem
                                    value="item-1"
                                    className="mb-2 border-none"
                                >
                                    <AccordionTrigger className="  flex items-center gap-3 rounded-lg  px-3 pb-0 text-gray-500  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                        <span className="flex items-center">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />{' '}
                                            Todos
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col pb-0">
                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/todo">
                                                View all
                                            </Link>
                                        </div>

                                        <div className=" mt-1 flex items-center gap-1 rounded-lg  px-9 py-2  text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50">
                                            <FontAwesomeIcon
                                                icon={faFileCirclePlus}
                                                className="mr-3 h-3 w-3 transform-none"
                                            />
                                            <Link href="/account/todo/create">
                                                Create
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="/account/preview"
                            >
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="h-3 w-3"
                                />
                                Oboarding preview
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="/account/organization/profile"
                            >
                                <FontAwesomeIcon
                                    icon={faCog}
                                    className="h-3 w-3"
                                />
                                Manage Organization
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    You are currently on a free Beta plan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" size="sm">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-gray-100 px-6 dark:bg-slate-950 lg:h-[60px]">
                    <Link className="lg:hidden" href="#">
                        <FontAwesomeIcon icon={faBars} className="h-3 w-3" />

                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="w-full flex-1">
                        {/* <form>
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-3 top-3 h-3 w-3"
                                />
                                <Input
                                    className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
                                    placeholder="Search users..."
                                    type="search"
                                />
                            </div>
                        </form> */}
                    </div>
                    <ThemeToggle />
                    <UserButton />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
