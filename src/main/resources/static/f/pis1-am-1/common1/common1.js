console.log('------login1.js-----------------');
init_am_directive.init_registry1=function($scope, $http){
	$scope.registry={data:{},error:{}};
	
	$scope.registry.saveRegistry=function(){
		var isToSave = true;
		if(!this.data.birth_date){
			if(!this.data.bd){
				isToSave = false;
				this.error.birth_date='Дата народження обов´язкова'
			}else{
				delete this.error.birth_date
				console.log(this.data.birth_date1)
				console.log(this.data.bd)
//				this.data.birth_date = this.data.bd.toISOString().replace('T',' ').replace('Z','')
				this.data.birth_date = this.data.bd.toISOString().split('T')[0]
				console.log(this.data.birth_date)
			}

		}
		if(!this.data.email){
			isToSave = false;
			this.error.email='Введіть ваш eMail. Після успішної реєстрації вам буде вислано лист для активації входу в систему.'
		}
		if(isToSave){
			this.data.sql='sql2.users.insert'
			this.data.doctype=1//patient
			this.data.role='ROLE_PATIENT'
			this.data.uuid='uuid'
			this.data.password = '{noop}'+this.data.password1;
			var thisData = this.data;
			['family_name', 'first_name', 'second_name'].forEach(function(v){
				console.log(v)
				if(!thisData[v]) 
					thisData[v]=''
			})
			$http.post('/r/update2_sql_with_param', this.data).then(function(response) {
				console.log(response.data);
				console.log('send mail to new user for activate login');
				$http.post('/r/send_eMail', response.data).then(function(response) {
					console.log(response.data);
				});
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
	
	$scope.registry.passwordControlle=function(){
		console.log(this.data.password1)
		console.log(this.data.password2)
		if(this.data.password1!=this.data.password2){
			this.error.password='Пароль повторне введенн не співпадає з першим.'
		}else{
			delete this.error.password
		}
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
		console.log(m)
		if(m){
			d1.setMonth(m[3]*1-1);
			d1.setDate(m[1]);
			d1.setFullYear(y);
			var mm = d1.getMonth()+1;
			var ddmmyyyy = (d1.getDate()<10?'0':'')+d1.getDate()
			+'-'+(mm<10?'0':'')+mm+'-'+d1.getFullYear();
			this.data[key] = ddmmyyyy;
			this.data.bd = d1;
			delete this.error.birth_date;
		}else{
			this.error.birth_date='Введіть дату в форматі "день-місяць-рік", розділяючі символи між цифрами -/., або пробіл.';
		}
	}

}
