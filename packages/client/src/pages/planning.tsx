import * as React from 'react';

import Layout from '@/components/layout/Layout';

import EditorComponent from '@/components/Editor';
import TokenDaoCreator from '@/components/TokenDaoCreator';

export default function HomePage() {
  const [editorData, setEditorData] = React.useState(null);

  const handleEditorChange = (data: any) => {
    setEditorData(data);
  };

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3'>
          <EditorComponent onChange={handleEditorChange} />
        </div>
        <div>
          <TokenDaoCreator />
        </div>
      </div>
    </Layout>
  );
}
