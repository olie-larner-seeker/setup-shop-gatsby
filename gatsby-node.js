const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPageTemplate = path.resolve(`src/pages/Page.js`)
  const blogPostTemplate = path.resolve(`src/pages/Post.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query GET_PAGES {
        allWpPage {
          edges {
            node {
              slug
              title
            }
          }
        }
        allWpPost {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allWpPage.edges.forEach(edge => {
      createPage({
        // Path for this page — required
        path: `/${edge.node.slug}`,
        component: blogPageTemplate,
        context: {
          slug: edge.node.slug,
          title: edge.node.title,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    }),
      // Create blog post pages.
      result.data.allWpPost.edges.forEach(edge => {
        createPage({
          // Path for this page — required
          path: `/${edge.node.slug}`,
          component: blogPostTemplate,
          context: {
            slug: edge.node.slug,
            title: edge.node.title,
            // Add optional context data to be inserted
            // as props into the page component..
            //
            // The context data can also be used as
            // arguments to the page GraphQL query.
            //
            // The page "path" is always available as a GraphQL
            // argument.
          },
        })
      })
  })
}

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   const blogPostTemplate = path.resolve(`src/pages/Post.js`)
//   // Query for markdown nodes to use in creating pages.
//   // You can query for whatever data you want to create pages for e.g.
//   // products, portfolio items, landing pages, etc.
//   // Variables can be added as the second function parameter
//   return graphql(
//     `
//       query GET_POSTS {
//         allWpPost {
//           edges {
//             node {
//               slug
//               title
//             }
//           }
//         }
//       }
//     `
//   ).then(result => {
//     if (result.errors) {
//       throw result.errors
//     }

//     // Create blog post pages.
//     result.data.allWpPost.edges.forEach(edge => {
//       createPage({
//         // Path for this page — required
//         path: `/${edge.node.slug}`,
//         component: blogPostTemplate,
//         context: {
//           slug: edge.node.slug,
//           title: edge.node.title,
//           // Add optional context data to be inserted
//           // as props into the page component..
//           //
//           // The context data can also be used as
//           // arguments to the page GraphQL query.
//           //
//           // The page "path" is always available as a GraphQL
//           // argument.
//         },
//       })
//     })
//   })
// }
