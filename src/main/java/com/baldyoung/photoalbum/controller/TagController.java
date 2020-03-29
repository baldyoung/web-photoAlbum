package com.baldyoung.photoalbum.controller;

import com.baldyoung.photoalbum.common.jo.dto.ResponseResult;
import com.baldyoung.photoalbum.service.TagServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

import static com.baldyoung.photoalbum.common.jo.dto.ResponseResult.*;
import static com.baldyoung.photoalbum.common.utility.ValueUtility.toInteger;

@RestController
@RequestMapping("tag")
public class TagController {

    @Autowired
    private TagServiceImpl tagService;

    @GetMapping("imageTag")
    public ResponseResult getImageTag(HttpSession session,
                                      @RequestParam("imageId")Integer imageId) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        return success(tagService.getImageTagList(userId, imageId));
    }

    @GetMapping("userTag")
    public ResponseResult getUserTag(HttpSession session) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        return success(tagService.getUserTagList(userId));
    }

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
