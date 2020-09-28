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
  }
      `;
}
export default getBlockDefinitions;
