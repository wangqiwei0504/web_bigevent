$(function () {
  getUserInfo();
  const layer = layui.layer;
  $("#btnLogOut").click(function () {
    layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "" },
      function (index) {
        // 清空本地存储里面的 token
        localStorage.removeItem("token");
        // 重新跳转到登录页面
        location.href = "/login.html";
      }
    );
  });
});
const layer = layui.layer;

//获取用户信息 不能写到入口函数里 要使他挂载到window上
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    //在请求头中注入 token,
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      // console.log(res);
      if (res.status !== 0) return layer.msg("获取用户信息失败");
      layer.msg("获取用户信息成功");
      //调用渲染头像函数
      renderAvatar(res.data);
    },
    // complete: (res) => {
    //   // console.log(res);
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
    //     //  强制清空 token
    //     localStorage.removeItem("token");
    //     // 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  });
}

//渲染头像函数
const renderAvatar = (user) => {
  //获取名字
  const name = user.nickname || user.username;
  $("#welcome").html(`欢迎${name}`);
  if (user.user_pic !== null) {
    $(".layui-nav-img").prop("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    const firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName).show();
  }
};

function change() {
  $('#art_list').addClass('layui-this').next().removeClass('layui-this');
}
