---
layout: 'default'
title: "News"
url: "/latest.html"
---
feed = @feedData.facebook || []
ul class:'ban_feed', ->
    index = 0
    for post in feed #when post.type is 'photo' or post.type is 'video'
        li class:'ban_feed__item', ->
            article ->
                h1 class:'ban_feed__item-header', ->
                    post.created_time.substring(0, 10)
                exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig 

                p ->
                    if post.message
                        message = post.message
                        #message = message.replace /\\u003C3/g,''
                        message = message.replace /\</g,'&lt;'
                        message = message.replace /\>/g, '&gt;'
                        message = message.replace exp, "<a href='$1'>$1</a>"
                        message = message.replace /\n/g, '<br />'
                        #message = message.replace /\\n\\n/g, '<br/><br/>'
                        text message
                        
                if post.type == 'video'
                    # p ->
                    #   text post.description.replace('\r\n', '</br>').replace(exp, "<a href='$1'>$1</a>")
                    if post.link.indexOf('https//youtu.be/') != -1
                        videoid = post.link.replace 'https//youtu.be/', ''
                        srcUrl = 'https://www.youtube.com/embed/'+ videoid + '?wmode=transparent'
                        iframe src:srcUrl, width:'auto', height:'auto', allowfullscreen:'allowfullscreen', frameborder:'0'
                    else if post.object_id
                        srcUrl = "https://www.facebook.com/video.php?v=" + post.object_id
                        div class:"fb-video", 'data-href':srcUrl, 'data-allowfullscreen':"true"
                    else
                        a href:post.link, target:'_blank', ->
                            post.link
                    
                if post.type == 'photo' and post.picture and post.picture.length > 0 
                    a href:post.link, target:'_blank', ->
                        img sizes:'(min-width: 944px) calc(680px - 2em), calc(100vw - 1.5em)', srcset: @getSrcset(post.images.small) + @getSrcset(post.images.standard) + @getSrcset(post.images.big, true), src:post.images.standard.source
                        #img src:post.picture, data: {source1: post.images.big.source, source2: post.images.standard.source, source3: post.images.small.source}

script type:"text/javascript", ->
    text "window.fbAsyncInit = function() {
        FB.init({
            xfbml      : true,
            version    : 'v2.5'
        });
    }; (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));"

