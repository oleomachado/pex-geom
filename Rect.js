function create(){
    return [[Infinity,Infinity],[-Infinity,-Infinity]];
}

function zero(){
    return [[0,0],[0,0]];
}

function copy(a){
    return [a[0].slice(0),a[1].slice()];
}

function set(a,b){
    a[0][0] = b[0][0];
    a[0][1] = b[0][1];
    a[1][0] = b[1][0];
    a[1][1] = b[1][1];
    return a;
}

function set4(a,x,y,w,h){
    a[0][0] = x;
    a[0][1] = y;
    a[1][0] = x + w;
    a[1][1] = y + h;
    return a;
}

function scale(a,n){
    a[0][0] *= n;
    a[0][1] *= n;
    a[1][0] *= n;
    a[1][1] *= n;
    return a;
}

function setMinMax(a,min,max){
    a[0][0] = min[0];
    a[0][1] = min[1];
    a[1][0] = max[0];
    a[1][1] = max[1];
    return a;
}

function setMinMax4(a,minx,miny,maxx,maxy){
    a[0][0] = minx;
    a[0][1] = miny;
    a[1][0] = maxx;
    a[1][1] = maxy;
    return a;
}

function getMin(a,out){
    if(out === undefined){
        return [a[0][0],a[0][1]];
    }
    out[0] = a[0][0];
    out[1] = a[0][1];
    return out;
}

function getMax(a,out){
    if(out === undefined){
        return [a[1][0],a[1][1]];
    }
    out[0] = a[1][0];
    out[1] = a[1][1];
    return out;
}

function setSize2(a,width,height){
    a[1][0] = a[0][0] + width;
    a[1][1] = a[0][1] + height;
    return a;
}

function setSize(a,size){
    a[1][0] = a[0][0] + size[0];
    a[1][1] = a[0][1] + size[1];
    return a;
}

function getSize(a,out){
    var width  = getWidth(a);
    var height = getHeight(a);
    if(out === undefined){
        return [width,height];
    }
    out[0] = width;
    out[1] = height;
    return out;
}

function setWidth(a,width){
    a[1][0] = a[0][0] + width;
    return a;
}

function setHeight(a,height){
    a[1][1] = a[0][1] + height;
    return a;
}

function getWidth(a){
    return a[1][0] - a[0][0];
}

function getHeight(a){
    return a[1][1] - a[0][1];
}

function getAspectRatio(a){
    return getWidth(a) / getHeight(a);
}

function setPosition(a,position){
    return setPosition2(a,position[0],position[1]);
}

function setPosition2(a,x,y){
    a[0][0] = x;
    a[0][1] = y;
    a[1][0] = x + getWidth(a);
    a[1][1] = y + getHeight(a);
    return a;
}

function getTR(a,out){
    if(out === undefined){
        return [a[1][0],a[1]];
    }
    out[0] = a[1][0];
    out[1] = a[0][1];
    return out;
}

function getBL(a,out){
    if(out === undefined){
        return [a[0][0],a[1][1]];
    }
    out[0] = a[0][0];
    out[1] = a[1][1];
    return out;
}

function getCenter(a,out){
    var x = getWidth(a) * 0.5;
    var y = getHeight(a) * 0.5;
    if(out === undefined){
        return [x,y];
    }
    out[0] = x;
    out[1] = y;
    return out;
}

function containsPoint(a,point){
    return containsPoint2(a,point[0],point[1]);
}

function containsPoint2(a,x,y){
    return x >= a[0][0] && x <= a[1][0] && y >= a[0][1] && y <= a[1][1];
}

function containsRect(a,b){
    return containsPoint2(a,b[0][0],b[0][1]) && containsPoint2(a,b[1][0],b[1][1]);
}

function includePoint(a,point){
    return includePoint2(a,point[0],point[1]);
}

function includePoint2(a,x,y){
    var minx = a[0][0];
    var miny = a[0][1];
    var maxx = a[1][0];
    var maxy = a[1][1];

    a[0][0] = minx > x ? x : minx;
    a[0][1] = miny > y ? y : miny;
    a[1][0] = maxx < x ? x : maxx;
    a[1][1] = maxy < y ? y : maxy;

    return a;
}

function includePoints(a,points){
    var minx = a[0][0];
    var miny = a[0][1];
    var maxx = a[1][0];
    var maxy = a[1][1];

    for(var i = 0, l = points.length, x, y; i < l; ++i){
        x = points[i][0];
        y = points[i][1];

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;
        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
    }

    a[0][0] = minx;
    a[0][1] = miny;
    a[1][0] = maxx;
    a[1][1] = maxy;

    return a;
}

function includePointsFlat(a,points){
    var minx = a[0][0];
    var miny = a[0][1];
    var maxx = a[1][0];
    var maxy = a[1][1];

    for(var i = 0, l = points.length, x, y; i < l; i+=2){
        x = points[i  ];
        y = points[i+1];

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;
        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
    }

    a[0][0] = minx;
    a[0][1] = miny;
    a[1][0] = maxx;
    a[1][1] = maxy;

    return a;
}

function includeRect(a,rect){
    includePoint(a,rect[0]);
    includePoint(a,rect[1]);
    return a;
}

function includeRects(a,rects){
    for(var i = 0, l = rects.length; i < l; ++i){
        includeRect(a,rects[i]);
    }
    return a;
}

function toMax(a){
    a[0][0] = a[1][0] = -Number.MAX_VALUE;
    a[0][1] = a[1][1] =  Number.MAX_VALUE;
}

function setEmpty(a){
    a[0][0] = a[0][1] =  Infinity;
    a[1][0] = a[1][1] = -Infinity;
    return a;
}

function isEmpty(a){
    return (a[0][0] > a[1][0]) || (a[0][1] > a[1][1]);
}

function isZero(a){
    return a[0][0] == 0 && a[0][1] == 0 && a[1][0] == 0 && a[1][1] == 0;
}

function setZero(a){
    a[0][0] = a[0][1] = a[1][0] = a[1][1] = 0;
    return a;
}

function createFromPoints(points){
    return includePoints(create(),points);
}

function createFromPointsFlat(points){
    return includePointsFlat(create(),points);
}

function createFromRects(rects){
    return includeRects(create(),rects);
}

module.exports = {
    create : create,
    zero   : zero,
    copy   : copy,
    set  : set,
    set4 : set4,
    scale : scale,
    setMinMax : setMinMax,
    setMinMax4 : setMinMax4,
    getMin : getMin,
    getMax : getMax,
    setSize2  : setSize2,
    setSize   : setSize,
    getSize   : getSize,
    setWidth  : setWidth,
    getWidth  : getWidth,
    setHeight : setHeight,
    getHeight : getHeight,
    getAspectRatio : getAspectRatio,
    setPosition  : setPosition,
    setPosition2 : setPosition2,
    getPosition  : getMin,
    getTL : getMin,
    getTR : getTR,
    getBL : getBL,
    getBR : getMax,
    getCenter : getCenter,
    containsPoint : containsPoint,
    containsPoint2 : containsPoint2,
    containsRect   : containsRect,
    includePoint      : includePoint,
    includePoint2     : includePoint2,
    includePoints     : includePoints,
    includePointsFlat : includePointsFlat,
    includeRect   : includeRect,
    includeRects  : includeRects,
    isZero   : isZero,
    isEmpty  : isEmpty,
    setEmpty : setEmpty,
    toMax  : toMax,
    setZero : setZero,
    createFromPoints     : createFromPoints,
    createFromPointsFlat : createFromPointsFlat,
    createFromRects      : createFromRects
};