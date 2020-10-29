import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import Cta from "./Cta"
import CtaHelper from "../utils/ctaHelper"

const Hero = data => {
  const { headline, subheading, cta } = data.hero

  const renderCta = cta => {
    const ctastyle = CtaHelper({
      style: cta.ctaStyle,
    })

    return (
      <Cta
        ctastyle={ctastyle}
        ctaCopy={cta.ctaCopy}
        ctaLink={cta.ctaLink}
        extraStyle="mx-3 sm:mx-0"
      />
    )
  }

  const imageData = useStaticQuery(graphql`
    query MyQuery($parentId: IDQueryOperatorInput = {}) {
      allWpPage(
        filter: {
          parentId: $parentId
          blocks: { elemMatch: { name: { eq: "acf/hero" } } }
        }
      ) {
        nodes {
          blocks {
            ... on WpAcfHeroBlock {
              hero {
                image {
                  sourceUrl
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
            }
          }
        }
      }
    }
  `)

  let heroSrc

  const heroImage = () => {
    imageData.allWpPage.nodes.map(list => {
      list.blocks.map(item => {
        if (item.__typename === "WpAcfHeroBlock") {
          heroSrc = item.hero.image.localFile.childImageSharp.fluid
          return ""
        }
        return null
      })
    })
  }

  heroImage()

  return (
    <div className="relative flex w-full min-h-screen overflow-hidden bg-center bg-cover">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25">
        <Img
          objectFit="cover"
          objectPosition="50% 50%"
          style={{ height: "100%" }}
          fluid={heroSrc}
        />
      </div>
      <div className="z-10 flex flex-col justify-center w-full mx-auto">
        <div className="w-1/2 px-10 mr-auto text-left ">
          <h1
            dangerouslySetInnerHTML={{ __html: headline }}
            className="mb-3 text-4xl leading-tight hero-headline"
          />
          <p className="w-11/12 text-lg hero-subheading">
            {subheading}
          </p>
          <div className="flex flex-col justify-start pt-8 sm:flex-row">
            {cta.map((item, key) => {
              return (
                <div className="inline-block mb-4 sm:mb-0" key={key}>
                  {renderCta(item, key)}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
