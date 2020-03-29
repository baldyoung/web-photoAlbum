package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.AlbumDao;
import com.baldyoung.photoalbum.common.dao.ImageDao;
import com.baldyoung.photoalbum.common.dao.TagDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.baldyoung.photoalbum.common.utility.ValueUtility.toInteger;


@Service
public class ImageServiceImpl {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ImageDao imageDao;

    @Autowired
    private TagDao tagDao;

    @Autowired
    private AlbumDao albumDao;


    public void addImage(Map<String, String> param, List<String> tagNameList) {
        Map map ;
        // 保存圖片
        imageDao.insertImage(param);
        map = imageDao.selectByImageFileName(param.get("imageFileName"));
        Integer newImageId = toInteger(map.get("imageId"));
        param.put("imageId", String.valueOf(newImageId));
        // 將图片与相册关联
        imageDao.insertLink(param);
        Integer userId = toInteger(param.get("userId"));
        Integer albumId = toInteger(param.get("albumId"));
        Map<String, String> tMap = new HashMap<>();
        tMap.put("albumId", String.valueOf(albumId));
        albumDao.update(tMap);
        // 将标签与图片关联
        if (null != tagNameList && tagNameList.size() > 0) {
            tagDao.insertTagList(tagNameList, userId, newImageId);
        }
    }

    public List<Map> getImageListFromAlbum (Integer albumId) {
        return imageDao.selectByAlbumId(albumId);
    }

    public List<Map> getImageListByTagName(String tagName, Integer userId) {
        return imageDao.selectByTagName(tagName, userId);
    }

    public Map getImageInfo(Integer imageId, Integer userId) {
        Map imageInfo = imageDao.selectByImageId(imageId);
        imageInfo.put("tagList", tagDao.selectByImageIdAndUserId(imageId, userId));
        return imageInfo;
    }

    public void deleteImage(Integer imageId, Integer userId) {
        imageDao.deleteImage(imageId, userId);
        imageDao.deleteLink(imageId);
        tagDao.deleteTagByImageId(imageId, userId);
    }

    public void update(Map<String, String> param, List<String> tagNameList, Integer userId, Integer imageId) {
        imageDao.updateImage(param);
        tagDao.deleteTagByImageId(imageId, userId);
        if (null != tagNameList && tagNameList.size() > 0) {
            tagDao.insertTagList(tagNameList, userId, imageId);
        }
    }



}
