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
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/blogs",
    name: "blogs",
    component: BlogsView,
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/password",
    name: "password",
    component: PasswordView,
    meta: {
      title: "Forget Password",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/write",
    name: "write",
    component: CreatePost,
    meta: {
      title: "Write",
    },
  },
  {
    path: "/preview",
    name: "preview",
    component: BlogPreview,
    meta: {
      title: "Blog Preview",
    },
  },
  {
    path: "/blog-detail/:blogid",
    name: "blog",
    component: ViewBlog,
    meta: {
      title: "View Blog",
    },
  },
  {
    path: "/edit/:blogid",
    name: "edit",
    component: EditBlog,
    meta: {
      title: "Edit Blog Post",
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

export default router;
