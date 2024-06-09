import { PayloadLexicalReactContent } from '@zapal/payload-lexical-react';
import { LexicalRenderer } from './LexicalRenderer';

export const RichText: React.FC<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & { children: any; invert?: boolean }
> = async ({ children, className, invert, ...props }) => (
  <div className={className} {...props}>
    {children && (
      <LexicalRenderer
      // blocks={{
      //   columns: ({ fields }: any = {}) => {
      //     const columnsSizes = (fields.size as string).split(' ');
      //     const gridSize = columnsSizes.reduce((acc, size) => acc + parseInt(size), 0);
      //     const columnsToRender = columnsSizes.length;

      //     const columns = Object.entries(fields as Record<string, any>)
      //       .filter(
      //         ([field]) => field.startsWith(columnNamePrefix) && parseInt(field[field.length - 1]) <= columnsToRender,
      //       )
      //       .map(([, value]) => value);

      //     return (
      //       <div className={`grid grid-cols-1 gap-x-5 xl:grid-cols-${gridSize}`}>
      //         {columns.map((column, idx) => (
      //           <div key={`column-${idx}`} className={`xl:col-span-${columnsSizes[idx]}`}>
      //             <LexicalRenderer>{column}</LexicalRenderer>
      //           </div>
      //         ))}
      //       </div>
      //     );
      //   },
      // }}
      >
        {children as PayloadLexicalReactContent}
      </LexicalRenderer>
    )}
  </div>
);
