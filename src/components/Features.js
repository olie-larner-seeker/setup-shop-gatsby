import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
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
      <div className="flex flex-col w-11/12 mx-auto sm:block">
        <h1
          className="w-full mx-auto text-4xl leading-snug text-center features-headline"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <div className="w-full mx-auto sm:w-10/12">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={feature.length}
          visibleSlides={3}
          isIntrinsicHeight={true}
        >
          <Slider
          >
          {feature.map((item, key) => {
            return (
              <Slide key={key}>
              <div className="table h-full px-4 my-0" >
                <div className="table-cell align-middle">
                  <h3 className="pb-4 uppercase">{item.title}</h3>
                  <p className="pb-6 text-sm">{item.blurb}</p>
                  {renderCta(item)}
                </div>
              </div>
              </Slide>
            );
          })}
          </Slider>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
};

export default Features;
