// File: public/_worker.js

export default {
  async fetch(request, env, ctx) {
    // Lấy trang web gốc từ Cloudflare
    const response = await env.ASSETS.fetch(request);

    // Tạo một bản sao của các header để có thể chỉnh sửa
    const newHeaders = new Headers(response.headers);

    // Thêm quy tắc bảo mật cho phép Google Sign-In hoạt động
    newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

    // Thêm các quy tắc CORS như một biện pháp dự phòng
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Trả về trang web với các quy tắc bảo mật mới đã được thêm vào
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};