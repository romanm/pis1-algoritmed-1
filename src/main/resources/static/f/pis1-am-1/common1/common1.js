console.log('------login1.js-----------------');
init_am_directive.init_registry1=function($scope, $http){
	$scope.registry={data:{},error:{}};
	
	$scope.registry.saveRegistry=function(){
		var isToSave = true;
		isToSave = false;

		if(!this.data.birth_date){
			if(!this.data.bd){
				isToSave = false;
				this.error.birth_date='Дата народження обов´язкова'
			}else{
				delete this.error.birth_date
				console.log(this.data.birth_date1)
				console.log(this.data.bd)
				var x = this.data.bd.toISOString().replace('T',' ').replace('Z','')
				console.log(x)
			}

		}
		if(!this.data.email){
			isToSave = false;
			this.error.email='Введіть ваш eMail. Після успішної реєстрації вам буде вислано лист для активації входу в систему.'
		}
		if(isToSave){
			this.data.sql='sql2.users.insert'
			this.data.doctype=1
			this.data.password = '{noop}'+this.data.password1;
			['family_name','first_name'].forEach(function(v){
				if(!this.data[v]) this.data[v]=''
			})
			$http.post('/r/update2_sql_with_param', this.data).then(function(response) {
				console.log(response.data);
			});
		}
	};
	var url_read_sql_with_param = '/r/read2_sql_with_param';
	$scope.registry.checkUserName=function(){
		var thisDataObj = this;
		console.log(thisDataObj.data.username)
		$http.get(url_read_sql_with_param,{params:{sql:'sql2.users.selectUserName', username:this.data.username}}).then(function(response) {
			console.log(response.data.list)
			if(response.data.list.length){
				thisDataObj.error.username='Імʼя користувача "'+thisDataObj.data.username+'" вже використовується, обиріть інший логін.'
			}else{
				delete thisDataObj.error.username
			}
		});
	}

	$scope.registry.dateControlle=function(key){
		var dateString = this.data[key];
		
		var d1 = new Date();
		var y = d1.getFullYear()-2000;
		var m = dateString.match(/([1-9]|1\d|2\d|3[01])([-|,|.| |\/]+)([1-9]|1[012]|0[1-9])([-|,|.| |\/]+)(19|20)(\d{2})/)
		if(m){
			y = m[5]*100+m[6]*1;
		}else{
			m = dateString.match(/([1-9]|1\d|2\d|3[01])([-|,|.| |\/]+)([1-9]|1[012]|0[1-9])([-|,|.| |\/]+)(\d{1,2})/)
			if(m){
				var y0 = m[5]*1;
				y = (y0>y?1900:2000) + y0
			}
		}
		if(m){
			d1.setMonth(m[3]*1-1);
			d1.setDate(m[1]);
			d1.setFullYear(y);
			var mm = d1.getMonth()+1;
			var ddmmyyyy = (d1.getDate()<10?'0':'')+d1.getDate()
			+'-'+(mm<10?'0':'')+mm+'-'+d1.getFullYear();
			this.data[key] = ddmmyyyy;
			this.data.bd = d1;
			delete this.error[key];
		}else{
			this.error[key]='Введіть дату в форматі "день-місяць-рік", розділяючі символи між цифрами -/., або пробіл.';
		}
	}
}
