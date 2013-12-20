;(function($) {

  $.fn.extend({
    afMap: function(options) {
      if (!options || (options && typeof(options) !== 'string')) {
        options = $.extend( {
          width: '100%',
          height: 300,
          fullPage: false,
          mapOptions: {}
        }, options || {});
      }

      this.each(function() {
        var map_obj = null;

        if (options && typeof(options) === 'string') {
          map_obj = $.data(this, 'afMap');

          if (options === 'clearCompletedTasks') {
            map_obj.clearCompletedTasks(this);
          }
          return;
        }

         $.data(this, 'afMap', new $.afMap(this, options));
      });

      return;
    }
  });

  $.afMap = function (_elem, _options) {
    var self = this, timer;
    this.e = $(_elem);
    this.options = _options;

    this.resize = function () {
      var lp = $('#left-panel'),
          lp_z = String(lp.css('z-index')),
          top = $('#main-navbar').height(),
          left = 0, width = 0, height = 0;

      if(lp_z !== '1020') {
        left = $('#left-panel').width();
        width = $(window).width() - left;
        height = $(window).height() - top;

      } else if(lp_z === '1020') {
        top = top + 36;
        left = 0,
        width = $(window).width(),
        height = $(window).height() - top;
      }

      self.e.css({
        position: 'absolute',
        top: top,
        left: left,
        width: width,
        height: height
      });
    };
    
    if (this.options.fullPage) {
      this.resize();
      $(window).resize(this.resize);
    } else {
      if (this.options.width !== null) {
        this.e.css('width', this.options.width);
      }
      if (this.options.height !== null) {
        this.e.css('height', this.options.height);
      }
    }

    google.maps.event.addDomListener(window, 'load', function() {
      self.map = new google.maps.Map(self.e.get(0), self.options.mapOptions);
    });
  };

})(jQuery);


  
