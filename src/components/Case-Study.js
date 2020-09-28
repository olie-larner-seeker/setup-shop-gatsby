import React from "react";

const CaseStudy = (data) => {
  const { title, featuredImage, slug } = data.caseStudyBanner.caseStudy;

  return (
    <div
      className="relative w-full bg-center bg-cover h-halfscreen"
      style={{ backgroundImage: `url(${featuredImage.node.sourceUrl})` }}
    >
      <div className="w-11/12 max-w-screen-xl mx-auto">
        <div className="w-10/12 pt-16 mx-auto text-white">
          <h3 className="pb-1 font-normal">Case Study</h3>
          <a className="text-xl font-bold" href={`/post/${slug}`}>
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
