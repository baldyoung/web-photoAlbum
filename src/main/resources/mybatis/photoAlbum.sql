

# 本demo由 baldyoung 提供
########################################################################
-- 查看建数据库的语句
-- show create database MiniBlog;
-- 罗列当前数据库下的所有表
-- show tables;
-- 查看建表的语句
-- SHOW CREATE TABLE MB_User;
########################################################################

-- 创建数据库
/*
character 指定数据库存储字符串的默认字符集；
collate 指定数据库的默认校对规则，用来比较字符串的方式，解决排序和字符分组的问题；
*/
CREATE DATABASE IF NOT EXISTS photo_album
	DEFAULT CHARACTER SET utf8
	DEFAULT COLLATE utf8_general_ci;
-- 跳转到指定数据库下
USE photo_album;
-- 创建表
-- ---------------------------------------- 用户表
DROP TABLE IF EXISTS x_user;
CREATE TABLE x_user (
	userId INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT COMMENT'主键-唯一-非空 [默认=自增]',
	userName VARCHAR(10) NOT NULL COMMENT'用户名称',
	userAccount VARCHAR(10) UNIQUE NOT NULL COMMENT'用户登录名',
	userEmail VARCHAR(30) UNIQUE NOT NULL COMMENT'用户邮箱',
	userPassword VARCHAR(8) NOT NULL COMMENT'用户登录密码',
	userStatus SMALLINT DEFAULT 0 COMMENT'用户状态',
	userInfo VARCHAR(50) COMMENT'用户备注',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;
CREATE INDEX index_userName ON x_user(userName);
-- ---------------------------------------- 图片表
-- ---------------------------------------- 相册表
-- ---------------------------------------- 图片与相册的关联表
-- ---------------------------------------- 标签表
-- ---------------------------------------- 图片与标签的关联表
-- ---------------------------------------- 邮件记录表










