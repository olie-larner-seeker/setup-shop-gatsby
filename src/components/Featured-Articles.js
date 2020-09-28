import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import useWindowSize from "../utils/useWindowSize";

const FeaturedArticles = (data) => {
  const { featuredArticles } = data.featuredArticles;

  const screenWidth = useWindowSize();

  const numberOfSlide = () => {
    if (screenWidth.width <= 640) {
      return 1;
    }
    return 3;
  };

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={featuredArticles.length}
      visibleSlides={numberOfSlide()}
    >
      <Slider className="overflow-hidden slider-height">
        {featuredArticles.map((article, key) => {
          return (
            <Slide
              key={key}
              className="w-full text-white bg-center bg-cover sm:w-1/3 h-halfscreen"
              style={{
                backgroundImage: `url(${article.featuredImage.node.sourceUrl})`,
              }}
              innerClassName="p-12"
            >
              <p className="pb-1 text-lg">Article</p>
              <a
                className="inline-block w-7/12 text-xl font-bold leading-tight"
                href={`/post/${article.slug}`}
              >
                {article.title}
              </a>
            </Slide>
          );
        })}
      </Slider>
    </CarouselProvider>
  );
};

export default FeaturedArticles;
