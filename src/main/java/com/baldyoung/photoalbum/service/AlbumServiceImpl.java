package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.AlbumDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlbumServiceImpl {

    @Autowired
    private AlbumDao albumDao;

    public List<Map> getAlbumListByUserId(Integer userId) {
        return albumDao.selectByUserId(userId);
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
