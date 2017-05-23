$(function(){

	const jsonAPI = "4gp3c5lxhjix2imp16pl91zwbo3x5e";

	var streamsURL = "https://wind-bow.gomix.me/twitch-api/streams/";

	var channelsURL = "https://wind-bow.gomix.me/twitch-api/channels/";

	var query = $("#searchbox").val();

	var users = ["ESL_SC2", 			// User list
				"OgamingSC2",
				"cretetion",
				"freecodecamp",
				"storbeck",
				"habathcx",
				"RobotCaleb",
				"noobs2ninjas",
				"brunofin",
				"comster404"];

	var $list = $("#resultsList");

	var status = "all";					// Current active tab

	var id;
	var name;
	var logo;
	var link;

	// We first loop to retrieve users, to get the logo, name and link to TwitchTV account
	for (var i = 0; i < users.length; i++){
	
		$.getJSON(channelsURL + users[i] + "?callback=?", function(data){	// Call to API
			if(data.error === "Not Found") {	// If user doesn't exist
				$list.append("<li class='offline notfound result'><img src=''/ >" + "<a href=''>" + data.message + "</a></li>");
			}

			name = data.display_name;

			streamsURL += name + "?callback=?";	// Building the URL for streams
			$.getJSON(streamsURL, function(streamData){ // We retrieve the stream status (online or not)

				if(streamData.stream !== null) {	// Check whether the channel is online or offline
					$list.append("<li class='online result' id='" + data.display_name.toLowerCase() + "'><img src='" + data.logo + "'/ >" + "<a href='"+ data._links.self +"'>" + data.display_name + "</a>" + "<p>" + data.status + "</p></li>");
				} else {
					$list.append("<li class='offline result' id='" + data.display_name.toLowerCase() + "'><img src='" + data.logo + "'/ >" + "<a href='"+ data._links.self +"'>" + data.display_name + "</a></li>");
				}
			})
			
			streamsURL = "https://wind-bow.gomix.me/twitch-api/streams/";
		});
	}

	$(".tab").click(function(){					// CLICK EVENT on tabs
		
		var id = $(this).attr("id");
		var $online = $(".online");				// Online elements
		var $offline = $(".offline");			// Offline elements

		switch (id){
		case "tab1":

			if (status != "all") {				// ALL	
				changeFocusTo("#tab1");											
				$online.fadeIn();				// Show online and offline tabs
				$offline.fadeIn();
				status = "all";					// New active tab is "all"
			}

			break;

		case "tab2":
					
			if (status !== "online"){			// ONLINE
				changeFocusTo("#tab2");
				$offline.fadeOut();				// Hide "offline" tabs
				$online.fadeIn();
				status = "online";				// New active tab is "online"
			}

			break;
		case "tab3":
			
			if (status !== "offline"){			// OFFLINE
				changeFocusTo("#tab3");
				$online.fadeOut();				// Hide "online" tabs
				$offline.fadeIn();
				status = "offline";				// New active tab is "offline"
			}

			break;
	}
	});

	$(document).keypress(function(e) {
    if(e.which == 13) {

    	e.preventDefault();

    	var val = $("#searchbox").val().toLowerCase();

        var $found = $("#" + val);

        $found.siblings().fadeOut();	// All but the found element disappear
    }
});
});

function changeFocusTo(id){						// Change focus to active tab
	$(".tab").removeClass("selected");
	$(id).addClass("selected");
}
