var sec;
var ent;

function draw_table()
{
	$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
				select_row();
				var tot = 0;
				$(".price").each(function( index, element ) {
					var t = $( element ).text();

					tot += Number(t);
					
				});
				$("#total").html('$'+tot.toFixed(2));
			}
		});
	};
	$.getJSONuncached("/get/html")
};

function select_row()
{
	$("#menuTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
		var entree = $(this).attr("id") - 1;
		sec = section;
		ent = entree;
		//console.log( sec + " " + ent );
	})
};

	$("#delete").click(function ()
	{
		//console.log("< " + sec + " " + ent + " >");
		$("#section").val(sec);
		$("#entree").val(ent);
	});

$(document).ready(function ()
{
	draw_table();
});