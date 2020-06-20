/*
 * @Descripttion: 
 * @version: 
 * @Author: forceddd
 * @Date: 2020-06-18 18:59:11
 * @LastEditors: forceddd
 * @LastEditTime: 2020-06-19 09:46:13
 */
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import uploadImageCallBack from '../../utils/uploadImageCallBack'
function RichTextEditor(props, ref) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    useImperativeHandle(ref, () => ({
        getDetail,
    }))
    useEffect(() => {
        if (props.detail) {
            //将html转换成富文本对象
            const contentBlock = htmlToDraft(props.detail)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock)
                const editorState = EditorState.createWithContent(contentState)
                setEditorState(editorState)
            }
        }
    }, [props.detail])
    const handleEditorStateChange = editorState => setEditorState(editorState)
    const getDetail = () => draftToHtml(convertToRaw(editorState.getCurrentContent()))
    return (
        <div>
            <Editor
                editorState={editorState}
                editorStyle={{ height: '300px', border: '1px solid #ccc', paddingLeft: '20px' }}
                onEditorStateChange={handleEditorStateChange}
                toolbar={{
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                        alt: { present: true, mandatory: true }
                    },
                }}
            ></Editor>

        </div>

    );
}

export default forwardRef(RichTextEditor);