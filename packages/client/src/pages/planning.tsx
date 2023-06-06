import * as React from 'react';

import Layout from '@/components/layout/Layout';
import { OutputData } from "@editorjs/editorjs";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const EditorBlock = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

import TokenDaoCreator from '@/components/TokenDaoCreator';

export default function HomePage() {
  const [editorData, setEditorData] = React.useState<OutputData>({
    blocks: [
      {
        type: 'header',
        data: {},
      },
    ], // Provide initial blocks or an empty array
  },);

  const handleEditorChange = (data: any) => {
    setEditorData(data);
  };

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3'>
          <EditorBlock data={editorData} onChange={handleEditorChange} holder="editorjs-container"/>
        </div>
        <div>
          <TokenDaoCreator />
        </div>
      </div>
    </Layout>
  );
}
