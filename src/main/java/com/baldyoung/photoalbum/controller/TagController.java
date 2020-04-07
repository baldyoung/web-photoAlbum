package com.baldyoung.photoalbum.controller;

import com.baldyoung.photoalbum.common.jo.dto.ResponseResult;
import com.baldyoung.photoalbum.service.TagServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

import static com.baldyoung.photoalbum.common.jo.dto.ResponseResult.*;
import static com.baldyoung.photoalbum.common.utility.ValueUtility.toInteger;

/**
 * 标签 - 后端接口
 */
@RestController
@RequestMapping("tag")
public class TagController {

    @Autowired
    private TagServiceImpl tagService;

    /**
     * 获取指定照片的标签
     * @param session
     * @param imageId
     * @return
     */
    @GetMapping("imageTag")
    public ResponseResult getImageTag(HttpSession session,
                                      @RequestParam("imageId")Integer imageId) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        return success(tagService.getImageTagList(userId, imageId));
    }

    /**
     * 获取当前用户的所有标签
     * @param session
     * @return
     */
    @GetMapping("userTag")
    public ResponseResult getUserTag(HttpSession session) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        return success(tagService.getUserTagList(userId));
    }

    /**
     * 删除指定标签
     * @param tagName
     * @param session
     * @return
     */
    @PostMapping("delete")
    public ResponseResult deleteTag(@RequestParam("tagName")String tagName,
                                    HttpSession session) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        tagService.deleteTag(tagName, userId);
        return success();
    }



}
