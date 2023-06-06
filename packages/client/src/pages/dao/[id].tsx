import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';
import Vote from '@/components/Vote';
import DaoNft from '@/components/DaoNft';
import EditorJsRenderer from '@/components/Editor/EditorJsRenderer';

const contents = {
  time: 1686060802429,
  blocks:[{
    id:"7MCCCx2E0B",
    type:"header",
    data:{
      text:"Hello world",
      level:3
    }},{
      id:"k2awdZazJz",
      type:"paragraph",
      data:{
        text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean le"
      }},{
          id:"IdKbrWd0MQ",type:"list",data:{style:"ordered","items":["đâsdasd","ádf","23ẻt","rtgh"]}
        },{
          id:"Bij3_TAumW",
          type:"delimiter",
          data:{}
        },{
          id:"r9Rvcl99DB",
          type:"paragraph",
          data:{
            text:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidus"
          }}],
          version:"2.27.0"
        }

const daos = [{
  place: "Senso-ji Temple",
  description: "Senso-ji Temple is one of the oldest and most popular temples in Tokyo. Located in the Asakusa area, this temple boasts beautiful architecture and dates back to the 7th century. Visitors can explore the main temple, admire the iconic Kaminarimon Gate, and wander through the temple's bustling shopping street with historical shops and food stalls."
},{
  place: "Tokyo Imperial Palace",
  description: "The Tokyo Imperial Palace is the residence of the Japanese Imperial Family. Visitors can join guided tours to explore the royal gardens and admire the beautiful architectural structures such as the main palace, museums, and the iconic Nijubashi Bridge."
},{
  place: "Shibuya Crossing",
  description: "Shibuya is a vibrant and famous district in Tokyo. Shibuya Crossing is a bustling intersection where multiple streets intersect. It is renowned for its bright neon lights and is especially famous for the crowds of people crossing the intersection simultaneously."
},{
  place: "Meiji Shrine",
  description: "Meiji Shrine is a serene and significant Shinto shrine located in a lush forested area in the heart of Tokyo. Dedicated to Emperor Meiji and Empress Shoken, the shrine offers a tranquil escape from the bustling city. Visitors can explore the expansive grounds, participate in traditional rituals, and admire the beautiful architecture."
},{
  place: "Tokyo Disneyland and DisneySea",
  description: "Tokyo Disneyland and DisneySea are two of the most popular theme parks in Tokyo. Tokyo Disneyland offers classic Disney attractions and magical experiences, while DisneySea has a unique nautical and adventure theme. Both parks provide thrilling rides, shows, parades, and a memorable experience for visitors of all ages."
}]

type ParsedContent = string | JSX.Element;
const editorJsHtml = require("editorjs-html");
const EditorJsToHtml = editorJsHtml();

export default function Dao() {
  const html = EditorJsToHtml.parse(contents) as ParsedContent[];
  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4 h-full'>
        <div className='col-span-3 px-12 shadow rounded-xl'>
          <EditorJsRenderer data={contents}/>
        </div>
        <div className='shadow py-4 rounded-xl'>
          <DaoNft />
          <Vote />
        </div>
      </div>
    </Layout>
  );
}

