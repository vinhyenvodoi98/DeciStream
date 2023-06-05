import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

interface EditorComponentProps {
  onChange: (data: EditorJS.OutputData) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let editor: EditorJS | null = null;

    const loadEditor = async () => {
      const editorModule = await import('@editorjs/editorjs');
      const HeaderModule = await import('@editorjs/header');
      const ListModule = await import('@editorjs/list');
      const SimpleImageModule = await import('@editorjs/simple-image');

      editor = new editorModule.default({
        holder: editorRef.current!,
        autofocus: true,
        onChange: async () => {
          if (editor) {
            const outputData = await editor.save();
            onChange(outputData);
          }
        },
        tools: {
          header: HeaderModule.default,
          list: ListModule.default,
          simpleImage: SimpleImageModule.default,
        },
        data: {
          blocks: [
            {
              type: 'header',
              data: {
                text: 'Your Title',
                level: 1,
              },
            },
          ], // Provide initial blocks or an empty array
        },
      });
    };

    loadEditor();

    return () => {
      if (editor) {
        editor.isReady
          .then(() => {
            editor!.destroy();
          })
          .catch((error) => console.error('Editor cleanup error:', error));
      }
    };
  }, []);

  return <div ref={editorRef}></div>;
};

export default EditorComponent;
