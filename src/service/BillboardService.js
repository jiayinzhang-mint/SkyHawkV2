import basicService from "./BasicService";
import message from "../utils/Message";

class billboardService {
  static async getPostList() {
    const rsp = await basicService.getRequest("/notification/articlelist");
    return rsp;
  }
  static async getPostInfo(postId) {
    const rsp = await basicService.getRequest("/notification/articledetail", {
      id: postId
    });
    return rsp;
  }
  static async createPost(newPost) {
    const rsp = await basicService.postRequest(
      "/notification/articledetail",
      newPost
    );
    return rsp;
  }
  static async deletePost() {}
}

export default billboardService;
