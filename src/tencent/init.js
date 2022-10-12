import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
  env: "tc-blogs-8g34zzk4b09f4346",
  region: "ap-guangzhou",
});

const auth = app.auth({
  persistence: "none", //用户显式退出或更改密码之前的30天一直有效
});

export { auth };
export default app;
