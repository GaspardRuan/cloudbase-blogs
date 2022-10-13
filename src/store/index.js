import Vue from "vue";
import Vuex from "vuex";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";
import cloudbase from "../tencent/init";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: "",
    blogPhotoPreview: null,

    editPost: null,

    user: null,
    profileEmail: null,
    profileFullName: null,
    profileUserName: null,
    profileId: null,
    profileAvatar: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 3);
    },
  },
  mutations: {
    init(state) {
      state.blogTitle = "";
      state.blogHTML = "Write your blog title here...";
      state.blogPhotoFileURL = "";
      state.blogPhotoName = "";
    },
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
      // console.log(state.editPost);
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogId !== payload
      );
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, user) {
      state.profileId = user.uid;
      state.profileEmail = user.email;
      state.profileFullName = user.nickName;
      state.profileUserName = user.username;
      state.profileAvatar = user.avatarUrl;
    },
    changeFullName(state, payload) {
      state.profileFullName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      cloudbase
        .auth()
        .getCurrenUser()
        .then((user) => {
          commit("setProfileInfo", user);
        });

      // console.log("store:");
      // console.log(dbResults);
      // console.log(dbResults.data().email);
    },

    async getPost({ state }) {
      const dataBase = await cloudbase
        .database()
        .collection("blogPosts")
        .orderBy("date", "desc")
        .get();
      const dbResults = await dataBase.data;
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogId === doc._id)) {
          const blog = {
            blogId: doc._id,
            blogHTML: doc.blogHTML,
            blogCoverPhoto: doc.blogCoverPhoto,
            blogCoverPhotoName: doc.blogCoverPhotoName,
            blogTitle: doc.blogTitle,
            // profileId: doc.profileId,
            blogDate: doc.date,
          };
          state.blogPosts.push(blog);
        }
      });
      state.postLoaded = true;
      // console.log(state.blogPosts);
    },

    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },

    async deletePost({ commit }, payload) {
      commit("filterBlogPost", payload);
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
    },

    async updateUserSettings({ state }) {
      const user = cloudbase.auth().currentUser;
      await user
        .update({
          nickName: state.profileFullName,
        })
        .then(() => {
          console.log("fullname done");
        });
      await user.updateUsername(state.profileUserName).then(() => {
        console.log("username done");
      });
    },
  },
  modules: {},
});
