import * as React from 'react';

import Layout from '@/components/layout/Layout';
import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";

const EditorBlock = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

import TokenDaoCreator from '@/components/TokenDaoCreator';
import { useUploadMetadata } from '@/hook/useUploadNFTStorage';

export default function HomePage() {
  const [editorData, setEditorData] = React.useState<OutputData>({
    blocks: [
      {
        type: 'header',
        data: {},
      },
    ],
  },);

  const handleEditorChange = (data: any) => {
    setEditorData(data);
  };

  const createPlanning = async () => {
    const url = await useUploadMetadata(editorData);
    console.log({url})
  }

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3'>
          <EditorBlock data={editorData} onChange={handleEditorChange} holder="editorjs-container"/>
        </div>
        <div>
          <TokenDaoCreator onSubmit={createPlanning} />
        </div>
      </div>
    </Layout>
  );
}
