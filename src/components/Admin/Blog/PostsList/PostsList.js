import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostApi } from "../../../../api/post";

// --- COMPONENTS ---
import { List, Button, Modal, notification } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./PostsList.scss";

const { confirm } = Modal;

export default function PostsList(props) {
  const { posts, setReloadPosts, editPost } = props;

  const deletePost = (post) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando post",
      content: `¿Estas seguro de eliminar el post ${post.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostApi(accessToken, post._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadPosts(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
            });
          });
      },
    });
  };

  return (
    <div className='posts-list'>
      <List
        dataSource={posts.docs}
        renderItem={(post) => (
          <Post post={post} deletePost={deletePost} editPost={editPost} />
        )}
      />
    </div>
  );
}

function Post(props) {
  const { post, deletePost, editPost } = props;

  const day = moment(post.date).format("DD");
  const month = moment(post.date).format("MMMM");
  const year = moment(post.date).format("YY");

  return (
    <List.Item
      actions={[
        <Link
          title='Ver Post'
          to={`/blog/${post.url}`}
          target='_blank'
          rel='noopener noreferrer'>
          <Button type='primary'>
            <EyeOutlined />
          </Button>
        </Link>,
        <Button type='primary' onClick={() => editPost(post)}>
          <EditOutlined />
        </Button>,
        <Button type='danger' onClick={() => deletePost(post)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <div className='admin-blog-post'>
        <div className='admin-blog-post__image'>
          {!post.image ? (
            <h4>(Sin imagen)</h4>
          ) : (
            <img src={post.image} alt={post.title} />
          )}
        </div>
        <div className='admin-blog-post__content'>
          <h2>{post.title}</h2>
          <h4>
            {day}
            {" | "}
            {month}
            {" | "}
            {year}{" "}
          </h4>
          <p>Autor: {post.autor}</p>
          <p>{post.resumen}</p>
        </div>
      </div>
    </List.Item>
  );
}
