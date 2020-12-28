$(document).ready(function() {
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}

	var trade_water_id  =getUrlParam("trade_water_id");//交易编号,接口ur获取
	var type = '01';//类型’
	var telInput = $("input[name='tel']");//手机号文本框
	var invoiceTitle = $("input[name='invoice_title']");//发票抬头文本框
	var creditCode = $("input[name='credit_code']");//公司识别码文本框
	var captcha = $("input[name='captcha']");//验证码
	var tempSelfTitle = '';//个人抬头临时变量
	var tempCspTitle ="";//公司抬头临时变量
	var tempCreditCode = "";  //公司识别码临时变量
	var showcom = "";  //是否允许公司开具发票标识  0：不能开具公司发票；1：允许开具
	var invoice_title_type = "01";  //默认发票开具类型 01：个人；02：公司
	var Token="";//接受标识
	//获取发票抬头
	function getInvoiceInfo() {
		commonui.showAjaxLoading();
		var n = "POST",
		a = "getInvoice?trade_water_id="+trade_water_id,
		i = null,
		c = function(xhr,data) {
			//获取请求头标识
			Token=xhr.getResponseHeader('Access-Control-Allow-Token');
		},
        e = function(n) {
			if(n.result!=null) {
				if(n.result.pdf!=null) {
					$('.pdf').css('display','block');
					$('#pdfClick').attr('href',n.result.pdf);
					$('.card').hide();
				}
				// tempSelfTitle = n.result.invoice_title;  //个人抬头
				// tempCspTitle =  n.result.csp_invoice_title;  //公司抬头
				tempCreditCode = n.result.credit_code;//公司识别码
				
				showcom = n.result.showcom;  //是否允许公司开
				invoice_title_type = n.result.invoice_title_type; //发票开具类型
				if(invoice_title_type=='01') {
					tempSelfTitle = n.result.invoice_title
				}else if(invoice_title_type=='02'){
					tempCspTitle = n.result.invoice_title//公司抬头
					tempSelfTitle = n.result.person_invoice_title//个人
				}
				telInput.val(n.result.mobile);  //手机号
				

				//判断公司是否显示 1是允许公司选项显示 0是不允许公司选项
				if(showcom == 0){
					$('#csp').css('display','none');
				}
				
				if(invoice_title_type == '02'){  //如果是公司，则选中公司，并且把抬头、税号显示出来，并填充已经录过的抬头信息
					$('#checkbox_b2').attr('checked','checked');
					$('#div3').css('display','block');
				 	invoiceTitle.val(tempCspTitle);
				 	creditCode.val(tempCreditCode);
				} else {  //如果是个人，那么抬头设置为只读，并填充已经录过的抬头信息
				 	invoiceTitle.attr('readonly','readonly')
				 	invoiceTitle.val(tempSelfTitle)  ;
				 }
			}
			commonui.hideAjaxLoading();
        },
        r = function() {
			alert("无法加载发票信息！")
        	// commonui.showMessage("无法加载发票信息！");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r,c)
	}
	function aa()
	{
		alert(1);
	}
	var isClick = true;
	getInvoiceInfo();
	//判断是个人还是公司
	$("#checkbox_b2,#checkbox_b1").click(function(){
		if (this.id == 'checkbox_b2') {//公司
			$('#div3').css('display','block');
			invoiceTitle.val(tempCspTitle);
			invoiceTitle.removeAttr('readonly');
			creditCode.val(tempCreditCode)
			invoice_title_type = '02';
		} else { //个人
			invoice_title_type = '01';
			creditCode.val("");
			invoiceTitle.val(tempSelfTitle);
			$('#div3').css('display','none');
			invoiceTitle.attr('readonly','readonly');
		} 
	});

	//点击申请开票 判断input框是否为空
	$("#submit").click(function(){
		var a = $('.input');
		var next = true;//执行请求接口操作
		a.each(function(){
			//判断是否为空
			if($(this).val().trim() == ''){
				if(invoice_title_type == '01' && $(this).attr('name') == 'credit_code'){//税号
					//个人不需要税号
					return true;
				}else{
					next = false;
					if($(this).attr('name') == 'captcha') {
						alert('请输入验证码');	
					} else {
						alert($(this).attr('placeholder'));	
					}
					return false;
				}
			};
			//判断手机号是否为正确格式
			if($(this).attr('name') == 'tel'){
				var a = $(this).val()
				var reg = /^1[3-9][0-9]\d{8}$/;
				if( !reg.test(a) ){
					next = false;
					alert('请输入正确的手机号')
					return false;
				}
			};
		});

		if( next == true && isClick == true){
			commonui.showAjaxLoading();
			//调接口
			isClick= false;
			var n = "POST",
			a = "applyInvoice?mobile="+telInput.val()+"&yzm="+captcha.val()+"&trade_water_id="+trade_water_id+"&invoice_title_type="+invoice_title_type
					+ "&credit_code="+creditCode.val()+"&invoice_title="+invoiceTitle.val(),
			i = null,
			e = function(n) {
				commonui.hideAjaxLoading();
				alert("电子发票申请成功！");
			},
			r = function(n) {
				isClick= true;
				commonui.hideAjaxLoading();
				alert("验证码不正确或信息保存失败，请重试！");
			};
			common.invokeApi(n, a, i, null, e, r);
			isClick = false;
		}
	});
	var  _this;
	$('.button1').click(function(){//获取验证码
		_this=this;
		//获取手机号值
		var phoneNumber = telInput.val();
		var reg = /^1[3-9][0-9]\d{8}$/;
		if( !reg.test(phoneNumber)){
			alert('请输入正确的手机号')
		}else{
			if(trade_water_id == "" || trade_water_id.length !=18) {
				alert('交易号不正确')
			}else {
				yzmreq(phoneNumber,_this)
			}
		}	
	});
	
	function yzmreq(tel,_this){//请求验证码
		var n = "POST",
		a = "getyzm1?trade_water_id="+trade_water_id,
		i = {
			mobile: tel
		},
		b = function(xhr) {
			//  setRequestHeader设置头部
			xhr.setRequestHeader('Access-Control-Allow-Token',Token)
		},
		e = function(n) {
			alert("验证码已下发，请查收短信");
			wait = 60;
			time(_this);
		},
		r = function(n) {
			
			// alert("验证码获取失败,请重新获取");
			$('#getyzm').text(n.message)
			wait = 60;
			time(_this);
			// $('.button1').val()="重新获取";
		};
		common.invokeApi(n, a, i, b, e, r)
	};
	
	//验证码倒计时
	var wait=60;
	function time(o) {  //倒计时
		if (wait == 0) {
			o.removeAttribute("disabled");
			o.value="获取验证码";
			wait = 60;
		} else {
			o.setAttribute("disabled", true);
			o.value="重新发送(" + wait + ")";
			wait--;
			setTimeout(function() {
				time(o)
			},1000)
		}
	};
})