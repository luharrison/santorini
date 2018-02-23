/* https://codepen.io/anon/pen/mXjJod */

function createButton3D(width, height, depth, target) {

    var faces = ['front','back','left','right','top','bottom'];
    var types = [1,1,2,2,3,3];

    //create the container and box
    var cont = document.createElement('section');
    cont.setAttribute('class', 'container');
    cont.style.width = width + 'px';
    cont.style.height = height + 'px';
        var box = document.createElement('div');
        box.setAttribute('class','box');
        cont.appendChild(box);

    //now create the faces
    for (var i=0,f,icon; i<faces.length; i++) {
        f = document.createElement('figure');
        f.setAttribute('class','face ' + faces[i]);

        //style face
        switch (types[i]) {
            case 1: //faces
            f.style.width = width + 'px';
            f.style.height = height + 'px';
            icon = this.document.createElement('div');
            icon.setAttribute('class','icon');
            f.appendChild(icon);
            break;

            case 2: //sides
            f.style.width = depth + 'px';
            f.style.height = height + 'px';
            break;

            case 3: //tops
            f.style.width = width + 'px';
            f.style.height = depth + 'px';
            break;
        }

        //style pos
        var d = (-depth) + 'px';
        var dh = depth/2;
        switch (faces[i]) {
            case 'front':
            f.style.transform = 'translateZ('+dh+'px)';
            break;
            case 'back': 
            f.style.transform = 'translateZ(-'+dh+'px) scaleY(-1)';
            break;
            case 'left': f.style.left = d;
            f.style.transformOrigin = 'right center';
            f.style.transform = 'rotateY(-90deg) translateX('+dh+'px)';
            break;
            case 'right': f.style.right = d; 
            f.style.transformOrigin = 'left center';
            f.style.transform = 'rotateY(90deg) translateX(-'+dh+'px)';
            break;
            case 'top': f.style.top = d;
            f.style.transformOrigin = 'center bottom';
            f.style.transform = 'rotateX(90deg) translateY('+dh+'px)';
            break;
            case 'bottom': f.style.bottom = d;
            f.style.transformOrigin = 'center top';
            f.style.transform = 'rotateX(-90deg) translateY(-'+dh+'px)';
            break;
        }

        box.appendChild(f);
    }

    //auto-append
    if (target != undefined) {
        document.getElementById(target).appendChild(cont);
    }

    return cont;
}