package com.baldyoung.photoalbum.controller;

import com.baldyoung.photoalbum.common.jo.dto.ResponseResult;
import com.baldyoung.photoalbum.service.AlbumServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

import static com.baldyoung.photoalbum.common.jo.dto.ResponseResult.*;
import static com.baldyoung.photoalbum.common.utility.ValueUtility.isEmpty;
import static com.baldyoung.photoalbum.common.utility.ValueUtility.toInteger;

@RestController
@RequestMapping("album")
public class AlbumController {
    @Autowired
    private AlbumServiceImpl albumService;

    /**
     * 获取当前用户的所有相册
     * @param session
     * @return
     */
    @GetMapping("all")
    public ResponseResult getAlbumList(HttpSession session) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        return success(albumService.getAlbumListByUserId(userId));
    }

    /**
     * 获取指定相册的详细信息
     * @param session
     * @param albumId
     * @return
     */
    @GetMapping("albumInfo")
    public ResponseResult getAlbumInfo(HttpSession session,
                                       @RequestParam("albumId")Integer albumId) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        Map albumInfo = albumService.getAlbumInfo(albumId);
        if (null == albumInfo || null == albumInfo.get("userId")) {
            return defeat("无效相册");
        }
        Integer aUserId = toInteger(albumInfo.get("userId"));
        if (!userId.equals(aUserId)) {
            return defeat("你没有改相册的权限");
        }
        return success(albumInfo);
    }

    /**
     * 新增相册
     * @param session
     * @param albumName
     * @param albumInfo
     * @return
     */
    @PostMapping("add")
    public ResponseResult addAlbum(HttpSession session,
                                   @RequestParam("albumName")String albumName,
                                   @RequestParam(value = "albumInfo", required = false)String albumInfo) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        if (isEmpty(albumName)) {
            return defeat("相册名不能为空");
        }
        if (null == albumInfo) {
            albumInfo = " ";
        }
        Map<String, String> param = new HashMap();
        param.put("albumName", albumName);
        param.put("albumInfo", albumInfo);
        param.put("userId", String.valueOf(userId));
        albumService.addAlbum(param);
        return success();
    }

    /**
     * 修改相册
     * @param session
     * @param albumId
     * @param albumName
     * @param albumInfo
     * @return
     */
    @PostMapping("update")
    public ResponseResult updateAlbum(HttpSession session,
                                      @RequestParam("albumId")Integer albumId,
                                      @RequestParam(value = "albumName", required = false)String albumName,
                                      @RequestParam(value = "albumInfo", required = false)String albumInfo) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        Map oldAlbum = albumService.getAlbumInfo(albumId);
        if (null == oldAlbum || null == oldAlbum.get("userId") || !userId.equals(oldAlbum.get("userId"))) {
            return defeat("无效相册");
        }
        Map<String, String> param = new HashMap();
        param.put("albumName", albumName);
        param.put("albumInfo", albumInfo);
        albumService.update(param);
        return success();
    }

    /**
     * 删除相册
     * @param session
     * @param albumId
     * @return
     */
    @PostMapping("delete")
    public ResponseResult deleteAlbum(HttpSession session,
                                      @RequestParam("albumId")Integer albumId) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        Map oldAlbum = albumService.getAlbumInfo(albumId);
        Integer aUserId = toInteger(oldAlbum.get("userId"));
        if (null == oldAlbum || null == oldAlbum.get("userId") || !userId.equals(aUserId)) {
            return defeat("无效相册");
        }
        albumService.delete(albumId);
        return success();
    }





}
