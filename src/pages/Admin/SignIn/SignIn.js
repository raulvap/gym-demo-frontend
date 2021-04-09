import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Redirect, Link } from "react-router-dom";

// --- API ---
import { getAccessTokenApi } from "../../../api/auth";

// --- COMPONENTS ---
import LoginForm from "../../../components/Admin/LoginForm";
import Copyright from "../../../components/Web/Footer/Copyright";
import Logo from "../../../assets/img/svg/logo-color.svg";
import Cover from "../../../assets/img/jpg/web-cover-home.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../../components/Modal";
// import RegisterForm from "../../../components/Admin/RegisterForm";

import "./SignIn.scss";

const useStyles = makeStyles({
   image: {
      backgroundImage: `url(${Cover})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",

      border: 0,

      color: "white",
      height: "100%",
   },
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//   },
//   image: {
//     backgroundImage: `url(${Cover})`,
//     backgroundRepeat: "no-repeat",
//     backgroundColor:
//       theme.palette.type === "light"
//         ? theme.palette.grey[50]
//         : theme.palette.grey[900],
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
// }));

export default function SignIn() {
   // ---Modal ---
   const [isVisibleModal, setIsVisibleModal] = useState(false);
   const [modalContent, setModalContent] = useState(null);
   const classes = useStyles();

   if (getAccessTokenApi()) {
      return <Redirect to="/admin" />;
   }
   return (
      <>
         <Helmet>
            <title>Admin | Iniciar Sesión</title>
            <meta
               name="admin-signin"
               content="Eclesia Admin | Iniciar Sesión"
               data-react-helmet="true"
            />
         </Helmet>
         <div className="sign-in">
            <div className="sign-in__image">
               <div className={classes.image}></div>
            </div>
            <div className="sign-in__form">
               <Link to="/">
                  <img src={Logo} alt="logo eclesia" />
               </Link>
               <h2>Iniciar Sesión Admin</h2>

               <LoginForm setIsVisibleModal={setIsVisibleModal} setModalContent={setModalContent} />
            </div>
         </div>
         <div className="sign-in-footer">
            <Copyright />
         </div>

         <Modal
            title="Recuperar Contraseña"
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
         >
            {modalContent}
         </Modal>
      </>
   );
}

/* <Layout className='sign-in'>
  <Content className='sign-in__content'>
    <div className='sign-in__content-logo'>
      <Link to='/'>
        <img src={Logo} alt='Eclesia Demo Logo' />
      </Link>
    </div>

    <div className='sign-in__content-tabs'>
      <h2>Iniciar Sesión Admin</h2>
      <LoginForm />
      {/* <Tabs type='card'>
              <TabPane tab={<span>Entrar</span>} key='1'>
                <LoginForm />
              </TabPane>
              <TabPane tab={<span>Nuevo usuario</span>} key='2'>
                <RegisterForm />
              </TabPane>
            </Tabs> ******************************* aqui cierra antes
    </div>
  </Content>
  <Footer className='sign-in__footer'>
    <Copyright />
  </Footer>
</Layout>; */
