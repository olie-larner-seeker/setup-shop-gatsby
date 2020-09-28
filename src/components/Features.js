import React from "react";
import Cta from "./Cta";
import CtaHelper from "../utils/ctaHelper";

const Features = (data) => {
  const { intro, feature } = data.features;
  const renderCta = (cta) => {
    const ctastyle = CtaHelper({
      style: "clear-blue",
    });

    return (
      <Cta
        ctastyle={ctastyle}
        ctaCopy={cta.ctaCopy}
        ctaLink={cta.ctaLink}
        extraStyle="text-center inline-block text-sm"
      />
    );
  };
  return (
    <div className="w-full max-w-screen-xl py-16 mx-auto">
      <div className="flex flex-col w-11/12 mx-auto sm:flex-row">
        <h1
          className="w-full text-2xl leading-snug sm:text-5xl sm:w-2/5 features-headline"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <div className="grid w-full grid-flow-row grid-cols-1 sm:pl-10 sm:gap-6 sm:grid-cols-2 sm:grid-rows-3 sm:w-3/5">
          {feature.map((item, key) => {
            return (
              <div className="table h-full my-6 sm:my-0" key={key}>
                <div className="table-cell align-middle">
                  <h3 className="pb-4 uppercase">{item.title}</h3>
                  <p className="pb-6 text-sm">{item.blurb}</p>
                  {renderCta(item)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
