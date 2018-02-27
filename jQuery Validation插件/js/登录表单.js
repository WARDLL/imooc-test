$('#demoForm').validate({
    // 验证规则
    rules: {
        // name值而不是ID
        username: {
            // 必填
            required: true,
            minlength: 2,
            maxlength: 16
        },
        // name值而不是ID
        password: {
            // 必填
            required: true,
            minlength: 2,
            maxlength: 16
        },
        // 横杠需要双引号
        "confirm-password": {
            // 必填
            required: true,
            equalTo: '#password'
        }
    },
    messages: {
        // name值而不是ID
        username: {
            required: "必须填写用户名",
            minlength: "用户名最少为2位",
            maxlength: "用户名最长为16位"
        },
        // name值而不是ID
        password: {
            required: "必须填写密码",
            minlength: "密码最少为2位",
            maxlength: "密码最长为16位"
        },
        "confirm-password": {
            // 必填
            required: "请再次输入密码",
            equalTo: "两次密码填写不一致"
        }
    },

    submitHandler: function (form) {
        console.log($(form).serialize())
    },
    invalidHandler: function (event, validator) {
        console.log("错误数" + validator.numberOfInvalids())
    },
})

$("#check").click(function () {
    alert($("#demoForm").valid() ? "填写正确" : "填写错误，请重新填写")
})