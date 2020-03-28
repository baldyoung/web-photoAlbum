package com.baldyoung.photoalbum.service;

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

    public void addImage(Map<String, String> param, List<String> tagNameList) {
        Map map ;
        imageDao.insertImage(param);
        map = imageDao.selectByImageFileName(param.get("imageFileName"));
        // logger.info(">>>>>>>>"+map.toString());
        param.put("imageId", String.valueOf(map.get("imageId")));
        imageDao.insertLink(param);
        Integer userId = toInteger(param.get("userId"));
        for(String tagName : tagNameList) {
            //if ()
        }
    }

    public List<Map> getImageListFromAlbum (Integer albumId) {
        return imageDao.selectByAlbumId(albumId);
    }





}
