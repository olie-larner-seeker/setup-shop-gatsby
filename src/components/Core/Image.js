import React from "react";

const Image = (data) => {
  const { attributes } = data;
  return (
    <div className="container py-4 mx-auto core-block">
      <div className="flex flex-col w-11/12 mx-auto sm:flex-row">
        <div className="flex flex-col-reverse w-full pt-4 mx-auto md:w-10/12 tbl:w-6/12 sm:pt-0 sm:flex-row">
          <div className={`w-full core-paragraph text-${attributes.align}`}>
            <img
              src={attributes.url}
              className={`${attributes.align} w-full sm:w-auto mx-auto`}
              alt={attributes.alt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
