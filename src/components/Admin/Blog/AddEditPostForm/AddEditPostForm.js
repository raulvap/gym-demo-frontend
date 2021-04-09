import React, { useState, useEffect } from "react";
import moment from "moment";

// --- API ---
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/post";

// --- COMPONENTS ---
import { Form, Input, Button, DatePicker, notification, Alert } from "antd";
import {
  FontSizeOutlined,
  LinkOutlined,
  UserOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

import "./AddEditPostForm.scss";
const { TextArea } = Input;

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = (e) => {
    e.preventDefault();
    const { title, url, description, date } = postData;

    if (!title || !url || !description || !date) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      if (!post) {
        addPost();
      } else {
        updatePost();
      }
    }
  };

  const addPost = () => {
    const token = getAccessTokenApi();

    addPostApi(token, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  const updatePost = () => {
    const token = getAccessTokenApi();
    updatePostApi(token, post._id, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  return (
    <>
      <Alert
        // message='Alerta'
        description='Se recomienda tener un respaldo de cada publicación'
        type='warning'
        showIcon
        closable
      />
      <div className='add-edit-post-form'>
        <AddEditForm
          postData={postData}
          setPostData={setPostData}
          post={post}
          processPost={processPost}
        />
      </div>
    </>
  );
}

function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;

  return (
    <Form className='add-edit-post-form' layout='inline' onSubmit={processPost}>
      <div className='add-edit-post-form__headers'>
        <Input
          title='Es el titulo de la Publicación'
          prefix={<FontSizeOutlined />}
          placeholder='Titulo'
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <Input
          title='Es el link donde se va a publicar'
          prefix={<LinkOutlined />}
          placeholder='URL de la Publicación'
          value={postData.url}
          onChange={(e) =>
            setPostData({
              ...postData,
              url: transformTextToUrl(e.target.value),
            })
          }
        />

        <DatePicker
          size='small'
          // style={{ width: "100%" }}
          format='DD/MM/YYYY HH:mm:ss'
          placeholder='Fecha de publicación'
          value={postData.date && moment(postData.date)}
          onChange={(e, value) =>
            setPostData({
              ...postData,
              date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
            })
          }
        />

        <Input
          prefix={<UserOutlined />}
          placeholder='Autor'
          value={postData.autor}
          onChange={(e) => setPostData({ ...postData, autor: e.target.value })}
        />
      </div>
      <div className='add-edit-post-form__headers2'>
        <Input
          prefix={<FileImageOutlined />}
          placeholder='URL Imagen de Portada'
          value={postData.image}
          onChange={(e) => setPostData({ ...postData, image: e.target.value })}
        />

        <TextArea
          className='text-area-form'
          showCount
          maxLength={100}
          prefix={<FontSizeOutlined />}
          placeholder='Breve Descripción de la Publicación'
          value={postData.resumen}
          onChange={(e) =>
            setPostData({ ...postData, resumen: e.target.value })
          }
        />
      </div>
      <h3 style={{ textAlign: "center", margin: "0px" }}>
        Contenido de la Publicación
      </h3>
      {!postData.title ? (
        <p
          style={{
            fontStyle: "italic",
            margin: "0",
            textAlign: "center",
            color: "#95A5A6",
          }}>
          (Si hay contenido, refresque la página para borrar)
        </p>
      ) : null}
      <div className='editor'>
        <Editor
          apiKey='8bx9j94x4u66amsz2t205odl588meic0fmhou4vu9rxkptz9'
          initialValue=''
          value={!postData.title ? " " : postData.description}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
          }}
          onBlur={(e) =>
            setPostData({ ...postData, description: e.target.getContent() })
          }
        />
      </div>

      <Button
        type='primary'
        htmlType='submit'
        className='btn-submit'
        onClick={processPost}>
        {post ? "Actualizar post" : "Crear post"}
      </Button>
    </Form>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}
