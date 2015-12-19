(function(){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://www.freecodecamp.com/news/hot";
	var news = [], message ="", date, day, week, month, year;
	var display = document.getElementById("wrapper");

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
			message = "";
			message+= "<div class='story'>";
			message+= "<a target='_blank' href='" + data[i].link + "'>";
			message+= "<img src='" + data[i].author.picture + "'alt='user image'></a>";
  			message+= "<a class='title' target='_blank' href='" + data[i].link + "'><strong>" + data[i].headline + "</strong></a>";
  			message+= "<a target='_blank' href='http://www.freecodecamp.com/" + data[i].author.username + "'>";
  			message+= "by - " + data[i].author.username + "</a>";
  			message+= "<p class='upvotes'>&hearts;" + data[i].rank + "</p>";
  			message+= "<a target='_blank' class='discuss' href='http://www.freecodecamp.com/news/" + data[i].headline + "'>Discuss</a>";
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

}());