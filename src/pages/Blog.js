import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ScrollAnimation from "react-animate-on-scroll";

import { useParams } from "react-router-dom";
import PostsListWeb from "../components/Web/Blog/PostsListWeb";
import PostInfo from "../components/Web/Blog/PostInfo";
import LinksInteres from "../components/Web/Blog/LinksInteres";
import RedesSocialesBlog from "../components/Web/Blog/RedesSocialesBlog";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { dataParroquia } from "../utils/dataVariables";

import "./_blog.scss";

export default function Blog(props) {
   const { location, history } = props;
   const { url } = useParams();

   return (
      <>
         <Helmet>
            <title>Blog | {dataParroquia}</title>
            <meta
               name="blog"
               content="Blog | Publicaciones de la Parroquia"
               data-react-helmet="true"
            />
         </Helmet>

         {location.pathname === "/blog" ? (
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
               <h1 style={{ textAlign: "center", marginTop: "30px" }}>Blog</h1>
               <h2 style={{ textAlign: "center" }}>Blog | Publicaciones</h2>
               <h4 style={{ textAlign: "center" }}>de {dataParroquia}</h4>
            </ScrollAnimation>
         ) : (
            <Link className="button-blog" onClick={() => window.history.back()}>
               <ArrowLeftOutlined />
               Regresar
            </Link>
         )}

         <div className="page-blog">
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
               <div className="page-blog__izq">
                  {url ? (
                     <div className="page-blog__izq-post">
                        <PostInfo url={url} />
                     </div>
                  ) : (
                     <div className="page-blog__izq-list">
                        <PostsListWeb location={location} history={history} />
                     </div>
                  )}
                  {location.pathname === "/blog" ? <div /> : null}
               </div>
            </ScrollAnimation>

            {location.pathname === "/blog" ? (
               <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                  <div className="page-blog__der">
                     <h2>Ligas de Interés</h2>
                     {/* <LinksInteres /> */}
                  </div>
               </ScrollAnimation>
            ) : null}
         </div>

         {location.pathname === "/blog" ? (
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
               <div className="blog-footer">
                  <RedesSocialesBlog />
               </div>
            </ScrollAnimation>
         ) : (
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
               <div className="blog-footer">{/* <h3>Otras Publicaciones</h3> */}</div>
            </ScrollAnimation>
         )}
      </>
   );
}
