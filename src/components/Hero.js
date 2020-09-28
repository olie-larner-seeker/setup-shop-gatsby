import React from "react"
import Img from "gatsby-image"

import Cta from "./Cta"
import CtaHelper from "../utils/ctaHelper"

const Hero = data => {
  const { headline, logo, image, subheading, cta } = data.hero

  const renderCta = cta => {
    const ctastyle = CtaHelper({
      style: cta.ctaStyle,
    })

    return (
      <Cta
        ctastyle={ctastyle}
        ctaCopy={cta.ctaCopy}
        ctaLink={cta.ctaLink}
        extraStyle="mx-3"
      />
    )
  }

  return (
    <div
      className="relative flex w-full min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image.sourceUrl})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25"></div>
      <div className="container z-10 flex flex-col justify-center mx-auto">
        <div className="w-full max-w-screen-md pt-32 mx-auto text-center text-white sm:pt-48 ">
          <h1
            dangerouslySetInnerHTML={{ __html: headline }}
            className="mb-3 leading-tight hero-headline"
          />
          <p className="w-11/12 mx-auto text-xl hero-subheading">
            {subheading}
          </p>
          <div className="flex flex-col justify-center pt-8 sm:flex-row">
            {cta.map((item, key) => {
              return (
                <div className="inline-block mb-4 sm:mb-0" key={key}>
                  {renderCta(item, key)}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-row justify-end pt-16 pb-6">
          <img src={logo.sourceUrl} alt={logo.altText} />
        </div>
      </div>
    </div>
  )
}

export default Hero