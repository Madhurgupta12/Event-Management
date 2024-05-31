// import {useEditor,EditorContent} from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import BulletList from '@tiptap/extension-bullet-list'
// import {useState,useEffect} from 'react'
// import axios from 'axios'
// const extensions = [
//     StarterKit,BulletList
// ]

// const TextEditor = () => {
//     const [content, setContent] = useState('')
//     const editor = useEditor({
//         extensions,
//         content
//     })
//     if(!editor){
//         return null
//     }
//     useEffect(() => {
//         const fetchContent = async () => {
//           const userId = localStorage.getItem('userId');
//           try {
//             const response = await axios.get(`http://localhost:4000/user/text/${userId}`);
//             setContent(response.data.content);
//           } catch (error) {
//             console.error('Error fetching content:', error);
//           }
//         };
    
//         fetchContent();
//       }, [editor]);
//     const handleContent = async () => {
//         const store = editor.getHTML();
//         console.log(store);
    
//         const userId=localStorage.getItem("userId"); 
    
//         try {
//           const response = await axios.post('http://localhost:4000/user/text', {
//             userId,
//             content: store,
//           });
//           console.log('Content saved:', response.data);
//         } catch (error) {
//           console.error('Error saving content:', error);
//         }
//       };
//     const temp=localStorage.getItem("jwt");
//     console.log(temp);
//     return (
//         <div className='m-8'>
//             <div className='w-full flex flex-wrap bg-gray-600 p-3 gap-3 text-white'>
//             <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={
//           !editor.can()
//             .chain()
//             .focus()
//             .toggleBold()
//             .run()
//         }
//         className={editor.isActive('bold') ? 'is-active' : ''}
//       >
//         bold
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         disabled={
//           !editor.can()
//             .chain()
//             .focus()
//             .toggleItalic()
//             .run()
//         }
//         className={editor.isActive('italic') ? 'is-active' : ''}
//       >
//         italic
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         disabled={
//           !editor.can()
//             .chain()
//             .focus()
//             .toggleStrike()
//             .run()
//         }
//         className={editor.isActive('strike') ? 'is-active' : ''}
//       >
//         strike
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleCode().run()}
//         disabled={
//           !editor.can()
//             .chain()
//             .focus()
//             .toggleCode()
//             .run()
//         }
//         className={editor.isActive('code') ? 'is-active' : ''}
//       >
//         code
//       </button>
//       <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
//         clear marks
//       </button>
//       <button onClick={() => editor.chain().focus().clearNodes().run()}>
//         clear nodes
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setParagraph().run()}
//         className={editor.isActive('paragraph') ? 'is-active' : ''}
//       >
//         paragraph
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//         className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
//       >
//         h1
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
//       >
//         h2
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
//       >
//         h3
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
//         className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
//       >
//         h4
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
//         className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
//       >
//         h5
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
//         className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
//       >
//         h6
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive('bulletList') ? 'is-active' : ''}
//       >
//         toggleBulletList
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive('orderedList') ? 'is-active' : ''}
//       >
//         ordered list
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//         className={editor.isActive('codeBlock') ? 'is-active' : ''}
//       >
//         code block
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={editor.isActive('blockquote') ? 'is-active' : ''}
//       >
//         blockquote
//       </button>
//       <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
//         horizontal rule
//       </button>
//       <button onClick={() => editor.chain().focus().setHardBreak().run()}>
//         hard break
//       </button>
//       <button
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={
//           !editor.can()
//             .chain()
//             .focus()
//             .undo()
//             .run()
//         }
//       >
//         undo
//       </button>
//       <button
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={
//           !editor.can()
//             .chain()
//             .focus()
//             .redo()
//             .run()
//         }
//       >
//         redo
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setColor('#958DF1').run()}
//         className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
//       >
//         purple
//       </button>
//             </div>
//             <div className='border border-gray-500 border-t-0'>
//             <EditorContent editor={editor} className="max-h-96 overflow-y-scroll"/>
//             </div>
//             <div>
//                 <button onClick={handleContent}>Save</button>
//             </div>
//         </div>
//     )
// }
// export default TextEditor
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div className='m-8'>
            <div className='w-full flex flex-wrap bg-gray-600 p-3 gap-3 text-white'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    bold
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
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    italic
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
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    strike
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
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    code
                </button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    clear marks
                </button>
                <button onClick={() => editor.chain().focus().clearNodes().run()}>
                    clear nodes
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    h1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    h2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    h3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    h4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    h5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    h6
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    toggleBulletList
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    code block
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    blockquote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    horizontal rule
                </button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    hard break
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
                >
                    undo
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
                >
                    redo
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                >
                    purple
                </button>
            </div>
            <div className='border border-gray-500 border-t-0'>
                <EditorContent editor={editor} className="max-h-96 overflow-y-scroll" />
            </div>
            <div>
                <button onClick={handleContent}>Save</button>
            </div>
        </div>
    );
};

export default TextEditor;
