import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, notification } from "antd";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import PostsList from "../../../components/Admin/Blog/PostsList";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";
import { getPostsApi } from "../../../api/post";
import { PlusOutlined } from "@ant-design/icons";

import "./Blog.scss";

function Blog(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getPostsApi(10, page)
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
          message: "Error del servidor.",
        });
      });
    setReloadPosts(false);
  }, [page, reloadPosts]);

  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Nueva Publicación");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
      />
    );
  };

  const editPost = (post) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Publicación");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={post}
      />
    );
  };

  if (!posts) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin | Blog</title>
        <meta
          name='admin-blog'
          content='Admin | Blog'
          data-react-helmet='true'
        />
      </Helmet>
      <div className='blog'>
        <div className='blog__add-post'>
          <h4>Publicaciones de la Parroquia</h4>
          <div className='admin-blog-button'>
            <Link to='/blog'>
              <Button type='primary'>Ver Publicaciones</Button>
            </Link>
            <Button type='primary' onClick={addPost}>
              <PlusOutlined />
              Crear Publicación
            </Button>
          </div>
        </div>
        <div className='blog__admin-posts'>
          <PostsList
            posts={posts}
            setReloadPosts={setReloadPosts}
            editPost={editPost}
          />
          <Pagination posts={posts} location={location} history={history} />
        </div>
        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          width='70%'>
          {modalContent}
        </Modal>
      </div>
    </>
  );
}

export default withRouter(Blog);
