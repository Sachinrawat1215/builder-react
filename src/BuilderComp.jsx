import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
// Put your API key here as a string
const apiKey = "d2349af7b22141e39fed793158ada9ef";
builder.init(apiKey);
// Define a simple FourOhFour component
const FourOhFour = () => {
  return <div>404 - Page Not Found</div>;
};
// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function CatchAllRoute() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  // get the page content from Builder
  useEffect(() => {
    async function fetchContent() {
      try {
        console.log("Fetching content for:", window.location.pathname);
        const content = await builder
          .get("page", {
            url: window.location.pathname,
          })
          .promise();
        console.log("Fetched content:", content);
        setContent(content);
        setNotFound(!content);
        if (content?.data.title) {
          document.title = content.data.title;
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setNotFound(true);
      }
    }
    fetchContent();
  }, [window.location.pathname]);
  // If no page is found, return
  // a 404 page from your code.
  if (notFound && !isPreviewingInBuilder) {
    return <FourOhFour />;
  }
  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={content} />
    </>
  );
}