import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { NavLink as Link } from "react-router-dom";
import { Spin, List, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
import { getPostsApi } from "../../../../api/post";
import "moment/locale/es";

import AlternativeImage from "../../../../assets/img/jpg/web-cover-home.jpg";

import "./PostsListWeb.scss";

export default function PostsListWeb(props) {
   const { location, history } = props;

   const { page = 1 } = queryString.parse(location.search);
   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

   const [posts, setPosts] = useState(null);

   useEffect(() => {
      getPostsApi(8, page)
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
      <>
         <div className="blog-list-web">
            <List dataSource={posts.docs} renderItem={(post) => <Post post={post} />} />
            {location.pathname === "/blog" ? (
               <Pagination posts={posts} location={location} history={history} />
            ) : (
               <Link to="/blog">Ver más Publicaciones</Link>
            )}
         </div>
      </>
   );
}

function Post(props) {
   const { post } = props;
   const day = moment(post.date).format("DD");
   const month = moment(post.date).format("MMMM");
   const year = moment(post.date).format("YY");

   return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} offset={50}>
         <List.Item className="blog-post">
            <Link to={`blog/${post.url}`}>
               <div className="blog-post__image">
                  {!post.image ? (
                     <img src={AlternativeImage} alt={post.title} />
                  ) : (
                     <img src={post.image} alt={post.title} />
                  )}
               </div>

               <div className="blog-content">
                  <List.Item.Meta title={post.title} />

                  <p>
                     {day}
                     {" | "}
                     {month}
                     {" | "}
                     {year}{" "}
                  </p>
                  <p>Autor: {post.autor}</p>
                  <h3>{post.resumen}</h3>
               </div>
            </Link>
         </List.Item>
      </ScrollAnimation>
   );
}
