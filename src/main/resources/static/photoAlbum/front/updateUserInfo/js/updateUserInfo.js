

$(function(){
    Module.init();
});

var Module = {
    init : function() {
        var data = Module.requestData();
        Module.loadData(data);
    },
    loadData : function(data) {
        if (undefined == data) {
            return;
        }
        var i, t = data.userPassword, k="";
        for (i=0; i<t.length; i++) {
            k+="*";
        }
        k = data.userPassword;
        $('#userAccountText').val(data.userAccount);
        $('#userPasswordText').val(k);
        $('#userNameText').val(data.userName);
        $('#userEmailText').val(data.userEmail);
    },
    packageData : function() {
        var userInfo = {
            userAccount : $('#userAccountText').val(),
            userPassword : $('#userPasswordText').val(),
            userName : $('#userNameText').val(),
            userEmail : $('#userEmailText').val()
        }
        if (GlobalMethod.isEmpty(userInfo.userAccount) || GlobalMethod.isEmpty(userInfo.userPassword) || GlobalMethod.isEmpty(userInfo.userName) || GlobalMethod.isEmpty(userInfo.userEmail) ) {
            swal("登录名和密码不能为空", "", "error");
            return undefined;
        }
        if (userInfo.userAccount.length > 10) {
            swal("登录名不能超过10个字", "", "error");
            return undefined;
        }
        if (userInfo.userPassword.length > 8) {
            swal("密码不能超过8个字", "", "error");
            return undefined;
        }
        if (userInfo.userName.length > 10) {
            swal("用户名不能超过10个字", "", "error");
            return undefined;
        }
        if (userInfo.userName.length > 30) {
            swal("邮箱不能超过30个字", "", "error");
            return undefined;
        }
        return userInfo;
    },
    requestData : function() {
        var targetData = undefined;
        if ("design" == GlobalConfig.currentModel) {
            return test_albumList;
        }
        $.ajax({
            url: GlobalConfig.serverAddress + "/user/info",
            type: 'GET',
            cache: false,
            async: false, //设置同步
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: null,
            success: function(data) {
                if (data.code == '0') {
                    targetData = data.data;
                } else {
                    swal({
                        title: "获取用户数据失败",
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
        return targetData;
    },
    sendData : function() {
        var userInfo = Module.packageData();
        if (undefined == userInfo) {
            return ;
        }
        $.ajax({
            url: GlobalConfig.serverAddress + "/user/update",
            type: 'POST',
            cache: false,
            async: false, //设置同步
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: userInfo,
            success: function(data) {
                if (data.code == '0') {
                    swal("修改成功", "1s后退出当前页面^-^", "success");
                    setTimeout("GlobalMethod.goBack()", 1000);
                } else {
                    swal({
                        title: "修改用户数据失败",
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