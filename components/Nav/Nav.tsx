'use client'

import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import Image from 'next/image'

import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { UserButton } from '@clerk/nextjs'

type NavProps = {
    sidebarToggle: React.ReactNode
    isAdmin: boolean
}

export const Nav: FunctionComponent<NavProps> = ({
    sidebarToggle,
    isAdmin,
}) => {
    return (
        <NavigationMenu className="inline-block  py-4">
            <NavigationMenuList className="flex w-screen justify-between px-5">
                <span className="flex items-center gap-3">
                    <NavigationMenuItem>
                        <Link href="/account" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <h2 className="mr-2 text-2xl font-bold text-foreground">
                                    Onboardify
                                </h2>

                                <Image
                                    src="/onboardify-logo.svg"
                                    width={30}
                                    height={30}
                                    alt="logo"
                                />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <UserButton />
                    </NavigationMenuItem>
                </span>
                <span className="flex gap-3">
                    {isAdmin ? (
                        <NavigationMenuItem>
                            <Link href="/account" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Account
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ) : null}

                    <NavigationMenuItem>
                        <ThemeToggle />
                    </NavigationMenuItem>
                    <NavigationMenuItem className="justify-end self-end">
                        {sidebarToggle}
                    </NavigationMenuItem>
                </span>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
