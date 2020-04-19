var simpleImageExpand = function (options) {

    function addEventHandler(elem, eventType, handler) {
        elem.addEventListener(eventType, handler, false);
    }

    // handle options
    var fullIconPos = '',
        options = options || {};

    options.zoomClass = options.zoomClass || 'zoom-enabled';
    options.zoomMaxWidth = options.zoomMaxWidth || 'initial';
    options.zoomMaxHeight = options.zoomMaxHeight || 'initial';
    options.overlayOpacity = options.overlayOpacity || '.8';
    options.overlayColor = options.overlayColor || 'black';
    options.iconSize = options.iconSize || '24px';
    options.iconShow = options.hasOwnProperty('iconShow') ? options.iconShow : true;
    options.iconToggleOnly = options.iconToggleOnly || false;
    options.iconPos = options.iconPos || { right: 0, bottom: 0 };

    for (var posProp in options.iconPos)
        fullIconPos += posProp + ': ' + options.iconPos[posProp] + ';';

    options.iconImg = options.iconImg || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqVJREFUeNq8VjuLGlEUnhlHNz5BsnkYXdwQNWCxVoFUWlhJCotgI4LiP5AUlpZiEfwBgljZSBohpaCpUgUkIEELH1EkJCH4fo1jzpE7wZjRnXElB84uc+d6vjnnfOe7l95sNjRFUfeJX1DntQX4T3QWAUaj0XU0GnU3Go2Xk8nESNP0nRE0Gs0vu93+MZvNftDr9RQNGT0PBAKvqtXqa3jPwjN3DiCMBc65XK53hULhPYPlwkzIiyWA8PD/HL7EmCT2BQJR0+nUiOjU+Y0jsbdZ/GNQPobjOCXP88zuOsMwPDinUCjWp9QRA1O7fUGQZrP5Yn/zcDhc+/3+z71ebywVAGNvPxL/7Dd/PxO0wWDAx2Kxr+12ey4nEyE2I/UHUC6q3+8jWTanNEsykE6nY4LB4APIVkmG/O5AQrrQC65SqUyF9VAoZEylUk8BTHEykNA0ArRutVqLZDLZDYfDXyKRSEt4V6vVZrhdLhAqw43D4XiLqkEGbUtvtVqtBDlaA53XYKzX6720WCyqXC7Xh379UQ8y4McSmdbr9TfsgdLx8/l8gQTYzgDLrsrl8jeBFAgMWZq63e6yVCr9QGAsp1arVcxms5UYOCODpjw6EgHK+SSRSFxlMplnbrf70Wq1Uvt8vsfFYvEGZpA9OLBiQ3sM0+l0qoUHKOU1EOahzWZTmc1mFGXFUSCpio09i8fjzeVyySALcc3j8WjESLX78Yxs9sDAAtgqn89/H4/HvBRVOAmIfCltMplUQAp5oirXrFbrvXQ6fWUwGBiR0vKS1fs263Q6Mzg5P4kdIzgKYurNyiHCjsCupZ5Jf5EBLxKnlvG21pDYW6AF3lbIUa4ia1tHKdp9FvMjezAWR2IvUOsud69bwhkvtXeH9uxdt1r0/7pA/hZgACO4VuIsr37kAAAAAElFTkSuQmCC';

    // DOM elements
    var style = document.createElement('style'),
        cnt = document.createElement('div'),
        icon = document.createElement('i');
    cnt.className = 'zoom-container';
    icon.className = 'zoom-icon';

    var css = document.createTextNode('.zoom-container { display: block !important; position: relative !important; text-decoration: none; }\n ' +
        '#zoom-overlay { z-index: 990; position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: none; background-color:' + options.overlayColor + '; text-align: center;  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (options.overlayOpacity * 10) + ')";' +
        'filter: alpha(opacity=' + (options.overlayOpacity * 10) + '); -moz-opacity: ' + options.overlayOpacity + '; -khtml-opacity: ' + options.overlayOpacity + '; opacity: ' + options.overlayOpacity + ';} \n' +
        '#zoom-overlay img { top: 50%; width: initial; height: initial; position: relative; max-width:' + options.zoomMaxWidth + '; max-height: ' + options.zoomMaxHeight + '}\n' +
        '.zoom-container i { display: block; position: absolute; height: ' + options.iconSize + '; width: ' + options.iconSize + '; ' + 'background-image: url(' + options.iconImg + ');' + fullIconPos + '}');

    style.appendChild(css);

    // overlay functions & element
    var overlay = {
        element: document.createElement('div'),
        init: function () {
            overlay.status = 0;
            overlay.element.id = 'zoom-overlay';
            document.body.insertBefore(overlay.element, document.body.firstChild);
            addEventHandler(overlay.element, 'click', overlay.hide);
        },
        show: function (img) {
            var img = img.cloneNode();
            overlay.status = 1;
            overlay.element.appendChild(img);
            img.onload = function () {
                img.style.marginTop = - (img.clientHeight / 2) + 'px';
            };
            overlay.element.style.display = 'block';
        },
        hide: function () {
            overlay.status = 0;
            overlay.element.innerHTML = '';
            overlay.element.style.cssText = '';
        }
    },
        // always return the container
        boundElement = function (elem) {
            if (elem.className === 'zoom-container' && !options.iconToggleOnly)
                return elem;
            else if ((elem.className === options.zoomClass && !options.iconToggleOnly) || elem.className === 'zoom-icon')
                return elem.parentNode;
        },
        // zoom functions
        zoom = {
            bind: function () {
                var zoomImages = document.getElementsByTagName('img');
                for (var i = zoomImages.length; i--;) {
                    if (zoomImages[i].className === options.zoomClass && zoomImages[i].getAttribute('data-bound') !== 'true')
                        zoom.init(zoomImages[i]);
                }
            },
            init: function (e) {
                var target = e.target || e.srcElement || e, container;
                target.setAttribute('data-bound', 'true');
                container = cnt.cloneNode();
                target.parentNode.insertBefore(container, target);
                container.appendChild(target);
                container.style.width = target.clientWidth + 'px';
                container.style.height = target.clientHeight + 'px';
                if (options.iconShow)
                    container.appendChild(icon.cloneNode());
            },
            update: function (e) {
                var target = boundElement(e.target || e.srcElement), img;
                if (target) {
                    img = target.getElementsByTagName('img')[0];
                    if (!overlay.hasOwnProperty('status'))
                        overlay.init();
                    if (!overlay.status)
                        overlay.show(img);
                    else
                        overlay.hide();
                }
            }
        };

    // init
    
    document.getElementsByTagName('head')[0].appendChild(style);
    
    addEventHandler(document.body, 'click', zoom.update);
    
    zoom.bind();

    if (options.dynamicLoad) {
        setInterval(function () {
            if (overlay.status !== 1)
                zoom.bind();
        }, options.dynamicInterval || 200);
    }
};