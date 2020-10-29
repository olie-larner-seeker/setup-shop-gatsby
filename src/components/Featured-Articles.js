import React, { useState, useEffect } from "react"
import { CarouselProvider, Slider, Slide } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import useWindowSize from "../utils/useWindowSize"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const FeaturedArticles = data => {
  const [articleImages, setArticleImages] = useState([])
  const { featuredArticles } = data.featuredArticles

  const screenWidth = useWindowSize()

  const numberOfSlide = () => {
    if (screenWidth.width <= 640) {
      return 1
    }
    return 3
  }

  const imageData = useStaticQuery(graphql`
    query featuredStoryQuery($parentId: IDQueryOperatorInput = {}) {
      allWpPage(
        filter: {
          parentId: $parentId
          blocks: { elemMatch: { name: { eq: "acf/featured-articles" } } }
        }
      ) {
        nodes {
          slug
          id
          blocks {
            ... on WpAcfFeaturedArticlesBlock {
              featuredArticles {
                featuredArticles {
                  ... on WpPost {
                    id
                    featuredImage {
                      node {
                        localFile {
                          publicURL
                          childImageSharp {
                            fluid(maxWidth: 2000) {
                              ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                    }
                    slug
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    imageData.allWpPage.nodes.map(item => {
      item.blocks.map(block => {
        if (block.__typename === "WpAcfFeaturedArticlesBlock") {
          setArticleImages(block.featuredArticles.featuredArticles)
        }
      })
    })
  })

  return (
    <div className="w-full py-16 bg-lightGray">
      <div className="max-w-screen-xl mx-auto">
      <div className="w-11/12 mx-auto sm:block">
        <div className="w-full mx-auto sm:w-11/12">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={featuredArticles.length}
            visibleSlides={numberOfSlide()}
          >
            <Slider className="overflow-hidden slider-height">
              {articleImages.map((article, key) => {
                return (
                  <Slide
                    key={key}
                  >
                    <div className="relative flex flex-col w-11/12 h-full p-12 overflow-hidden text-white">
                      <div className="absolute top-0 left-0 w-full h-full bg-black">
                        <Img
                          objectFit="cover"
                          objectPosition="50% 50%"
                          style={{ height: "100%", opacity: "0.7" }}
                          fluid={
                            article.featuredImage.node.localFile.childImageSharp.fluid
                          }
                        />
                      </div>
                      <p className="absolute top-0 z-10 pt-10 pb-1 text-base">Article</p>
                      <a
                        className="absolute bottom-0 z-10 inline-block w-7/12 pb-16 text-2xl font-bold leading-tight"
                        href={`/${article.slug}`}
                      >
                        {article.title}
                      </a>
                    </div>
                  </Slide>
                )
              })}
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    </div>
    </div>
  )
}

export default FeaturedArticles
