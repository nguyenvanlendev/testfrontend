import React from "react";

 export const PublicRouter :React.FC<IPublicRouter> = ({
  header: Header, layout: Layout, component: Component
}) => {
    
  return (
   <Layout
    header = {<Header />}
    // footer = {<Footer />}
    // sidebar = {<Sidebar />}
   >
     <Component />
   </Layout>
  );
};


