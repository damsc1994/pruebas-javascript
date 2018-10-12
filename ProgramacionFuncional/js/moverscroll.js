function mover_with_scroll(objScroll, objMover, relativeObj){
    //  objScroll	: punterq JQ del obj que va a hacer scroll
    //	objMover	: punterq JQ del obj que se va a mover scroll --> css: tiene que estar en position:absolute
    //	relativeObj	: punterq JQ del obj que contiene al que se va a cover con el scroll
    var self = this;
    self.obj_top = objMover.offset().top - (relativeObj ? relativeObj.offset().top : 0);
    self.obj_off = objMover.offset().top;    
    objScroll.scroll(function(e){
        var o = {
            condition : objScroll.scrollTop() >= self.obj_off,
            top : objScroll.scrollTop() - self.obj_off + self.obj_top   
        };
        if(o.condition){
            objMover.css("top", o.top);
        }
    });
}