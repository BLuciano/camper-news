(function(){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://www.freecodecamp.com/news/hot";
	var news = [], message ="", date, day, week, month, year, headline;
	var display = document.getElementById("wrapper");
	var buttons = document.getElementsByTagName("button");
	
	/*Filters Code Section*/
	for(var i = 0; i < buttons.length; i++){
		buttons[i].addEventListener("click", checkFilters);
	}

	function checkFilters(){
		var newArry = news.slice();
		var sortBy;
		if(this.classList.contains("selected")){
			return;
		}
		
		for(var i=0; i<buttons.length; i++){
			buttons[i].classList.remove("selected");
		}
		this.classList.toggle('selected');

		if(this.innerHTML === "None"){
			displayFilterNews(news);
			return;
		}
		if(this.innerHTML === "By Name"){
			newArry.sort(function(a, b){
				if(a["name"] < b["name"]){
					return -1;
				}
				if(a["name"] > b["name"]){
					return 1;
				}
			});
			displayFilterNews(newArry);
			return;
		}

		if(this.innerHTML === "Most Recent"){
			sortBy = "date";
		}
		if(this.innerHTML === "Most Upvoted"){
			sortBy = "upvotes";
		}
		newArry.sort(function(a, b){
			if(a[sortBy] < b[sortBy]){
				return 1;
			}
			if(a[sortBy] > b[sortBy]){
				return -1;
			}
		});
		displayFilterNews(newArry);
	} 

	function displayFilterNews(array){
		display.innerHTML = "";
		for(var i =0; i < array.length; i++){
			display.innerHTML+= array[i]["html"];
		}
	}
	//End of Filters section

	//API call and methods setions
	function grabDate(date){
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return days[date];
	}

	function grabMonth(date){
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
						"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return months[date];
	}

	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			displayNews(data);
		}
	};
	
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	function displayNews(data){
		for(var i = 0; i < data.length; i++){
			date = new Date(data[i].timePosted);
			week = grabDate(date.getDay());
			day = date.getDate();
			month = grabMonth(date.getMonth());
			year = date.getFullYear();
			headline = data[i].storyLink.split(" ").join('-').toLowerCase();
			console.log(headline);
			message = "";
			message+= "<div class='story animated fadeInDownBig'>";
			message+= "<a target='_blank' href='" + data[i].link + "'>";
			message+= "<img src='" + data[i].author.picture + "'alt='user image'></a>";
  			message+= "<a class='title' target='_blank' href='" + data[i].link + "'><strong>" + data[i].headline + "</strong></a>";
  			message+= "<a target='_blank' href='http://www.freecodecamp.com/" + data[i].author.username + "'>";
  			message+= "by - " + data[i].author.username + "</a>";
  			message+= "<p class='upvotes'>&hearts;" + data[i].rank + "</p>";
  			message+= "<a target='_blank' class='discuss' href='http://www.freecodecamp.com/news/" + headline + "'>Discuss</a>";
  			message+= "<p class='date'>Posted on: " + week + ", " + day + " " + month + " " + year + "</p></div>";

			news.push({
				"name": data[i].author.username,
				"date": data[i].timePosted,
				"upvotes": data[i].rank,
				"html": message 
			});

			display.innerHTML += message;
		}
	} 
	//End of API section
}());