import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';
import Text from '@/components/Text';
import Vote from '@/components/Vote';
import DaoNft from '@/components/DaoNft';

const description = "Dear friends, \
I have a thrilling proposition for you. I'm seeking financial support to fulfill my lifelong dream of personal travel. In return, I will live stream my incredible travel experiences, allowing you to be a part of every moment. \
Your contribution will enable me to explore captivating destinations, sharing the sights, sounds, and stories through live streaming. Together, we can break down barriers and experience the world's wonders. \
I appreciate your support and offer special perks as a token of gratitude. Let's embark on this adventure together and create lasting memories. \
Thank you for considering my request, and I can't wait to take you on an unforgettable virtual travel experience."

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

export default function Dao() {
  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4 h-full'>
        <div className='col-span-3'>
          <div className='bg-slate-700/50 rounded-xl'>
            <Text content={description}/>
          </div>
          <div>
            {daos.map(dao => <div>
              <Text content={dao.place} size="text-xl"/>
              <Text content={dao.description}/>
            </div>)}
          </div>
        </div>
        <div className='bg-neutral-400 py-4 rounded-xl'>
          <DaoNft />
          <Vote />
        </div>
      </div>
    </Layout>
  );
}

