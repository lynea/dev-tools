'use client'

import React from 'react'
import { type Editor } from '@tiptap/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBold,
    faCode,
    faHeading,
    faItalic,
    faList,
    faListOl,
    faQuoteLeft,
    faRedo,
    faStrikethrough,
    faUndo,
} from '@fortawesome/free-solid-svg-icons'
import { Toggle } from '../ui/toggle'

type Props = {
    editor: Editor | null
}

const Toolbar = ({ editor }: Props) => {
    if (!editor) {
        return null
    }
    return (
        <div
            className="flex w-full flex-wrap items-start justify-between gap-5 rounded-tl-md
    rounded-tr-md   px-4 py-3"
        >
            <div className="flex w-full flex-wrap items-center justify-start gap-5 lg:w-10/12 ">
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleBold().run()
                    }}
                >
                    <FontAwesomeIcon icon={faBold} />
                </Toggle>
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleItalic().run()
                    }}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </Toggle>
                {/* <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggle
                    }}
                    className={
                        editor.isActive('underline')
                            ? 'rounded-lg bg-sky-700 p-2 text-foreground'
                            : 'text-sky-400'
                    }
                >
                    <FontAwesomeIcon icon={faUnderline} />
                </button> */}
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleStrike().run()
                    }}
                >
                    <FontAwesomeIcon icon={faStrikethrough} />
                </Toggle>
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }}
                >
                    <FontAwesomeIcon icon={faHeading} />
                </Toggle>

                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleBulletList().run()
                    }}
                >
                    <FontAwesomeIcon icon={faList} />
                </Toggle>
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleOrderedList().run()
                    }}
                >
                    <FontAwesomeIcon icon={faListOl} />
                </Toggle>
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleBlockquote().run()
                    }}
                >
                    <FontAwesomeIcon icon={faQuoteLeft} />
                </Toggle>
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setCode().run()
                    }}
                >
                    <FontAwesomeIcon icon={faCode} />
                </Toggle>
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().undo().run()
                    }}
                >
                    <FontAwesomeIcon icon={faUndo} />
                </Toggle>
                <Toggle
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().redo().run()
                    }}
                >
                    <FontAwesomeIcon icon={faRedo} />
                </Toggle>
            </div>
        </div>
    )
}

export default Toolbar
