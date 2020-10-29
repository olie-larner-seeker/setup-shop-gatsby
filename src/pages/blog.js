import React from 'react'
import moment from "moment"
import { gql, useQuery } from '@apollo/client'

const GET_POSTS = gql`
query getPosts {
  posts {
    edges {
      node {
        id
        title(format: RENDERED)
        slug
        date
        featuredImage {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
        excerpt(format: RENDERED)
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
`;


export default () => {

    const { loading, error, data } = useQuery(GET_POSTS);
    if (loading) {
        return (
          <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen bg-white">
            <h1>Loading...</h1>
          </div>
        );
      }
      if (error) return `Error! ${data}`;

    return (
        <div className="grid w-10/12 grid-cols-3 gap-6 mx-auto">
            {data.posts.edges.map((post, i) => {
                let catagory;
                if(post !== undefined){
                {post.node.categories.edges.map((cat) => { 
                    console.log(cat.node.name);
                    catagory = cat.node.name; 
                    return null
                })}
                }
                return (
                    <div key={i}>
                        <div style={{backgroundImage: `url(${post.node.featuredImage.node.sourceUrl})`, height: "319px"}} className="w-full" />
                        <p>{catagory}</p>
                        <h2>{post.node.title}</h2>
                        <p>{moment(post.node.date).format("MMM Do, YYYY")}</p>
                        
                    </div>
                )
            })}
        </div>
    )

}