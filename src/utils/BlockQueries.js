function getBlockDefinitions() {
  return `
  blocks {
    ... on AcfHeroBlock {
      originalContent
      hero {
        cta {
          ctaCopy
          ctaLink
          ctaStyle
        }
        headline
        image {
          altText
          sourceUrl(size: LARGE)
        }
        logo {
          altText
          sourceUrl(size: LARGE)
        }
        subheading
      }
    }
    ... on AcfFeaturesBlock {
      dynamicContent
      originalContent
      features {
        feature {
          blurb
          ctaCopy
          ctaLink
          title
        }
        intro
      }
    }
    ... on AcfCaseStudyBannerBlock {
      caseStudyBanner {
        caseStudy {
          ... on Post {
            id
            featuredImage {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
            title(format: RENDERED)
            slug
          }
          ... on Page {
            id
            featuredImage {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
            title(format: RENDERED)
            slug
          }
        }
      }
    }
    ... on AcfFeaturedArticlesBlock {
      featuredArticles {
        featuredArticles {
          ... on Post {
            id
            slug
            title(format: RENDERED)
            featuredImage {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
          }
          ... on Page {
            id
            slug
            title(format: RENDERED)
            featuredImage {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
          }
        }
      }
    }

    ... on AcfSlideHeroBlock {
      slideHero {
        slides {
          ... on Post {
            id
            slug
            title(format: RENDERED)
            categories {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }

    ... on AcfGetToKnowBlock {
      getToKnow {
        gtkTitle
        gtkFeature {
          gtkBackgroundColour
          gtkCopy
          gtkHeading
        }
      }
    }

    ... on AcfRelatedPostsBlock {
      relatedPosts {
        relatedPosts {
          ... on Post {
            id
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            title(format: RENDERED)
            slug
          }
        }
      }
    }

    ... on CoreImageBlock {
      attributes {
        ... on CoreImageBlockAttributes {
          alt
          align
          width
          url
        }
      }
    }
    ... on CoreParagraphBlock {
      originalContent
      attributes {
        ... on CoreParagraphBlockAttributes {
          align
        }
      }
    }
    ... on CoreHeadingBlock {
      originalContent
      attributes {
        ... on CoreHeadingBlockAttributes {
          align
        }
      }
    }

  }
      `;
}
export default getBlockDefinitions;
