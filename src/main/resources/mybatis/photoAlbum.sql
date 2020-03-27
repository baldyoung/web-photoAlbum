

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
	userEmail VARCHAR(30) NOT NULL COMMENT'用户邮箱',
	userPassword VARCHAR(8) NOT NULL COMMENT'用户登录密码',
	userStatus SMALLINT DEFAULT 0 COMMENT'用户状态',
	userInfo VARCHAR(50) COMMENT'用户备注',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;
CREATE INDEX index_userEmail ON x_user(userEmail);
INSERT INTO x_user (userName, userEmail, userAccount, userPassword)
VALUES ('测试账号', 'test@baldyoung.com', 'test', 123);
-- ---------------------------------------- 图片表
DROP TABLE IF EXISTS x_image;
CREATE TABLE x_image (
	imageId INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT COMMENT'主键',
	userId INT UNSIGNED NOT NULL COMMENT'所属用户主键',
	imageFileName VARCHAR(30) NOT NULL COMMENT'路径名称',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;
-- ---------------------------------------- 相册表
DROP TABLE IF EXISTS x_album;
CREATE TABLE x_album (
	albumId INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT COMMENT'主键',
	userId INT UNSIGNED NOT NULL COMMENT'所属用户主键',
	albumName VARCHAR(10) NOT NULL COMMENT'相册名称',
	albumInfo VARCHAR(100) COMMENT '相册简介',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;
-- ---------------------------------------- 图片与相册的关联表
DROP TABLE IF EXISTS x_link_album_image;
CREATE TABLE x_link_album_image (
	linkId INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT COMMENT'主键',
	albumId INT UNSIGNED NOT NULL COMMENT'相册主键',
	imageId INT UNSIGNED NOT NULL COMMENT'图片主键',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;
-- ---------------------------------------- 标签表
DROP TABLE IF EXISTS x_tag;
CREATE TABLE x_tag (
	tagId INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT COMMENT'主键',
	userId INT UNSIGNED NOT NULL COMMENT'所属用户主键',
	tagName VARCHAR(10) NOT NULL COMMENT'标签名称',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;
-- ---------------------------------------- 图片与标签的关联表
DROP TABLE IF EXISTS x_link_tag_image;
CREATE TABLE x_link_tag_image (
	linkId INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT COMMENT'主键',
	tagId INT UNSIGNED NOT NULL COMMENT'标签主键',
	imageId INT UNSIGNED NOT NULL COMMENT'图片主键',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;
-- ---------------------------------------- 邮件记录表
DROP TABLE IF EXISTS x_record_email;
CREATE TABLE x_record_email (
	recordId INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT COMMENT'主键',
	receiverEmail VARCHAR(30) NOT NULL COMMENT'接收方邮箱',
	senderEmail VARCHAR(30) NOT NULL COMMENT'发送方邮箱',
	emailContent VARCHAR(100) COMMENT'邮件内容',
	emailStatus SMALLINT DEFAULT 0 COMMENT'邮件状态{0:发送成功, 1:发送失败}',
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
	createDateTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT'创建时间'
) AUTO_INCREMENT=1001;










