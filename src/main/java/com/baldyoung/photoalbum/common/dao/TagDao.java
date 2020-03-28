package com.baldyoung.photoalbum.common.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TagDao {

    void insertTag(@Param("param")Map<String, String> param);

    void insertTagList(@Param("list")List<Map<String, String>> list, @Param("userId")Integer userId);

    // List<Map> selectTagWithCondition(@Param("param")Map<String, String> param);

    // Map selectTagByTagNameAndUserId(@Param("tagName")String tagName, @Param("userId")Integer userId);

    // List<Map> selectTagByUserId(@Param("userId")Integer userId);

    // void deleteTag(@Param("tagId")Integer tagId, @Param("userId")Integer userId);



    // -----------------------------------------------
    /*
    void insertLink(@Param("param")Map<String, String> param);

    List<Map> selectTagByImageId(@Param("imageId")Integer imageId);

    void deleteLink(@Param("tagId")Integer tagId, @Param("imageId")Integer imageId);
     */
}
