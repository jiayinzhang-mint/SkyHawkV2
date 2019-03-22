import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class billboardService {
  static async getPostList() {
    const rsp = await basicService.getRequest("/notification/articlelist");
    store.commit("billboard/getPostList", rsp.articleList);
    return rsp;
  }
  static async getPostInfo(postId) {
    const rsp = await basicService.getRequest("/notification/articledetail", {
      id: postId
    });
    return rsp;
  }
  static async updatePostInfo(postDetail) {
    const rsp = await basicService.putRequest(
      "/notification/articledetail",
      postDetail
    );
    this.getPostList();
    return rsp;
  }
  static async createPost(newPost) {
    const rsp = await basicService.postRequest(
      "/notification/articledetail",
      newPost
    );
    this.getPostList();
    return rsp;
  }
  static async deletePost(postId) {
    const rsp = await basicService.deleteRequest(
      "/notification/articledetail",
      {
        id: postId
      }
    );
    await this.getPostList();
    return rsp;
  }
}

export default billboardService;
