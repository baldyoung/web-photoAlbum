var GlobalConfig = {
	systemInfo : {
		name: '备忘相册',
		logoImg : '',
		version : 'Version 1.0.00'
	},
	pictureRelativePath : '/photoAlbum/common/resource/Img/',
	//currentModel : 'design', // design、dev、test
	currentModel: "dev",
	serverAddress : ''
};

var GlobalMethod = {
	isEmpty: function(str) { // 判断当前字符串是否为空
		if (str == null) return true;
		return str.replace(/\s/g, '').length == 0;
	},
	goBack: function() { // 返回上一页面
		history.back();
	},
	redirectURL: function(url) { // 跳转到指定URL，可以通过浏览器back回到上一页面
		window.location.href = url;
	},
	replaceURL: function(url) { // 替换当前URL，其导致浏览器的back无效
		window.location.replace(url);
	},
	isPC: function() { // 判断当前浏览器的的状态是否为PC端
		var userAgent = navigator.userAgent.toLowerCase();
		var temp = userAgent.match(/mobile/i);
		if (userAgent.match(/mobile/i) == "mobile") {
			return false;
		}
		if (userAgent.match(/android/i) == "android") {
			return false;
		}
		if (userAgent.match(/iphone/i)) {
			return false;
		}
		return true;
	},
	getArgsFromLocationHref: function(name) { // 获取当前URL中的指定参数值，没有则返回undefined
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != undefined) return unescape(r[2]);
		return undefined;
	},
	getAgeByDateTime: function(datetime) { // 获取格式为YYYY*MM*DD形式的时间到当前年份的差值
		var currentDate = new Date();
		var currentYear = currentDate.getFullYear();
		var birthYear = datetime.substr(0, 4);
		var age = currentYear - parseInt(birthYear) + 1;
		return age;
	},
	requestLocation: function(successRun, defaultRun) {
		if (typeof successRun != "function") {
			console.warn("parameter 'successRun' is not a function !");
		}
		if (typeof defaultRun != "function") {
			console.warn("parameter 'defaultRun' is not a function ! ")
		}
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					var longitude = position.coords.longitude;
					var latitude = position.coords.latitude;
					console.log(longitude)
					console.log(latitude)
					if (typeof successRun == "function") {
						successRun(longitude, latitude);
					}
				},
				function(e) {
					var msg = e.code;
					var dd = e.message;
					console.log(msg)
					console.log(dd)
					if (typeof defaultRun == "function") {
						defaultRun(msg, dd);
					}
				}
			)
		}
	}
}



function loadCommonTitle() {
	var target = $('#commonTitle');
	if (undefined == target) {
		return ;
	}
	target.addClass("row wrapper border-bottom white-bg page-heading no-padding no-margins full-width");
	var titleName = document.title;
	var html = '<div class="col-sm-12 ">';
        html += '<h2><strong>'+titleName+'</strong><i class="fa fa-sign-out cursor-pointer pull-right"></i><i class="fa fa-pencil-square cursor-pointer pull-right"></i></h2>';
        html += '<ol class="breadcrumb">';
        html += '<li><a href="/photoAlbum/front/home/home.html">我的相册</a></li>';
        html += '<li><a href="/photoAlbum/front/albumManage/albumManage.html">相册管理</a></li>';
        html += '<li><a href="/photoAlbum/front/labelManage/labelManage.html">我的标签</a></li>';
        html += '<li><a href="/photoAlbum/front/updatePictures/updatePictures.html">照片上传</a></li>';
        html += ' </ol>';
        html += '</div>';
        // html += '<div class="col-sm-8"></div>';
    target.html(html);
}
$(function(){
	
	loadCommonTitle();
	
});

// document.title
