import { Background } from '@/components/Background';
import { Logo } from '@/components/Logo';
import { RichText } from '@/components/RichText';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
// import Link from 'next/link';
import { Home } from 'generated-types';
import React from 'react';

const HomePage: React.FC = async () => {
  let home: Home | null = null;

  try {
    const localApi = await getPayloadHMR({ config });
    home = await localApi.findGlobal({
      slug: 'home',
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <main>
        <article>
          <Logo />

          <h1>{home?.title ? home.title : '@zapal/payload-lexical-react'}</h1>
        </article>

        {home?.content ? (
          <RichText>{home.content}</RichText>
        ) : (
          <div className="codeBlock">
            <pre>
              <br />
              <br />
              <code>Fill the Home global `content` field in admin panel first</code>
              <br />
              <br />
              <br />
            </pre>
          </div>
        )}
        {/* 
        <div className="codeBlock">
          <pre>
            <code>
              {`import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
const payload = await getPayloadHMR({ config: configPromise })

const data = await payload.find({
  collection: 'posts',
})

return <Posts data={data} />
`}
            </code>
          </pre>
        </div> */}
      </main>
      <Background />
    </>
  );
};

export default HomePage;
