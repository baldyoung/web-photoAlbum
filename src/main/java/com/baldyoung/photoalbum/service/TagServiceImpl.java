package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.TagDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class TagServiceImpl {

    @Autowired
    private TagDao tagDao;

    public List<Map> getUserTagList(Integer userId) {
        return tagDao.selectTagByUserId(userId);
    }

    public void deleteTag(String tagName, Integer userId) {
        tagDao.deleteTagByTagNameAndUserId(tagName, userId);
    }

    public List<Map> getImageTagList(Integer userId, Integer imageId) {
        return tagDao.selectByImageIdAndUserId(imageId, userId);
    }


}
