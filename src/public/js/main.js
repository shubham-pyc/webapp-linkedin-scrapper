$(document).ready(function () {
    $('.search-button').click(function () {
        if ($(this).parent().hasClass('open')) {
            var id = $("#user-id");
            if (id.length) {
                if (id.val().length) {

                    var linkedInId = "in/" + id.val();
                    fetchProfile(linkedInId);
                } else {
                    $(this).parent().removeClass('open');
                }
            }
        } else {
            $(this).parent().addClass('open');
        }

    });


    function fetchProfile(linkedInId) {
        try {
            var host = location.host;
            var url = "//" + host + "/api/getuser"
            $.ajax({
                url: url,
                type: "post",
                contentType: "application/json",
                data: '{"url":"$userid"}'.replace("$userid", linkedInId),
                success: function (result) {
                    var str = JSON.stringify(result, undefined, 4);
                    var highlight = syntaxHighlight(str);
                    var element = $("#profile_json");
                    element.removeClass('hidden');
                    element.html(highlight);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
})