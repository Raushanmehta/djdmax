import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

export default function TiptapEditor({ value, onChange }) {

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-md p-3 min-h-[200px]">
      <EditorContent editor={editor} />
    </div>
  )
}