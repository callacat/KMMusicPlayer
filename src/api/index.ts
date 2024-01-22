import {
  Reslyric,
  code,
  ResultData,
  ResVideoSearch,
  checkQR,
  ResRecommendResource,
  ResPlaylistDetail,
  ResSearch,
} from "./interface";
// 搜索参数的接口
interface SearchParams {
  kw?: string;
  offset?: number;
  type?: number | string;
}

interface VideoSearchParams {
  name: string;
}

// 搜索歌曲
export const cloudsearch = (params: SearchParams) =>
  httpGet<ResSearch>(
    `cloudsearch?keywords=${encodeURIComponent(
      params.kw || "",
    )}&limit=30&offset=${((params.offset || 1) - 1) * 30}&type=${
      params.type || 1
    }`,
  );
//获取音乐连接
export const urlV1 = (id: number) =>
  httpGet<ResultData>(`song/url/v1?id=${id}&level=exhigh`);
// 搜索动漫
export const videoSearch = (params: VideoSearchParams) =>
  httpGet<ResVideoSearch>(
    `video/search?name=${encodeURIComponent(params.name)}`,
  );
// 查看动漫详情
export const videoChapter = (id: number) =>
  httpGet<ResVideoSearch>(`video/chapter?id=${id}`);
// 1. 二维码 key 生成接口
export const loginQrKey = () => httpGet<ResultData>("/login/qr/key");
// 2. 二维码生成接口
export const loginQrCreate = (key: string) =>
  httpGet<ResultData>(
    `/login/qr/create?key=${encodeURIComponent(key)}&qrimg=true`,
  );
// 3. 二维码检测扫码状态接口
export const loginQrCheck = (key: string) =>
  httpGet<checkQR>(`/login/qr/check?key=${encodeURIComponent(key)}`);
//登陆状态
export const loginStatus = () => httpGet<ResultData>("/login/status");
//退出登陆
export const logout = () => httpGet<code>("/logout");
// 每日推荐
export const recommendSongs = () => httpGet<ResultData>("/recommend/songs");
// 每日歌单
export const recommendResource = () =>
  httpGet<ResRecommendResource>("/recommend/resource");
// 喜欢音乐
export const likeMusic = (id: number) => httpGet(`/like?id=${id}`);
// 获取用户歌单
export const userPlaylist = (id: number) => httpGet(`/user/playlist?uid=${id}`);
// 获取歌单所有歌曲
export const playlistTrackAll = (params: { id: number; offset?: number }) =>
  httpGet(
    `/playlist/track/all?id=${params.id}&limit=30&offset=${
      ((params.offset || 1) - 1) * 30
    }`,
  );
//获取歌单详情
export const playlistDetail = (id: number) =>
  httpGet<ResPlaylistDetail>(`/playlist/detail?id=${id}`);
//获取歌词
export const lyric = (id: number | string) =>
  httpGet<Reslyric>(`/lyric?id=${id}`);

// 最热MV
export const mvFirst = () => httpGet<ResultData>("/mv/first");
export const mvUrl = (id: number) => httpGet<ResultData>(`mv/url?id=${id}`);