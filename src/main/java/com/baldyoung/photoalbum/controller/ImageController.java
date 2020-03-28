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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.baldyoung.photoalbum.common.jo.dto.ResponseResult.*;
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

    private String imagePath;

    private String getImagePath() {
        if (null == imagePath) {
            String projectPath = ClassUtils.getDefaultClassLoader().getResource("static").getPath();
            imagePath = projectPath + File.separator + config.imagePath.replace(".", File.separator) + File.separator;
            imagePath = FileDataSaveModule.adjustPathNameSeparator(imagePath);
            logger.info("文件存储路径初始化:" + imagePath);
        }
        return imagePath;
    }

    @PostMapping("add")
    public ResponseResult addImage(HttpSession session,
                                   @RequestParam("albumId") Integer albumId,
                                   @RequestParam("updateDateTime") String updateDateTime,
                                   @RequestParam("labelList") List<String> labelList,
                                   @RequestParam("file") MultipartFile multipartFile) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        logger.info("albumId:" + albumId + ", updateDateTime:" + updateDateTime + ", labelList:" + labelList.toString());
        String temp = multipartFile.getOriginalFilename();
        temp = temp.substring(temp.lastIndexOf("."));
        logger.info("文件类型:" + temp);
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
        newImage.put("imageInfo", String.valueOf(updateDateTime));
        newImage.put("imageFileName", String.valueOf(imageFileName));
        imageService.addImage(newImage);
        return success();
    }

    @GetMapping("list")
    public ResponseResult getAlbumImageList(HttpSession session,
                                            @RequestParam("albumId")Integer albumId) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        Map albumInfo = albumService.getAlbumInfo(albumId);
        if (null == albumInfo) {
            return defeat("无效相册");
        }
        Integer aUserId = toInteger(albumInfo.get("userId"));
        if (!userId.equals(aUserId)) {
            return defeat("无效相册");
        }
        return success(imageService.getImageListFromAlbum(albumId));
    }
}
