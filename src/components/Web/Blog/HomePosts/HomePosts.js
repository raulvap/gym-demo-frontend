import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import queryString from "query-string";
import ScrollAnimation from "react-animate-on-scroll";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { getPostsApi } from "../../../../api/post";

// --- COMPONENTS ---
import { Spin, List, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AlternativeImage from "../../../../assets/img/jpg/web-cover-home.jpg";

import "./HomePosts.scss";

export default function HomePosts(props) {
   const { location } = props;

   const { page = 1 } = queryString.parse(location.search);
   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

   const [posts, setPosts] = useState(null);

   var widthScreen = window.innerWidth;

   let windowType = "";

   useEffect(() => {
      getPostsApi(5, page)
         .then((response) => {
            if (response?.code !== 200) {
               notification["warning"]({
                  message: response.message,
               });
            } else {
               setPosts(response.posts);
            }
         })
         .catch(() => {
            notification["error"]({
               message: "Error del servidor. No se pueden cargar las publicaciones",
            });
         });
   }, [page]);

   if (widthScreen <= 780) {
      windowType = "small";
   } else {
      windowType = "large";
   }

   if (!posts) {
      return (
         <Spin
            indicator={antIcon}
            tip="Cargando Publicaciones..."
            className="blog-spin"
            style={{ width: "100%", padding: "200px 10px" }}
         />
      );
   }

   return (
      <div className="home-posts">
         <List
            dataSource={posts.docs}
            renderItem={(post) => <Post post={post} windowType={windowType} />}
         />
         <div className="home-posts__link">
            <Link to="/blog">Ver más Publicaciones</Link>
         </div>
      </div>
   );
}

function Post(props) {
   const { post, windowType } = props;
   const day = moment(post.date).format("DD");
   const month = moment(post.date).format("MMMM");
   const year = moment(post.date).format("YY");

   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} offset={100}>
         <List.Item>
            <Link to={`blog/${post.url}`}>
               <div className="home-post-item">
                  <div className="home-post-item__image">
                     {!post.image ? (
                        <img src={AlternativeImage} alt={post.title} />
                     ) : (
                        <img src={post.image} alt={post.title} />
                     )}
                  </div>

                  <div className="home-post-item__content">
                     <h4>{post.title}</h4>
                     <p>
                        {day}
                        {" | "}
                        {month}
                        {" | "}
                        {year}{" "}
                     </p>
                     {windowType === "large" ? <h3>{post.resumen}</h3> : null}
                     {/* <p>Autor: {post.autor}</p> */}
                  </div>
               </div>
               {windowType === "small" ? <h3>{post.resumen}</h3> : null}
            </Link>
         </List.Item>
      </ScrollAnimation>
   );
}
