class Vector {
    constructor(x, y, z) {
        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z
    }

    set x(n) {
        this._x = n;
    }

    set y(n) {
        this._y = n;
    }

    set z(n) {
        this._z = n;
    }

    scale(n) {
        return new Vector(this._x * n, this._y * n, this._z * n);
    }

    mag() {
        return Math.hypot(this._x, this._y, this._z);
    }

    mag2() {
        return this.mag() ** 2;
    }

    unit() {
        return this.scale(1 / this.mag());
    }

    plus(v) {
        return Vector.sum(this, v);
    }

    minus(v) {
        return Vector.sum(this, v.scale(-1));
    }

    rotateY(theta) {
        return new Vector(Math.cos(theta) * this._x + Math.sin(theta) * this._z, this._y, -Math.sin(theta) * this._x + Math.cos(theta) * this._z);
    }

    static sum(...vecs) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (let v of vecs) {
            x += v._x;
            y += v._y;
            z += v._z;
        }
        return new Vector(x, y, z);
    }

    static dot(v1, v2) {
        return v1._x * v2._x + v1._y * v2._y + v1._z * v2._z;
    }

    static cross(v1, v2) {
        return new Vector(v1._y * v2._z - v1._z * v2._y, -v1._x * v2._z + v1._z * v2._x, v1._x * v2._y - v1._y * v2._x);
    }

    toString() {
        return '<' + this._x + ', ' + this._y + ', ' + this._z + '>';
    }

    clone() {
        return new Vector(this._x, this._y, this._z);
    }
}

export {Vector};