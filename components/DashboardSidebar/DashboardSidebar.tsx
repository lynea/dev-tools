'use client'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Sidebar } from 'flowbite-react'

export const DashboardSidebar = () => {
    return (
        <div className="absolute top-16 left-0 flex h-full  bg-gray-100 p-4">
            <Sidebar
                className=" bg-gray-100"
                aria-label="Default sidebar example"
            >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#">Home</Sidebar.Item>
                        <Sidebar.Collapse label="Onboarding">
                            <Sidebar.Item href="#">Entity groups</Sidebar.Item>
                            <Sidebar.Item href="#">Entities</Sidebar.Item>
                            <Sidebar.Item href="#">Chapters</Sidebar.Item>
                            <Sidebar.Item href="#">Steps</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item href="#">Settings</Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}
