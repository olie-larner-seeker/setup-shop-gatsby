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
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={featuredArticles.length}
      visibleSlides={numberOfSlide()}
    >
      <Slider className="overflow-hidden slider-height">
        {articleImages.map((article, key) => {
          console.log(
            article.featuredImage.node.localFile.childImageSharp.fluid
          )
          return (
            <Slide
              key={key}
              className="relative w-full text-white bg-center bg-cover sm:w-1/3 h-halfscreen"
              innerClassName="p-12"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25">
                <Img
                  objectFit="cover"
                  objectPosition="50% 50%"
                  style={{ height: "100%" }}
                  fluid={
                    article.featuredImage.node.localFile.childImageSharp.fluid
                  }
                />
              </div>

              <p className="relative z-10 pb-1 text-lg">Article</p>
              <a
                className="relative z-10 inline-block w-7/12 text-xl font-bold leading-tight"
                href={`/${article.slug}`}
              >
                {article.title}
              </a>
            </Slide>
          )
        })}
      </Slider>
    </CarouselProvider>
  )
}

export default FeaturedArticles
