$('#demoForm').validate({
    // 验证规则
    rules: {
        // name值而不是ID
        username: {
            // 必填
            required: true,
            // 添加参数后再进行特定条件校验规则
            minlength: {
                param: 2,
                depends: function (element) {
                    // 返回trun,触发required:true
                    // 密码是否被填写
                    // :filled是否被填写选择器
                    return $('#password').is(":filled")
                }
            },
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
        },
        postcode: {
            // 必填
            required: true,
            minlength: 2,
            maxlength: 16,
            postcode: '中国'
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
    // 统一显示出错信息
    groups: {
        login: "username password confirm-password"
    },
    // 统一显示在#info中
    errorPlacement: function (error, element) {
        error.appendTo("#info")
    },
    showErrors: function (errorMap, errorList) {
        console.log(errorMap);
        console.log(errorList);
        this.defaultShowErrors()
    },
    highlight: function (element, errorClass, validClass) {
        // 添加样式
        $(element).addClass(errorClass).removeClass(validClass);
        // 淡入淡出
        $(element).fadeOut().fadeIn();
    }
})
// 自定义验证-邮政编码
$.validator.addMethod('postcode', function (value, element, params) {
    // 正则表达式0~9的数字 共6位数
    var postcode = /^[0-9]{6}$/;
    // 填写值才会触发验证方法,值为空不去触发校验规则
    // 传入的value是否符合正则表达式，符合返回true
    return this.optional(element) || (postcode.test(value))
}, $.validator.format("请填写正确的{0}邮编！"))

$("#check").click(function () {
    alert($("#demoForm").valid() ? "填写正确" : "填写错误，请重新填写")
})