(function ($) {
  $.fn.extend({
    kslide: function (options) {
      var defaults = {
        width: "auto",
        time: 4,
        slideTime: 0.5,
        backDelay: 0.5,
        controlItemWidth: 40,
        controlItemGap: 5,
        reverse: false,
        height: "",
        autoHeight: true,
      };
      var o = $.extend(defaults, options);

      var kslide = $(this);
      var kslideLength = kslide.find(".kslide-item").length;
      var kslideIndex = 0;
      var kslideInterval;
      var kslideTimer;
      var kslideNavbar;
      var kslideWrap;
      var maxItemHeight = 0;

      if (kslideLength > 1) {
        kslideWrap = kslide.find(".kslide-wrap");
        if (kslideWrap.length == 0) {
          kslideWrap = $('<div class="kslide-wrap"></div');
          kslideWrap.html(kslide.html());
          kslide.html(kslideWrap);
        }

        $.each(kslide.find(".kslide-item"), function (i, kslideItem) {
          $(kslideItem).css("width", "100%");
          $(kslideItem).css("position", "absolute");
          if (i == 0) {
            $(kslideItem).css("transform", "translateX(0px)");
          } else {
            $(kslideItem).css(
              "transform",
              "translateX(" + (o.reverse ? "-100%" : "100%") + ")"
            );
          }
          var kslideItemHeight = $(kslideItem).height();
          if (kslideItemHeight > maxItemHeight) {
            maxItemHeight = kslideItemHeight;
          }
        });

        kslide.css("position", "relative");
        kslide.css("overflow", "hidden");
        kslide.width(o.width);
        if (o.autoHeight) {
          kslideWrap.height(o.height ? o.height : maxItemHeight);
          kslideWrap.css("overflow", "hidden");
        }
        kslideNavbar = $(
          '<div class="kslide-navbar" style="width: 100%; position: absolute; bottom: 5px; text-align: center;"></div>'
        );
        for (var i = 0; i < kslideLength; i++) {
          var controlItem = $(
            '<a class="control-item" style="display: inline-block; height: 14px; position: relative;"><span class="bg" style="background: #eee; position: absolute; left: 0px; top: 5px; height: 4px; width: 100%;"></span><span class="process" style="background: #128bed; position: absolute; height: 4px; left: 0px; top: 5px; z-index: 2; width: 0px;"></span></a>'
          );
          controlItem.css("width", o.controlItemWidth + "px");
          controlItem.css("margin", o.controlItemGap + "px");
          kslideNavbar.append(controlItem);
        }
        kslide.append(kslideNavbar);
        kslide
          .find(".process")
          .eq(0)
          .css("transition", "all " + (o.time + 1) + "s");
        setTimeout(function () {
          kslide.find(".process").eq(0).css("width", "100%");
        }, o.backDelay * 1000);
        kslideInterval = setInterval(function () {
          kslide
            .find(".process")
            .eq(kslideIndex % kslideLength)
            .css("transition", "");
          kslide
            .find(".process")
            .eq(kslideIndex % kslideLength)
            .css("width", "0px");
          kslide
            .find(".process")
            .eq((kslideIndex + 1) % kslideLength)
            .css("transition", "all " + (o.time + 1) + "s");
          kslide
            .find(".process")
            .eq((kslideIndex + 1) % kslideLength)
            .css("width", "100%");
          kslide
            .find(".kslide-item")
            .eq(kslideIndex % kslideLength)
            .css("transition", "all " + o.slideTime + "s");
          kslide
            .find(".kslide-item")
            .eq(kslideIndex % kslideLength)
            .css(
              "transform",
              "translateX(" + (o.reverse ? "100%" : "-100%") + ")"
            );
          kslide
            .find(".kslide-item")
            .eq((kslideIndex + 1) % kslideLength)
            .css("transition", "all " + o.slideTime + "s");
          kslide
            .find(".kslide-item")
            .eq((kslideIndex + 1) % kslideLength)
            .css("transform", "translateX(0px)");
          kslideTimer = setTimeout(function () {
            kslide
              .find(".kslide-item")
              .eq(kslideIndex % kslideLength)
              .css("transition", "");
            kslide
              .find(".kslide-item")
              .eq(kslideIndex % kslideLength)
              .css(
                "transform",
                "translateX(" + (o.reverse ? "-100%" : "100%") + ")"
              );
            kslideIndex++;
          }, o.backDelay * 1000);
        }, o.time * 1000);

        kslide.find(".control-item").on("click", function (e) {
          stopKslideInterval();
          var index = kslide.find(".control-item").index(this);
          kslide.find(".process").css("width", "0px");
          $(this).find(".process").css("width", "100%");
          kslide.find(".kslide-item").hide();
          kslide.find(".kslide-item").eq(index).fadeIn();
        });
      } else {
        kslide.find(".kslide-navbar").hide();
      }
      function stopKslideInterval() {
        if (kslideInterval) {
          clearInterval(kslideInterval);
          clearTimeout(kslideTimer);
          kslideInterval = null;
          kslideTimer = null;
          kslide.find(".process").css("transition", "");
          kslide.find(".kslide-item").css("transition", "");
          kslide.find(".kslide-item").css("transform", "translateX(0px)");
        }
      }

      return this;
    },
  });

  $.fn.extend({
    kslide: $.fn.kslide,
  });
})(jQuery);
