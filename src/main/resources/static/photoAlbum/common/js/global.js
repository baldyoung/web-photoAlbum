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
	argList : undefined,
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
		/*var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != undefined) return unescape(r[2]);*/

		if (undefined != GlobalMethod.argList) {
			var list = GlobalMethod.argList;
			var i, item;
			for(i=0; i<list.length; i++) {
				item = list[i];
				if (item.key == name) {
					return item.value;
				}
			}
			return undefined;
		}
		GlobalMethod.argList = [];
		var url = document.location.toString();//获取url地址
		var urlParmStr = url.slice(url.indexOf('?')+1);//获取问号后所有的字符串
		var arr = urlParmStr.split('&');//通过&符号将字符串分割转成数组
		var a, b, c, t;
		for(a=0; a<arr.length; a++) {
			b = arr[a];
			c = b.split("=");
			t = {
				key : c[0],
				value : decodeURI(c[1])
			}
			console.log(JSON.stringify(t));
			GlobalMethod.argList[GlobalMethod.argList.length] = t;
		}
		return GlobalMethod.getArgsFromLocationHref(name);
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
        html += '<h2><strong>'+titleName+'</strong><i onclick="logout()" class="fa fa-sign-out cursor-pointer pull-right"></i><i onclick="GlobalMethod.redirectURL(\'/photoAlbum/front/updateUserInfo/updateUserInfo.html\')" class="fa fa-pencil-square cursor-pointer pull-right"></i></h2>';
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

function logout() {
	$.ajax({
		url: GlobalConfig.serverAddress + "/user/logout",
		type: 'GET',
		cache: false,
		async: false, //设置同步
		dataType: 'json',
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		data: null,
		success: function(data) {
			if (data.code == '0') {
				GlobalMethod.replaceURL("/photoAlbum/front/login/login.html");
			} else {
				swal({
					title: "登出失败",
					text: data.desc,
					type: "error"
				});
			}
		},
		error: function() {
			swal({
				title: "服务器连接失败",
				text: "请检查网络是否通畅！",
				type: "warning"
			});
		}
	});
}

// document.title
