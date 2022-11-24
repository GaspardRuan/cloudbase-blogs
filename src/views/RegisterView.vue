<template>
  <div class="register-view">
    <Modal
      v-if="modalActive"
      @close-modal="closeModal"
      :modal-message="modalMessage"
    />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="register">
        <p class="login-register">
          Already have an accound?
          <router-link class="router-link" :to="{ name: 'login' }"
            >Login</router-link
          >
        </p>
        <h2>Create Your FireBlog Account</h2>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <EmailIcon class="icon" />
          </div>
          <div class="input">
            <input type="text" placeholder="Password" v-model="password" />
            <PasswordIcon class="icon" />
          </div>
          <div v-show="error" class="error">{{ this.errorMsg }}</div>
        </div>
        <button @click.prevent="register">Sign Up</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import EmailIcon from "../assets/Icons/envelope-regular.svg";
import PasswordIcon from "../assets/Icons/lock-alt-solid.svg";
import Modal from "@/components/Modal.vue";
import Loading from "../components/Loading.vue";
import cloudbase from "../tencent/init";
export default {
  name: "RegisterPage",
  components: { EmailIcon, PasswordIcon, Modal, Loading },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },
  methods: {
    closeModal() {
      this.modalActive = false;
      this.email = "";
      this.$router.push({ name: "login" });
    },
    async register() {
      if (this.email !== "" && this.password !== "") {
        this.loading = true;
        cloudbase
          .auth()
          .signUpWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.error = false;
            this.errorMsg = "";
            this.modalMessage =
              "If your email address is valid, you will receive an email.";
            this.modalActive = true;
          })
          .catch((err) => {
            this.error = true;
            this.errorMsg = err.message;
          });
        this.loading = false;
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields.";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register-view {
  position: relative;
  .register {
    h2 {
      max-width: 350px;
    }
  }
}
</style>
