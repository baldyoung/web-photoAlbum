package com.baldyoung.photoalbum.controller;

import com.baldyoung.photoalbum.GlobalFilter;
import com.baldyoung.photoalbum.common.jo.config.GlobalConfig;
import com.baldyoung.photoalbum.common.jo.dto.ResponseResult;
import com.baldyoung.photoalbum.common.utility.FileDataSaveModule;
import com.baldyoung.photoalbum.service.AlbumServiceImpl;
import com.baldyoung.photoalbum.service.ImageServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.util.*;

import static com.baldyoung.photoalbum.common.jo.dto.ResponseResult.*;
import static com.baldyoung.photoalbum.common.utility.ValueUtility.isEmpty;
import static com.baldyoung.photoalbum.common.utility.ValueUtility.toInteger;

@RestController
@RequestMapping("image")
public class ImageController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private GlobalConfig config;

    @Autowired
    private ImageServiceImpl imageService;

    @Autowired
    private AlbumServiceImpl albumService;

    private String[] acceptFileTypeArray = {".gif", ".jpg", ".jpeg", ".bmp", ".png", ".mp4"};

    private String imagePath;

    private String getImagePath() {
        if (null == imagePath) {
            // 如果是idea中开发运行，请使用下面这两行代码生成存储路径
            String projectPath = ClassUtils.getDefaultClassLoader().getResource("static").getPath();
            imagePath = projectPath + File.separator + config.imagePath.replace(".", File.separator) + File.separator;
            // -----------------------------------------------------------------------------------------------------------------
            // 如果是生产环境运行，请将jar中的“static目录”复制到jar同级的目录下
            // imagePath = "static"+File.separator+config.imagePath.replace(".", File.separator) + File.separator;
            // -----------------------------------------------------------------------------------------------------------------
            imagePath = FileDataSaveModule.adjustPathNameSeparator(imagePath);
            logger.info("文件存储路径初始化:" + imagePath);
        }
        return imagePath;
    }

    private boolean isAcceptFileType(String fileType) {
        fileType = fileType.toLowerCase();
        for(String type : acceptFileTypeArray) {
            if (type.equals(type)) {
                return true;
            }
        }
        return false;
    }

    @PostMapping("add")
    public ResponseResult addImage(HttpSession session,
                                   @RequestParam("albumId") Integer albumId,
                                   @RequestParam("imageInfo") String imageInfo,
                                   @RequestParam("labelList") List<String> labelList,
                                   @RequestParam("file") MultipartFile multipartFile) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        logger.info("albumId:" + albumId + ", updateDateTime:" + imageInfo + ", labelList:" + labelList.toString());
        String temp = multipartFile.getOriginalFilename();
        temp = temp.substring(temp.lastIndexOf("."));
        temp = temp.toLowerCase();
        logger.info("文件类型:" + temp);
        if (!isAcceptFileType(temp)) {
            logger.warn("非法文件类型:"+temp);
            return defeat("暂时支持的文件类型为:"+acceptFileTypeArray.toString());
        }
        temp = FileDataSaveModule.getUniqueIdentification("", temp);
        String imageFileName = temp;
        logger.info("新文件名称:" + temp);
        temp = getImagePath() + temp;
        logger.info("文件存储路径." + temp);

        try {
            FileDataSaveModule fileDataSaveModule = new FileDataSaveModule(multipartFile.getInputStream(), temp);
            fileDataSaveModule.save();
        } catch (IOException e) {
            logger.error("图片文件解析失败>>>" + e.getMessage());
            return error(500, "数据解析失败");
        }
        Map<String, String> newImage = new HashMap();
        newImage.put("userId", String.valueOf(userId));
        newImage.put("albumId", String.valueOf(albumId));
        newImage.put("imageInfo", String.valueOf(imageInfo));
        newImage.put("imageFileName", String.valueOf(imageFileName));
        imageService.addImage(newImage, labelList);
        return success();
    }

    @GetMapping("list")
    public ResponseResult getAlbumImageList(HttpSession session,
                                            @RequestParam(value = "albumId", required = false)Integer albumId,
                                            @RequestParam(value = "tagName", required = false)String tagName) {
        if (null == albumId && isEmpty(tagName)) {
            return success(Arrays.asList());
        }
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        Map albumInfo;
        if (null != albumId) {
            albumInfo = albumService.getAlbumInfo(albumId);
            if (null == albumInfo) {
                return defeat("无效相册");
            }
            Integer aUserId = toInteger(albumInfo.get("userId"));
            if (!userId.equals(aUserId)) {
                return defeat("无效相册");
            }
            albumInfo.put("imageList", imageService.getImageListFromAlbum(albumId));
        } else {
            albumInfo = new HashMap();
            albumInfo.put("albumName", tagName);
            albumInfo.put("imageList", imageService.getImageListByTagName(tagName, userId));
        }
        return success(albumInfo);
    }

    @GetMapping("imageInfo")
    public ResponseResult getImageInfo(HttpSession session,
                                       @RequestParam("imageId")Integer imageId) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        return success(imageService.getImageInfo(imageId, userId));
    }


    @PostMapping("delete")
    public ResponseResult deleteImage(HttpSession session,
                                      @RequestParam("imageId")Integer imageId) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        imageService.deleteImage(imageId, userId);
        return success();
    }

    @PostMapping("update")
    public ResponseResult updateImage(HttpSession session,
                                      @RequestParam("imageId")Integer imageId,
                                      @RequestParam("imageInfo") String imageInfo,
                                      @RequestParam(value = "tagList[]", required = false) List<String> tagList) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        Map aImageInfo = imageService.getImageInfo(imageId, userId);
        if (null == aImageInfo || null == aImageInfo.get("imageId")) {
            return defeat("无效资源");
        }
        aImageInfo.put("imageInfo", imageInfo);
        Map<String, String> param = new HashMap();
        param.put("imageId", String.valueOf(imageId));
        param.put("imageInfo", imageInfo);
        imageService.update(param, tagList, userId, imageId);
        return success();
    }
}
