function MasonryGrid(container, options) {
   this.container = document.querySelector(container);
   this.options = options || null;
   this.elementsList = new Array();
   this.currentColumns = new Array();
   this.containerWidth = this.container.offsetWidth;
   this.windowWidth = window.innerWidth;
   this.resizeTimeout = null;
   this.defaultOptions = {
      breakpoints: [],
      columns: 1,
      gridGap: 0,
      updateGridTimeout: 100
   }

   this.getElements = function() {
      var elements = this.container.children;
      for(var i = 0; i < elements.length; i++) {
         this.elementsList.push(elements[i]);
      }
   }.bind(this);

   this.addStyles = function() {
      this.container.style.position = "relative";
      this.container.style.overflow = "hidden";
      this.elementsList.forEach(function(element) {
         element.style.position = "absolute";
         element.style.opacity = "0";
         if(this.options.smoothOpacity) {
            element.style.transition = "opacity .2s linear";
         }
      }.bind(this));
   }.bind(this);

   this.normalizeOptions = function() {
      var breakpointsArray = new Array();
      for(var key in this.options.breakpoints) {
         this.options.breakpoints[key].breakpoint = Number(key);
         breakpointsArray.push(this.options.breakpoints[key]);
      }
      this.options.breakpoints = breakpointsArray;

      this.options.columns = this.options.columns || 1;
      this.options.gridGap = this.options.gridGap || 0;
      this.options.updateGridTimeout = this.options.updateGridTimeout || 100;
   }.bind(this);

   this.arrayMin = function(array) {
      var newArray = array.map(function(e) { return e.height; });
      return newArray.indexOf(Math.min.apply( Math, newArray ));
   }
   this.arrayMax = function(array) {
      var newArray = array.map(function(e) { return e.height; })
      return newArray.indexOf(Math.max.apply( Math, newArray ));
   }

   this.updateGrid = function() {
      this.containerWidth = this.container.offsetWidth;
      this.windowWidth = window.innerWidth;

      var optionsSet = {
         columns: this.options.columns
      };
      var optionsSetIndex = -1;
      this.options.breakpoints.forEach(function(element, index) {
         if(this.windowWidth > element.breakpoint) {
            optionsSetIndex = index;
         }
      }.bind(this));
      if(optionsSetIndex !== -1) {
         optionsSet = this.options.breakpoints[optionsSetIndex];
      }
      optionsSet.columns = optionsSet.columns || this.options.columns;
      optionsSet.gridGap = optionsSet.gridGap || this.options.gridGap;
      optionsSet.alignHeight = optionsSet.alignHeight !== undefined ? optionsSet.alignHeight : this.options.alignHeight;



      var columnWidth = (this.containerWidth - (optionsSet.gridGap * (optionsSet.columns - 1))) / optionsSet.columns;

      this.currentColumns = new Array();
      for(var i = 0; i < optionsSet.columns; i++) {
         this.currentColumns.push({
            elements: new Array,
            height: 0
         });
      }

      this.elementsList.forEach(function(element) {
         var lowestColumn = this.arrayMin(this.currentColumns);
         var topGap = (this.currentColumns[lowestColumn].height === 0 ? 0 : optionsSet.gridGap);
         var leftGap = optionsSet.gridGap * lowestColumn;
         var top = (this.currentColumns[lowestColumn].height + topGap);
         var left = ((lowestColumn * columnWidth) + leftGap);

         element.style.height = "auto";
         element.style.opacity = "1";
         element.style.width = columnWidth + "px";
         element.style.transform = "translate(" + left + "px," + top + "px)";
         element.transformTop = top;
         element.transformLeft = left;
         this.currentColumns[lowestColumn].height += element.offsetHeight + topGap;
         this.currentColumns[lowestColumn].elements.push(element);
      }.bind(this));

      var highestColumn = this.arrayMax(this.currentColumns);
      var highestColumnValue = this.currentColumns[highestColumn].height;
      this.container.style.height = highestColumnValue + "px";

      if(optionsSet.alignHeight) {
         this.currentColumns.forEach(function(element, index) {
            if(index !== highestColumn) {
               var difference = highestColumnValue - element.height;
               var positiveValue = difference / element.elements.length;

               element.elements.forEach(function(element2, index2) {
                  element2.style.height = (element2.offsetHeight + positiveValue) + "px";
                  var top = element2.transformTop + (positiveValue * index2);
                  var left = element2.transformLeft;
                  element2.style.transform = "translate(" + left + "px," + top + "px)";
               });
            }
         });
      }
   }.bind(this);

   this.resizeEvent = function() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateGrid, this.options.updateGridTimeout);
   }.bind(this);

   this.onloadEvent = function() {
      this.addStyles();

      this.updateGrid();

      if(this.options.smoothPosition) {
         this.elementsList.forEach(function(element) {
            element.style.willChange = "transform";
            var smoothOpacity = this.options.smoothOpacity ? ', opacity .2s linear' : '';
            element.style.transition = "transform 0.3s ease-out" + smoothOpacity;
         }.bind(this));
      }
   }.bind(this);

   this.init = function() {
      this.normalizeOptions();
      this.getElements();
      window.addEventListener("load", this.onloadEvent);
      window.addEventListener("resize", this.resizeEvent);
   }.bind(this);

   if(this.options) {
      this.init();
   } else {
      this.options = {};
      this.init();
      console.warn("Configuration is not defined");
   }
}