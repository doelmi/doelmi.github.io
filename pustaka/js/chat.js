Notification.requestPermission();
var base_url = location.protocol+"//"+location.host;

var pop = document.getElementById("pop");


function pushNotification(nama, pesan){
	var e = new Notification("Pesan dari " + nama, {
		body : pesan,
		icon : base_url+"/img/logo.png",
		tag : "PUBLIC-CHAT-LABTIA-NEW-MESSAGE"
	});
	
	e.onclick = function(){
		location.href = base_url;
	}
}

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

//hiding welcome element
function welcome(){
	$("#welcome").hide();
	$("#mario-chat").fadeIn(1000);
	$("#message").focus();
	$("#hi").text("Hi, "+$("#handle").val()+"!");
	localStorage.setItem("username", $("#handle").val());
	socket.emit('username', $("#handle").val());
}

function kirimChat(){
	var d = new Date();
	var jam = n(d.getHours()) + ":" + n(d.getMinutes()) + ":" + n(d.getSeconds());
	socket.emit('chat', {
		message: message.value,
		handle: handle.value,
		waktu: jam
	});
	message.value = "";
	$("#message").focus();
}

function postLogin(username, password){
	var object = new Object();
	object.username = username;
	object.password = password;
	$.ajax({
		url: 'http://'+location.hostname+':8000/apilogintia/login.php',
		type: 'POST',
		dataType: 'json',
		data: object,
		
		timeout: 5000,
		success: function (data, textStatus, xhr) {
			if(data.sukses) {
				//$("#handle").val(data.data.nama+' ('+data.data.nim+')');
				$("#handle").val(data.data.nama);
				welcome();
			}else{
				$("#handle").val('');
				alert('Username atau Password salah!')
			};
		},
		error: function (xhr, textStatus, errorThrown) {
			console.log(xhr);
		}
	});
}

$(document).ready(function(){
	$("#mario-chat").hide();
	
	$("#username").focus();
	
    $("#masuk").click(function(){
		postLogin($("#username").val(), $("#password").val());
    });
	//emit event
	$("#send").click(function(){
      $("#welcome").hide();
	  kirimChat();
    });
	
	$("#logout").click(function(){
      localStorage.removeItem("username");
	   $("#welcome").fadeIn(1000);
	   $("#mario-chat").hide();
	   $("#handle").val('');
	   $("#username").val('');
	   $("#password").val('');
    });
	
	$('#message').on('keypress', function (e) {
         if(e.which === 13){
			kirimChat();
         }
   });
   	$('#password').on('keypress', function (e) {
         if(e.which === 13){
			postLogin($("#username").val(), $("#password").val());
         }
   });
   
   if (typeof(Storage) !== "undefined") {
		if(localStorage.getItem("username") !== null){
			$("#handle").val(localStorage.getItem("username"));
			$("#welcome").hide();
			$("#mario-chat").fadeIn(1000);
			$("#message").focus();
			$("#hi").text("Hi, "+$("#handle").val()+"!");
		}
		if(localStorage.getItem("chat") !== null){
			output.innerHTML = localStorage.getItem("chat");
		}
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
 });

// Make connection
var socket = io.connect(location.host);

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

message.addEventListener('keyup', function(){
    socket.emit('typingup', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML = '<p><strong>' + data.handle + ': </strong>' + data.message + " <span style='color: gray; font-size: 10px;'>" + data.waktu + "</span>" + '</p>' + output.innerHTML;
	localStorage.setItem("chat", output.innerHTML);
	if(data.handle !== handle.value) {
		pop.play();
		pushNotification(data.handle, data.message);
	}
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('typingup', function(data){
    feedback.innerHTML = '';
});