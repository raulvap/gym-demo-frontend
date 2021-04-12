import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import "moment/locale/es";
import { getPostApi } from "../../../../api/post";

import { Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   TelegramShareButton,
//   TelegramIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
// } from "react-share";
// import { appID } from "../../SocialLinks/FacebookApi";
// import { dataWeb } from "../../../../utils/dataVariables";

import AlternativeImage from "../../../../assets/img/jpg/web-cover-home.jpg";

import "./PostInfo.scss";

export default function PostInfo(props) {
   const { url } = props;
   const [postInfo, setPostInfo] = useState(null);

   // const heightImg = window.innerHeight * 0.4;

   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

   useEffect(() => {
      getPostApi(url)
         .then((response) => {
            if (response.code !== 200) {
               notification["warning"]({
                  message: response.message,
               });
            } else {
               setPostInfo(response.post);
            }
         })
         .catch(() => {
            notification["warning"]({
               message: "Error del servidor.",
            });
         });
   }, [url]);

   if (!postInfo) {
      return (
         <Spin
            indicator={antIcon}
            tip="Cargando Publicación..."
            className="blog-spin"
            style={{ width: "100%", padding: "200px 10px" }}
         />
      );
   }

   // Esto es el contenido del artículo:
   return (
      <>
         <Helmet>
            <title>{postInfo.title} | Desarrollo29</title>
         </Helmet>
         <div className="post-info">
            <div className="post-info__image">
               {!postInfo.image ? (
                  <img src={AlternativeImage} alt={postInfo.title} />
               ) : (
                  <img src={postInfo.image} alt={postInfo.title} />
               )}
            </div>
            <div className="post-info__content">
               <h1 className="post-info__title">{postInfo.title}</h1>
               <div className="post-info__creation-date">
                  {moment(postInfo.date).local("es").format("LL")}
               </div>
               <h2 className="post-info__autor">{postInfo.autor}</h2>
               <p style={{ textAlign: "center" }}>{postInfo.resumen}</p>
               {/* <div className='social__sharing'>
            <h4>Compartir en Facebook:</h4>
            <FacebookShareButton
              url={dataWeb + postInfo.url}
              appId={appID}
              quote={postInfo.resumen}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <TwitterShareButton title={postInfo.resumen}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <TelegramShareButton title={postInfo.resumen}>
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <WhatsappShareButton title={postInfo.resumen}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div> */}
               <p style={{ textAlign: "center" }}>---</p>

               <div
                  className="post-info__description"
                  dangerouslySetInnerHTML={{ __html: postInfo.description }}
               />
            </div>
         </div>
      </>
   );
}
