import React from 'react';

const Paragraph = data => {
  return (
    <div className="container pb-4 mx-auto core-block">
      <div className="flex flex-col w-11/12 mx-auto sm:w-full sm:mr-auto sm:ml-0 sm:flex-row">
        <div className="flex flex-col-reverse w-full pt-4 mx-auto sm:mr-auto sm:ml-0 sm:pt-0 sm:flex-row">
          {data.__typename === 'CoreParagraphBlock' && (
            <div
              className={`w-11/12 sm:w-full mx-auto sm:mr-auto sm:ml-0 core-paragraph text-${data.attributes.align}`}
              dangerouslySetInnerHTML={{ __html: data.originalContent }}
            />
          )}
          {data.__typename === 'CoreHeadingBlock' && (
            <div
              className={`w-11/12 sm:w-full mx-auto sm:mr-auto sm:ml-0 core-paragraph text-${data.attributes.align}`}
              dangerouslySetInnerHTML={{ __html: data.originalContent }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Paragraph;