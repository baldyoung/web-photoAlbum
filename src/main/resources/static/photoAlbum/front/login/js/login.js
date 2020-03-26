$(function() {

});

var LoginModule = {
	init: function() {

	},
	loginAction: function() {
		var loginData = LoginModule.packageData();
		LoginModule.sendData(loginData);
	},
	packageData: function() {
		var data = {
			account: $('#accountText').val(),
			pwd: $('#passwordText').val()
		};
		if (GlobalMethod.isEmpty(data.account)) {
			swal({
				title : '账户不能为空',
				text : '',
				type : 'error'
			})
			return undefined;
		}
		if (GlobalMethod.isEmpty(data.pwd)) {
			swal({
				title : '密码不能为空',
				text : '',
				type : 'error'
			})
			return undefined;
		}
		return data;
	},
	requestData: function() {

	},
	sendData: function(loginData) {
		if (undefined == loginData) {
			return;
		}
		if ("design" == GlobalConfig.currentModel) {
			if (loginData.account != "admin" || loginData.pwd != "pwd123") {
				swal({
					title: "登陆失败",
					text: "错误信息",
					type: "error"
				});
				return;
			}
			GlobalMethod.replaceURL('../home/home.html');
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "login",
			type: 'POST',
			cache: false,
			//async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: loginData,
			success: function(data) {
				if (data.result == 'success') {
					GlobalMethod.replaceURL('../home/home.html');
				} else {
					swal({
						title: "登陆失败",
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
}

var OptionModule = {
	forgetPWD: function() {
		var userInfo = {
			account: $('#accountText').val()
		};
		if (GlobalMethod.isEmpty(userInfo.account)) {
			swal({
				title: '请先输入您的用户名',
				text: '',
				type: 'error'
			})
			return;
		}
		if ("design" == GlobalConfig.currentModel) {

			swal({
				title: "通知成功",
				text: "您的密码已通过邮箱发送给您，请注意查收！",
				type: "success"
			});
			return;

		}
		$.ajax({
			url: GlobalConfig.serverAddress + "forgetPWD",
			type: 'POST',
			cache: false,
			//async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: userInfo,
			success: function(data) {
				if (data.result == 'success') {
					swal({
						title: "通知成功",
						text: "您的密码已通过邮箱发送给您，请注意查收！",
						type: "success"
					});
				} else {
					swal({
						title: "找回密码失败",
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
}