import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogsView from "../views/BlogsView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import PasswordView from "../views/ForgetPassword.vue";
import ProfileView from "../views/ProfileView.vue";
import AdminView from "../views/AdminView.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import "firebase/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
      requireAuth: false,
    },
  },
  {
    path: "/blogs",
    name: "blogs",
    component: BlogsView,
    meta: {
      title: "Blogs",
      requireAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
      requireAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      title: "Register",
      requireAuth: false,
    },
  },
  {
    path: "/password",
    name: "password",
    component: PasswordView,
    meta: {
      title: "Forget Password",
      requireAuth: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      title: "Profile",
      requireAuth: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: {
      title: "Admin",
      requireAuth: true,
      requireAdmin: true,
    },
  },
  {
    path: "/write",
    name: "write",
    component: CreatePost,
    meta: {
      title: "Write",
      requireAuth: true,
      requireAdmin: true,
    },
  },
  {
    path: "/preview",
    name: "preview",
    component: BlogPreview,
    meta: {
      title: "Blog Preview",
      requireAuth: true,
      requireAdmin: true,
    },
  },
  {
    path: "/blog-detail/:blogid",
    name: "blog",
    component: ViewBlog,
    meta: {
      title: "View Blog",
      requireAuth: false,
    },
  },
  {
    path: "/edit/:blogid",
    name: "edit",
    component: EditBlog,
    meta: {
      title: "Edit Blog Post",
      requireAuth: true,
      requireAdmin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});

// router.beforeEach(async (to, from, next) => {
//   let user = firebase.auth().currentUser;
//   let admin = null;
//   if (user) {
//     let token = await user.getIdTokenResult();
//     admin = token.claims.admin;
//   }
//   if (to.matched.some((res) => res.meta.requiresAuth)) {
//     if (user) {
//       if (to.matched.some((res) => res.meta.requiresAdmin)) {
//         if (admin) {
//           return next();
//         }
//         return next({ name: "home" });
//       }
//       return next();
//     }
//     return next({ name: "home" });
//   }
//   return next();
// });

export default router;
