'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FunctionComponent } from 'react'
import Toolbar from './Toolbar'

type TiptapProps = {
    description: string
    onChange: (richText: string) => void
}

export const Tiptap: FunctionComponent<TiptapProps> = ({
    description,
    onChange,
}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: description,
        editorProps: {
            attributes: {
                class: 'rounded-md border min-h-[150px] border-input p-3',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
            console.log('editor', editor.getHTML())
        },
    })

    return (
        <div className="w-full px-4">
            <Toolbar editor={editor} />
            <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
        </div>
    )
}

export default Tiptap
