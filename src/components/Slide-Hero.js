import React, {useEffect, useState} from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import classnames from 'classnames'
import {
  CarouselProvider,
  Slider,
  Slide,
} from 'pure-react-carousel'

const SlideHero = data => {
    const [imageArray, setImageArray] = useState([]);

    const imageData = useStaticQuery(graphql`
        query SlideImages($parentId: IDQueryOperatorInput = {}) {
            allWpPage(filter: {parentId: $parentId, blocks: {elemMatch: {name: {eq: "acf/slide-hero"}}}}) {
                edges {
                node {
                    id
                    blocks {
                    ... on WpAcfSlideHeroBlock {
                        slideHero {
                        slides {
                            ... on WpPost {
                            id
                            featuredImage {
                                node {
                                localFile {
                                    childImageSharp {
                                        fluid(maxWidth: 800, quality: 100) {
                                        ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        }
    `);
        
    useEffect(() => {
        imageData.allWpPage.edges.map(item => {
            item.node.blocks.map(block => {
                if (block.__typename === "WpAcfSlideHeroBlock") {
                    setImageArray(block.slideHero.slides);
                }
            })
        })
    }) 

  return (
    <div className="relative w-full mx-auto mb-8">
    {imageArray.length !== 0 &&
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={data.slideHero.slides.length}
      >
        <Slider
          className="overflow-hidden slider-height"
          style={{ maxHeight: '505px' }}
        >
          {data.slideHero.slides.map((slide, key) => {
            const titleCount = slide.title.length;
            
            return (
              <Slide className="w-full h-full" key={key}>
                <div
                  className="h-full slide-class-hello-test"
                  style={{ maxHeight: '505px' }}
                >
                  <div className="relative flex justify-center h-full py-12 bg-center bg-cover sm:py-24" >
                    <div  className="absolute top-0 left-0 w-full h-full bg-black">
                        <Img
                        objectFit="cover"
                        objectPosition="50% 50%"
                        style={{ height: "100%", opacity: "0.7" }}
                        fluid={imageArray[key].featuredImage.node.localFile.childImageSharp.fluid}
                        />
                    </div>
                    <div className="relative flex flex-col items-center justify-center w-9/12 p-6 mx-auto text-center bg-brandPurple sm:p-10 sm:w-1/3">
                      {slide.categories.edges.map((cat, key) => {
                        return (
                          <p key={key} className="pb-4 text-center text-white">
                            {cat.node.name}
                          </p>
                        );
                      })}
                      <Link to={`/${slide.slug}`}>
                        <h3 className={classnames("leading-snug text-white basic-sans bold", {"text-3xl sm:text-4xl" : titleCount <= 40, "text-3xl" : titleCount >= 41})}>
                          {slide.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                </div>
              </Slide>
            );
          })}
        </Slider>
      </CarouselProvider>
       }
    </div>
  );
};

export default SlideHero;
