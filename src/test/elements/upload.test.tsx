import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { defaultElements, PayloadLexicalReact } from '../../payloadLexicalReact';
import { PayloadLexicalReactContent } from '../../types';

const content = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'upload',
        fields: null,
        relationTo: 'media',
        direction: null,
        format: '',
        indent: 0,
        version: 1,
        value: {
          id: '6537a884f123252a20b44f80',
          alt: 'This is an alt text',
          filename: 'JSWeg-052.jpg',
          mimeType: 'image/jpeg',
          filesize: 3083817,
          width: 2500,
          height: 1397,
          createdAt: '2023-10-24T11:20:36.783Z',
          updatedAt: '2023-10-24T11:20:36.783Z',
          url: 'https://cdn.disko.io/lrw-cms/JSWeg-052.jpg',
        },
      },
      {
        type: 'upload',
        fields: null,
        relationTo: 'media',
        direction: null,
        format: '',
        indent: 0,
        version: 1,
        value: {
          id: '6537a884f123252a20b44f81420',
          alt: 'This is a PDF',
          filename: 'dummy.pdf',
          mimeType: 'application/pdf',
          createdAt: '2023-10-24T11:20:36.783Z',
          updatedAt: '2023-10-24T11:20:36.783Z',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
      },
    ],
  },
} as any as PayloadLexicalReactContent;

describe('Testing custom upload renderer', async () => {
  it('Should render an img and the alt text', async () => {
    render(
      <PayloadLexicalReact
        content={content}
        elements={{
          ...defaultElements,
          upload: (element) => {
            if (typeof element?.value === 'object' && element.value.mimeType === 'image/jpeg' && element.value.url)
              return (
                <div role="img">
                  <img src={element.value.url} alt={element.value.alt} />
                </div>
              );

            if (typeof element?.value === 'object' && element.value.mimeType === 'application/pdf' && element.value.url)
              return (
                <iframe src={element.value.url} title={element.value?.filename || ''} height="100%" width="100%" />
              );
          },
        }}
      />,
    );
    expect(screen.getByAltText('This is an alt text')).toBeInTheDocument();
  });

  it('Should render an iframe tag with height and width attributes', async () => {
    render(
      <PayloadLexicalReact
        content={content}
        elements={{
          ...defaultElements,
          upload: (element) => {
            if (typeof element?.value === 'object' && element.value.mimeType === 'image/jpeg' && element.value.url)
              <div role="img">
                <img src={element.value.url} alt={element.value.alt} />
              </div>;

            if (typeof element?.value === 'object' && element.value.mimeType === 'application/pdf' && element.value.url)
              return <iframe src={element.value.url} title={element.value.filename || ''} height="100%" width="100%" />;
          },
        }}
      />,
    );

    const pdfDoc = screen.getByTitle(/dummy.pdf/i);

    expect(pdfDoc).toBeInTheDocument();
    expect(pdfDoc).toHaveAttribute('height');
    expect(pdfDoc).toHaveAttribute('width');
  });
});
