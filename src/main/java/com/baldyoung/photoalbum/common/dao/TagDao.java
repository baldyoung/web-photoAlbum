package com.baldyoung.photoalbum.common.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 标签 - 数据库访问
 */
@Repository
public interface TagDao {

    void insertTag(@Param("param")Map<String, String> param);

    void insertTagList(@Param("list")List<String> list, @Param("userId")Integer userId, @Param("imageId")Integer imageId);

    List<Map> selectByImageIdAndUserId(@Param("imageId")Integer imageId, @Param("userId")Integer userId);

    void deleteTag(@Param("tagId")Integer tagId, @Param("userId")Integer userId);

    void deleteTagByTagNameAndUserId(@Param("tagName")String tagName, @Param("userId")Integer userId);

    void deleteTagByTagNameAndImageId(@Param("tagName")String tagName, @Param("imageId")Integer imageId);

    void deleteTagByImageId(@Param("imageId")Integer imageId, @Param("userId")Integer userId);

    List<Map> selectTagByUserId(@Param("userId")Integer userId);

    //List<Map> selectTagByUserIdAndTagName(@Param("userId")Integer userId);




    // List<Map> selectTagWithCondition(@Param("param")Map<String, String> param);

    // Map selectTagByTagNameAndUserId(@Param("tagName")String tagName, @Param("userId")Integer userId);

    // List<Map> selectTagByUserId(@Param("userId")Integer userId);





    // -----------------------------------------------
    /*
    void insertLink(@Param("param")Map<String, String> param);

    List<Map> selectTagByImageId(@Param("imageId")Integer imageId);

    void deleteLink(@Param("tagId")Integer tagId, @Param("imageId")Integer imageId);
     */
}
