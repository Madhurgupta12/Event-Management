import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from "sweetalert"
const extensions = [
    StarterKit, BulletList
];

const TextEditor = () => {
    const [content, setContent] = useState('');
    
    const editor = useEditor({
        extensions,
        content,
    });

    useEffect(() => {
        const fetchContent = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:4000/user/text/${userId}`);
                setContent(response.data.content);
                if (editor) {
                    editor.commands.setContent(response.data.content);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, [editor]); // Depend on `editor` to ensure it runs once editor is ready

    const handleContent = async () => {
        const store = editor.getHTML();
        console.log(store);
    
        const userId = localStorage.getItem("userId");
    
        try {
            const response = await axios.put(`http://localhost:4000/user/text/${userId}`, {
                userId,
                content: store,
            });
            swal("Success", "Content saved successfully", "success");
            console.log('Content updated:', response.data);
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };
    
    const temp = localStorage.getItem("jwt");
    console.log(temp);

    if (!editor) {
        return null;
    }

    return (
        <div className='min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 p-8'>
            <div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold mb-4 text-center text-gray-800'>Text Editor</h1>
                <div className='w-full flex flex-wrap bg-gray-600 p-3 gap-3 text-white rounded-lg mb-4'>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={`px-3 py-1 rounded-lg ${editor.isActive('bold') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={`px-3 py-1 rounded-lg ${editor.isActive('italic') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        <em>I</em>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleStrike()
                                .run()
                        }
                        className={`px-3 py-1 rounded-lg ${editor.isActive('strike') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Strike
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleCode()
                                .run()
                        }
                        className={`px-3 py-1 rounded-lg ${editor.isActive('code') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Code
                    </button>
                    <button
                        onClick={() => editor.chain().focus().unsetAllMarks().run()}
                        className='px-3 py-1 rounded-lg bg-gray-500 hover:bg-blue-400 transition-colors duration-200'
                    >
                        Clear Marks
                    </button>
                    <button
                        onClick={() => editor.chain().focus().clearNodes().run()}
                        className='px-3 py-1 rounded-lg bg-gray-500 hover:bg-blue-400 transition-colors duration-200'
                    >
                        Clear Nodes
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('paragraph') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Paragraph
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        H3
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('heading', { level: 4 }) ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        H4
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('heading', { level: 5 }) ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        H5
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('heading', { level: 6 }) ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        H6
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('bulletList') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Bullet List
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('orderedList') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Ordered List
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('codeBlock') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Code Block
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('blockquote') ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Blockquote
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className='px-3 py-1 rounded-lg bg-gray-500 hover:bg-blue-400 transition-colors duration-200'
                    >
                        Horizontal Rule
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                        className='px-3 py-1 rounded-lg bg-gray-500 hover:bg-blue-400 transition-colors duration-200'
                    >
                        Hard Break
                    </button>
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .undo()
                                .run()
                        }
                        className='px-3 py-1 rounded-lg bg-gray-500 hover:bg-blue-400 transition-colors duration-200'
                    >
                        Undo
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .redo()
                                .run()
                        }
                        className='px-3 py-1 rounded-lg bg-gray-500 hover:bg-blue-400 transition-colors duration-200'
                    >
                        Redo
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                        className={`px-3 py-1 rounded-lg ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-400 transition-colors duration-200`}
                    >
                        Purple
                    </button>
                </div>
                <div className='border border-gray-800 rounded-lg p-4 bg-white max-h-96 overflow-y-scroll'>
    <EditorContent editor={editor} />
</div>


                <div className='mt-4 flex justify-center'>
                    <button 
                        onClick={handleContent} 
                        className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200'
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;
