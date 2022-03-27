window.onresize = function myFunction() {
 	var w = window.outerWidth;
  	const navBtn = document.querySelector(".nav-button");
  	if(w<=800)
    {
      navBtn.classList.add("fixed-bottom");
    }
    else {
      navBtn.classList.remove("fixed-bottom");
    }
}
window.onload = function myFunction2() {
	var w = window.outerWidth;
  	const navBtn = document.querySelector(".nav-button");
  	if(w<=800)
    {
      navBtn.classList.add("fixed-bottom");
    }
    else {
      navBtn.classList.remove("fixed-bottom");
    }
    gettrenddata();
}

var apikey = "c34bad58527241d2192f4ea7ae256219";

var offset = 0;
var functionname = "gettrenddata";
var category = "general";
var searchtext ="";

async function gettrenddata(){
  var url = "http://api.mediastack.com/v1/news?countries=in&limit=100&offset="+offset+"&language=en&short=popularity&access_key="+apikey+"";
  const response = await fetch(url);
  var data = await response.json();
  loadnewsdata(data.data, "gettrenddata")
}

async function getsearchdata(){
  var stxt = $('#search-text').val();
  if(stxt == "")
  {
    alert("Please enter some words.");
    return;
  }
  var url = "http://api.mediastack.com/v1/news?keywords="+stxt+"&offset="+offset+"&limit=100&language=en&access_key="+apikey+"";
  const response = await fetch(url);
  var data = await response.json();
  if(data.data.length == 0)
  {
    alert("No Result Found!");
    return;
  }
  if(stxt != searchtext)
  {
    $("#news-data").empty();
    offset = 0;
  }
  searchtext = stxt;
  loadnewsdata(data.data, "getsearchdata");
  $('#model-search').modal('hide');
}

async function getcatdata(cat){
  var url = "http://api.mediastack.com/v1/news?country=in&offset="+offset+"&limit=100&language=en&categories="+cat+"&access_key="+apikey+"";
  const response = await fetch(url);
  var data = await response.json();
  loadnewsdata(data.data, "getcatdata");
  category = cat;
}

async function gettodaydata(){
  var todayDate = new Date().toISOString().slice(0, 10);
  var url = "http://api.mediastack.com/v1/news?countries=in&short=published_desc&offset="+offset+"&limit=100&language=en&access_key="+apikey+"";
  const response = await fetch(url);
  var data = await response.json();
  loadnewsdata(data.data, "gettodaydata");
}

function loadnewsdata(data,funname)
{
  if(data.length == 0)
  {
    alert("No Result Found!");
    return;
  }
  if(functionname != funname)
  {
    $("#news-data").empty();
    offset = 0;
  }
  for(i=0;i<data.length;i++)
  {
    if(data[i].image != null)
    {
      if(screen.width < 992)
      {
        var link = "whatsapp://send?text="+data[i].url;
      }
      else
      {
        var link = "https://web.whatsapp.com/send?text="+data[i].url;
      }

      var $newscard = $('<div class="news-card"><div class="news-content"><p data-toggle="modal" data-target="#model'+i+'">'+data[i].title+'</p><div class="catagory">'+data[i].source+'</div> </div><div class="news-img"><img src="'+data[i].image+'" width="100%;"><div class="social-media"><a href="https://www.facebook.com/sharer/sharer.php?u='+data[i].url+'" target="_blank" class="social-media-button facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a><a href="https://twitter.com/intent/tweet?text='+data[i].url+'"  target="_blank" class="social-media-button twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a><a href="'+link+'"  target="_blank" class="social-media-button whatsapp"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></div></div></div>');
      var $model = $('<div class="modal fade" id="model'+i+'" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content p-3"><div class="modal-header"><h5 class="modal-title">'+data[i].source+'</h5><button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button></div><div class="modal-body"><img src="'+data[i].image+'" alt="news-img" width="100%"><br><p>'+data[i].title+' <br><br><b>Description: </b> '+data[i].description+' <a target="_blank" href="'+data[i].url+'" class="btn-sm btn-danger">Read_More</a></p></div></div></div></div>');
      $("#news-data").append($newscard).append($model);
    }
  }
  offset = data.length+offset;
  functionname = funname;
  //alert(offset);
}

function loadmore()
{
  eval(functionname)(category);
}




