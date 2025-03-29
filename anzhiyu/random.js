var posts=["2025/03/23/开源免费，提速500-！这款下载神器让IDM用户直呼真香/","2025/03/23/高颜值-纯净体验的第三方K狗音乐/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };