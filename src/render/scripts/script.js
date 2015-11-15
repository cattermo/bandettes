'use strict';

(function () {
    //classlist
    if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

    var prototype = Array.prototype,
        push = prototype.push,
        splice = prototype.splice,
        join = prototype.join;

    function DOMTokenList(el) {
      this.el = el;
      // The className needs to be trimmed and split on whitespace
      // to retrieve a list of classes.
      var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        push.call(this, classes[i]);
      }
    };

    DOMTokenList.prototype = {
      add: function(token) {
        if(this.contains(token)) return;
        push.call(this, token);
        this.el.className = this.toString();
      },
      contains: function(token) {
        return this.el.className.indexOf(token) != -1;
      },
      item: function(index) {
        return this[index] || null;
      },
      remove: function(token) {
        if (!this.contains(token)) return;
        for (var i = 0; i < this.length; i++) {
          if (this[i] == token) break;
        }
        splice.call(this, i, 1);
        this.el.className = this.toString();
      },
      toString: function() {
        return join.call(this, ' ');
      },
      toggle: function(token) {
        if (!this.contains(token)) {
          this.add(token);
        } else {
          this.remove(token);
        }

        return this.contains(token);
      }
    };

    window.DOMTokenList = DOMTokenList;

    function defineElementGetter (obj, prop, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop,{
                get : getter
            });
        } else {
            obj.__defineGetter__(prop, getter);
        }
    }

    defineElementGetter(Element.prototype, 'classList', function () {
      return new DOMTokenList(this);
    });

})();

(function(){
    var initGallery = function(){
      var EXPANDED_CLASS = 'ban_is-expanded';
      var galleryItems = document.querySelectorAll('.ban_js-gallery-item');
      var clickListener = function() {
        if (this.classList.contains(EXPANDED_CLASS)) {
          this.classList.remove(EXPANDED_CLASS);
        } else {
          this.classList.add(EXPANDED_CLASS);
        }
      };

      Array.prototype.forEach.call(galleryItems, function(item) {
        item.addEventListener('click', clickListener);
      })
    };

    initGallery();
})();

(function() {
    //Menu
    var initMenu = function() {
        var button = document.querySelector('.ban_js-menu'),
            list = document.querySelector('.ban_js-menu-items'),
            HIDE_CLASS = 'ban_is-hidden',
            EXPANDED_CLASS = 'ban_is-expanded',
            COLLAPSED_CLASS = 'ban_is-collapsed';


        button.addEventListener('click', function() {
            var container = this.parentNode;

            if (container.classList.contains(EXPANDED_CLASS)) {
                container.classList.remove(EXPANDED_CLASS);
                container.classList.add(COLLAPSED_CLASS);
                setTimeout(function() {
                    list.classList.add(HIDE_CLASS);
                }, 300); //Hack to wait for animation
            } else {
                list.classList.remove(HIDE_CLASS);

                setTimeout(function() {
                    container.classList.remove(COLLAPSED_CLASS);
                    container.classList.add(EXPANDED_CLASS);
                }, 50); //Hack to make items visible before sliding down list
            }
        }, false)
    }

    initMenu();
})();
