$(function() {

});

var RegisterModule = {
	init: function() {

	},
	sendVerifyCode: function() {
		var registerData = RegisterModule.packageData(0);
		if (undefined == registerData) {
			return;
		}
		if ("design" == GlobalConfig.currentModel) {
			swal({
				title: "邮件发送成功",
				text: "请注意查收对应邮箱",
				type: "success"
			});
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/user/requestRegisterVerifyCode",
			type: 'POST',
			cache: false,
			//async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: registerData,
			success: function(data) {
				if (data.code == '0') {
					swal({
						title: "邮件发送成功",
						text: "请注意查收对应邮箱",
						type: "success"
					});
				} else {
					swal({
						title: "验证码发送失败",
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

	},
	registerAction: function() {
		var data = RegisterModule.packageData(1);
		RegisterModule.sendData(data);
	},
	packageData: function(t) {
		var data = {
			userAccount: $('#accountText').val(),
			userPassword: $('#passwordText').val(),
			userEmail: $('#emailText').val(),
			pwd_V: $('#passwordText_V').val(),
			verifyCode: $('#verifyCodeText').val()
		};
		if (GlobalMethod.isEmpty(data.userAccount)) {
			swal({
				title: '账户不能为空',
				text: '',
				type: 'error'
			});
			return undefined;
		}
		if (GlobalMethod.isEmpty(data.userPassword)) {
			swal({
				title: '密码不能为空',
				text: '',
				type: 'error'
			})
			return undefined;
		}
		if (data.userPassword != data.pwd_V) {
			swal({
				title: '两次密码不一样',
				text: '',
				type: 'error'
			})
			return undefined;
		}
		if (GlobalMethod.isEmpty(data.userEmail)) {
			swal({
				title: '邮箱不能为空',
				text: '',
				type: 'error'
			})
			return undefined;
		}
		if (t == 1 && GlobalMethod.isEmpty(data.verifyCode)) {
			swal({
				title: '邮箱验证码不能为空',
				text: '',
				type: 'error'
			})
			return undefined;
		}
		return data;
	},
	sendData: function(registerData) {
		if (undefined == registerData) {
			return;
		}
		if ("design" == GlobalConfig.currentModel) {
			swal({
				title: "注册成功",
				text: "将在3秒后返回登录界面",
				type: "success"
			});
			setTimeout("GlobalMethod.replaceURL('../login/login.html')", 3000);
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/user/register",
			type: 'POST',
			cache: false,
			//async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: registerData,
			success: function(data) {
				if (data.code == '0') {
					swal({
						title: "注册成功",
						text: "将在3秒后返回登录界面",
						type: "success"
					});
					setTimeout("GlobalMethod.replaceURL('../login/login.html')", 3000);
				} else {
					swal({
						title: "注册失败",
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