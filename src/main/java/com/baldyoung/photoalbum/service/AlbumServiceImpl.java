package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.AlbumDao;
import com.baldyoung.photoalbum.common.dao.ImageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static com.baldyoung.photoalbum.common.utility.ValueUtility.toInteger;

@Service
public class AlbumServiceImpl {

    @Autowired
    private AlbumDao albumDao;

    @Autowired
    private ImageDao imageDao;

    public List<Map> getAlbumListByUserId(Integer userId) {
        List<Map> list = albumDao.selectByUserId(userId);
        for(Map map : list) {
            Integer albumId = toInteger(map.get("albumId"));
            Integer amount = imageDao.countImageForAlbum(albumId);
            map.put("amount", amount);
        }
        return list;
    }

    public Map getAlbumInfo(Integer albumId) {
        return albumDao.selectByAlbumId(albumId);
    }

    public void addAlbum(Map<String, String> param) {
        albumDao.insert(param);
    }

    public void update(Map<String, String> param) {
        albumDao.update(param);
    }

    public void delete(Integer albumId) {
        albumDao.delete(albumId);
    }
}
