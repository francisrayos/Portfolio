// Ported from original Metaball script by SATO Hiroyuki
// http://park12.wakwak.com/~shp/lc/et/en_aics_script.html

    project.currentStyle = {
        fillColor: '#B3EDF2',
        /* strokeColor: '#7cc8df',
        strokeWidth: 8 */
    } ;
 
    var ballPositions = [[255, 40], [610, 73], [413, 305],
        [34, 400], [550, 682], [773, 445], [1045, 26], [1160, 408], 
        [997, 733], [1372, 130], [159, 700], [1800, 700], [1500, 1000], [500, 1100]];
 
    var handle_len_rate = 2.4;
    var circlePaths = [];
    var radius = 50;
    for (var i = 0, l = ballPositions.length; i < l; i++) {
        var circlePath = new Path.Circle({
            center: ballPositions[i],
            radius: 60
        });
        circlePaths.push(circlePath);
    }
 
    var largeCircle = new Path.Circle({
        center: [676, 433],
        radius: 85 
    });
    circlePaths.push(largeCircle);
 
    function onMouseMove(event) {
        largeCircle.position = event.point;
        generateConnections(circlePaths);
    }
 
    var connections = new Group();
    function generateConnections(paths) {
        // Remove the last connection paths:
        connections.removeChildren();
 
        for (var i = 0, l = paths.length; i < l; i++) {
            for (var j = i - 1; j >= 0; j--) {
                var path = metaball(paths[i], paths[j], 0.5, handle_len_rate, 300);
                if (path) {
                    connections.appendTop(path);
                    path.removeOnMove();
                }
            }
        }
    }
 
    generateConnections(circlePaths);
 
    // Imported from Paper.js Metaball
    // ---------------------------------------------
    function metaball(ball1, ball2, v, handle_len_rate, maxDistance) {
        var center1 = ball1.position;
        var center2 = ball2.position;
        var radius1 = ball1.bounds.width / 2;
        var radius2 = ball2.bounds.width / 2;
        var pi2 = Math.PI / 2;
        var d = center1.getDistance(center2);
        var u1, u2;
 
        if (radius1 == 0 || radius2 == 0)
            return;
 
        if (d > maxDistance || d <= Math.abs(radius1 - radius2)) {
            return;
        } else if (d < radius1 + radius2) { // case circles are overlapping
            u1 = Math.acos((radius1 * radius1 + d * d - radius2 * radius2) /
                    (2 * radius1 * d));
            u2 = Math.acos((radius2 * radius2 + d * d - radius1 * radius1) /
                    (2 * radius2 * d));
        } else {
            u1 = 0;
            u2 = 0;
        }
 
        var angle1 = (center2 - center1).getAngleInRadians();
        var angle2 = Math.acos((radius1 - radius2) / d);
        var angle1a = angle1 + u1 + (angle2 - u1) * v;
        var angle1b = angle1 - u1 - (angle2 - u1) * v;
        var angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v;
        var angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v;
        var p1a = center1 + getVector(angle1a, radius1);
        var p1b = center1 + getVector(angle1b, radius1);
        var p2a = center2 + getVector(angle2a, radius2);
        var p2b = center2 + getVector(angle2b, radius2);
 
        // define handle length by the distance between
        // both ends of the curve to draw
        var totalRadius = (radius1 + radius2);
        var d2 = Math.min(v * handle_len_rate, (p1a - p2a).length / totalRadius);
 
        // case circles are overlapping:
        d2 *= Math.min(1, d * 2 / (radius1 + radius2));
 
        radius1 *= d2;
        radius2 *= d2;
 
        var topLeft = view.center - [80, 80];
        var bottomRight = view.center + [80, 80];
 
 
        var path = new Path({
            segments: [p1a, p2a, p2b, p1b],
            style: ball1.style,
            closed: true,

                 
        });
        var segments = path.segments;
        segments[0].handleOut = getVector(angle1a - pi2, radius1);
        segments[1].handleIn = getVector(angle2a + pi2, radius2);
        segments[2].handleOut = getVector(angle2b - pi2, radius2);
        segments[3].handleIn = getVector(angle1b + pi2, radius1);
        return path;
    }
 
    // ------------------------------------------------
    function getVector(radians, length) {
        return new Point({
            // Convert radians to degrees:
            angle: radians * 180 / Math.PI,
            length: length
        });
    }