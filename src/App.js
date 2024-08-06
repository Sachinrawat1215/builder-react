import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";

// Put your API key here
builder.init("80052318ebce437386e217938e41a56f");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found

const FourOhFour = () => {
  return <div>404 - Page Not Found</div>;
};

export default function CatchAllRoute() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  // get the page content from Builder
  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("contact", {
          url: window.location.pathname
        })
        .promise();
console.log(content);
      setContent(content);
      setNotFound(!content);

      // if the page title is found, 
      // set the document title
      if (content?.data.title) {
      document.title = content.data.title
      }
    }
    fetchContent();
    // eslint-disable-next-line
  }, [window.location.pathname]);
  
  // If no page is found, return 
  // a 404 page from your code.
  // The following hypothetical 
  // <FourOhFour> is placeholder.
  if (notFound && !isPreviewingInBuilder) {
    return <FourOhFour/>
  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <h1>Okay Bro</h1>
      <BuilderComponent model="contact" content={content} />
    </>
  );
}