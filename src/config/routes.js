// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminBlog from "../pages/Admin/Blog";
import AdminMessages from "../pages/Admin/Messages";
import AdminHorarios from "../pages/Admin/Horarios";
import AdminServicios from "../pages/Admin/Servicios";
import AdminComunidades from "../pages/Admin/Comunidad";
import AdminCalendario from "../pages/Admin/Calendario";
import AdminAvisos from "../pages/Admin/Aviso";
import AdminInfoParroquia from "../pages/Admin/InfoParroquia";

// Web Pages
import Home from "../pages/Home";
import Contact from "../pages/Contacto";
import Blog from "../pages/Blog";
import AvisoPrivacidad from "../pages/AvisoPrivacidad";
import Servicios from "../pages/Servicios";
import Comunidad from "../pages/Comunidad";
import Calendario from "../pages/Calendario";
import ResetPassword from "../pages/ResetPassword";
import ReportarError from "../pages/ReportarError";

// Other
import Error404 from "../pages/Error404";

const routes = [
   {
      path: "/admin",
      component: LayoutAdmin,
      exact: false,
      routes: [
         {
            path: "/admin",
            component: AdminHome,
            exact: true,
         },
         {
            path: "/admin/login",
            component: AdminSingIn,
            exact: true,
         },
         {
            path: "/admin/usuarios",
            component: AdminUsers,
            exact: true,
         },
         {
            path: "/admin/blog",
            component: AdminBlog,
            exact: true,
         },
         {
            path: "/admin/mensajes",
            component: AdminMessages,
            exact: true,
         },
         {
            path: "/admin/horarios",
            component: AdminHorarios,
            exact: true,
         },
         {
            // ahora es instalaciones
            path: "/admin/servicios",
            component: AdminServicios,
            exact: true,
         },
         // {
         //    //ahora es servicios
         //    path: "/admin/comunidades",
         //    component: AdminComunidades,
         //    exact: true,
         // },

         {
            //eventos-clases
            path: "/admin/calendario",
            component: AdminCalendario,
            exact: true,
         },
         {
            path: "/admin/avisos",
            component: AdminAvisos,
            exact: true,
         },
         {
            path: "/admin/info",
            component: AdminInfoParroquia,
            exact: true,
         },
         {
            component: Error404,
         },
      ],
   },
   {
      path: "/",
      component: LayoutBasic,
      exact: false,
      routes: [
         {
            path: "/",
            component: Home,
            exact: true,
         },
         {
            path: "/contacto",
            component: Contact,
            exact: true,
         },

         {
            path: "/blog",
            component: Blog,
            exact: true,
         },
         {
            path: "/blog/:url",
            component: Blog,
            exact: true,
         },
         {
            //servicios ahora es instalaciones
            path: "/instalaciones",
            component: Servicios,
            exact: true,
         },

         {
            //eventos
            path: "/calendario",
            component: Calendario,
            exact: true,
         },

         {
            path: "/aviso-privacidad",
            component: AvisoPrivacidad,
            exact: true,
         },

         {
            path: "/authentication/:token",
            component: ResetPassword,
            exact: true,
         },
         {
            path: "/reportar-error",
            component: ReportarError,
            exact: true,
         },
         {
            component: Error404,
         },
      ],
   },
];

export default routes;
